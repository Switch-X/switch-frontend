/**
 * How this app talks to the backend: the client, the token, and the one `request` every
 * endpoint goes through. The endpoints themselves live with their feature, in `*.api.ts`.
 *
 * <p>One way out: the gateway. The browser holds a cookie it cannot read, and the gateway
 * turns that into a bearer token on the way past. Nothing is kept on this side - no token, no
 * account id, no note of how anybody signed in - so there is nothing here for a script on the
 * page to steal and nothing to go stale between tabs.
 *
 * <p>Two things every caller gets for free. The `ApiResponse` envelope is unwrapped, so a
 * component receives an `ApplicationView[]` rather than a wrapper it has to reach through. And a
 * non-2xx response becomes a thrown `ApiError` carrying the backend's own words - including the
 * per-field map from `MethodArgumentNotValidException` - so a form can point at the field that
 * was rejected instead of showing "request failed".
 *
 * <p>One axios instance does the talking. It carries the base path, the access token and the
 * query-string rules, so an endpoint in a feature's `*.api.ts` is one line and cannot forget
 * any of them.
 */

import axios from "axios";
import type { ApiResponse } from "@/lib/types";
import { ERROR_MESSAGES } from "./errorMessages";

/**
 * Where the gateway is.
 *
 * `NEXT_PUBLIC_` because the browser is what calls it, so the value is compiled into the bundle
 * and anybody can read it. That is fine: the address was never the secret. What the gateway
 * keeps private is the client secret and the tokens, and neither is here.
 */
export const GATEWAY_BASE_URL =
  process.env.NEXT_PUBLIC_SWITCH_GATEWAY_BASE_URL ?? "http://localhost:8090";

/**
 * Every call goes to the gateway, which passes it to the backend under the same path.
 *
 * <p>Including the ones made before anybody is signed in. Registering arrives at the gateway
 * with no cookie, is passed straight through, and reaches an endpoint the backend leaves open -
 * so there is no second address to configure and no second origin to allow.
 */
const BASE_URL = `${GATEWAY_BASE_URL}/api`;

/**
 * A failed call, with enough of the backend's answer to say something useful.
 *
 * `fieldErrors` is the `errors` property the backend attaches to a validation problem - field
 * name to message. Empty for every other kind of failure.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly title: string;
  readonly fieldErrors: Record<string, string>;

  constructor(status: number, title: string, detail: string, fieldErrors: Record<string, string>) {
    super(detail);
    this.name = "ApiError";
    this.status = status;
    this.title = title;
    this.fieldErrors = fieldErrors;
  }

  /**
   * True when the account behind the current session has no profile.
   *
   * <p>The status alone, deliberately. This is only ever asked of `GET /v1/users/me`, and the
   * one thing that endpoint cannot find is the profile - so a 404 from it means exactly this.
   *
   * <p>It used to also require the words "no profile" in the message, which read as careful and
   * was the opposite. A 404 that does not carry the backend's problem body - a path that missed,
   * anything between here and the backend answering for itself - has no `detail` to match, so
   * the check failed, the caller treated it as an unknown error, and a reader holding a perfectly
   * good session was told they were signed out.
   */
  get isMissingProfile(): boolean {
    return this.status === 404;
  }
}

/**
 * Drops null, undefined and empty-string entries rather than sending them.
 *
 * The backend reads every filter as `@RequestParam(required = false)`, so an absent parameter
 * means "no filter". Sending `?source=` instead would hand Spring an empty string to coerce into
 * a `Source` and earn a 400 for what the user experiences as "All sources".
 */
function serializeParams(params: Record<string, unknown>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined || value === "") continue;
    if (value === false) continue; // `standalone=false` is already the backend's default.
    search.set(key, String(value));
  }
  return search.toString();
}

/**
 * The one client this app has.
 *
 * `validateStatus` accepts every status on purpose. A 4xx is not an exception here - it is the
 * answer, and a form reads the rejected fields off its body - so `request` decides what counts
 * as a failure. That leaves a rejected promise meaning one thing only: the request never got an
 * answer at all, which is the `offline` case callers already handle.
 */
const client = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: "application/json" },
  validateStatus: () => true,
  paramsSerializer: serializeParams,
  // What actually sends the session cookie cross-origin. Axios omits it by default, and
  // without it the gateway sees an anonymous request - so the app looks signed out while
  // holding a perfectly good session.
  withCredentials: true,
});

/**
 * Every call goes through here. The envelope is unwrapped and only `data` comes back.
 *
 * <p>Exported for the per-feature api modules - `applications.api.ts` and the rest - which are
 * the only things that should call it. A component asks those, never this.
 */
export async function request<T>(
  method: string,
  path: string,
  options: { query?: Record<string, unknown>; body?: unknown } = {},
): Promise<T> {
  const response = await client.request<unknown>({
    method,
    url: path,
    params: options.query,
    data: options.body,
  });

  const parsed = asObject(response.data);
  if (response.status === 401) {
    // Expired, or signed out in another tab. There is no refresh yet, so the token is dropped
    // and the app asks who they are again rather than retrying a call that cannot succeed.
    endSession();
  }
  if (response.status < 200 || response.status >= 300) {
    throw toApiError(response.status, parsed);
  }

  // Updates and deletes answer with the envelope and a null `data`, which callers type as void.
  return (parsed as ApiResponse<T> | null)?.data as T;
}

/**
 * Send the reader back to the landing page to sign in again.
 *
 * <p>Nothing to forget first: the cookie is the gateway's and this code cannot touch it, and
 * the gateway drops it the moment the session behind it is gone.
 *
 * <p>A full navigation rather than a router push: this can fire from anywhere, including code
 * that is not inside a React tree, and it is the end of the session either way - there is no
 * state worth preserving across it.
 */
function endSession(): void {
  if (typeof window !== "undefined" && window.location.pathname !== "/") {
    window.location.href = "/?signin=1";
  }
}

/**
 * The body, if it is one of ours.
 *
 * Axios parses JSON on its own and leaves anything else as the raw string. A string here is an
 * error page from something between the browser and the backend - never an answer from this API
 * - so it is dropped rather than read, and its text never reaches anyone. An empty body (a 204,
 * or a 500 with nothing in it) arrives as `""` and lands in the same place.
 */
function asObject(data: unknown): Record<string, unknown> | null {
  return typeof data === "object" && data !== null ? (data as Record<string, unknown>) : null;
}

/**
 * The failure as something a form can show.
 *
 * <p>Past 500 the backend's own words are for whoever is debugging it - an exception message,
 * the name of a service behind it - so they are dropped and the reader gets one plain sentence.
 * The backend has already logged the real reason against this request's trace id.
 *
 * <p>Its 4xx messages are the opposite, and pass through untouched: "Company is required", "No
 * profile for this account". Those are written for the reader, and a form needs the `errors`
 * map beside them to say which field it rejected.
 */
function toApiError(status: number, parsed: Record<string, unknown> | null): ApiError {
  if (status >= 500) {
    return new ApiError(status, "Request failed", ERROR_MESSAGES.serverError, {});
  }

  const problem = (parsed ?? {}) as {
    title?: string;
    detail?: string;
    message?: string;
    errors?: Record<string, string>;
  };

  const detail = problem.detail ?? problem.message ?? `Request failed with status ${status}.`;

  return new ApiError(status, problem.title ?? "Request failed", detail, problem.errors ?? {});
}
