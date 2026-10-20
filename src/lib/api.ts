/**
 * How this app talks to the backend: the client, the token, and the one `request` every
 * endpoint goes through. The endpoints themselves live with their feature, in `*.api.ts`.
 *
 * <p>Calls go straight to the Spring backend. The backend decides who is allowed to call it,
 * in its own `CorsConfig`, rather than this app standing in front of it.
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
 * Where the backend is, including its context path.
 *
 * `NEXT_PUBLIC_` because this is read in the browser, so the value is compiled into the bundle
 * and anybody can read it. That is the trade for calling the backend directly: it is the
 * backend's `switch.allowed-origins` that decides who may call it, not this app being the only
 * thing that knows the address.
 */
const BASE_URL = process.env.NEXT_PUBLIC_SWITCH_API_BASE_URL ?? "http://localhost:8000/api";

/** Where the browser keeps the access token between page loads. */
const TOKEN_KEY = "switch.session.accessToken";

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

  /** True when the account behind the current session no longer has a profile. */
  get isMissingProfile(): boolean {
    return this.status === 404 && this.message.toLowerCase().includes("no profile");
  }
}

/**
 * The access token, or null when nobody is signed in.
 *
 * <p>Only the access token is kept. The refresh token comes back from the backend too and is
 * deliberately dropped: nothing refreshes yet, and a long-lived credential sitting in storage
 * that no code reads is a liability rather than a feature. When refreshing is built, this is
 * the file that starts keeping it.
 */
export function readToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    // Private browsing and blocked site data both throw rather than returning null.
    return null;
  }
}

export function writeToken(accessToken: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (accessToken) window.localStorage.setItem(TOKEN_KEY, accessToken);
    else window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Nothing to do: the session simply will not survive a reload.
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
});

/**
 * The access token, on every request.
 *
 * <p>The backend verifies it against Keycloak's signing keys and reads the account from its
 * `sub` claim, so this app never sends - or stores - an account id of its own.
 */
client.interceptors.request.use((config) => {
  const token = readToken();
  if (token) config.headers.set("Authorization", `Bearer ${token}`);
  return config;
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
 * Forget the token and send the reader back to the landing page to sign in again.
 *
 * <p>A full navigation rather than a router push: this can fire from anywhere, including code
 * that is not inside a React tree, and it is the end of the session either way - there is no
 * state worth preserving across it.
 */
function endSession(): void {
  writeToken(null);
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
