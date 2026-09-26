/**
 * The one place this app talks to the backend.
 *
 * <p>Calls go to `/api/switch/...` on this app's own origin, which the route handler in
 * `app/api/switch/[...path]` forwards. Nothing here knows the backend's address.
 *
 * <p>Two things every caller gets for free. The `ApiResponse` envelope is unwrapped, so a
 * component receives an `ApplicationView[]` rather than a wrapper it has to reach through. And a
 * non-2xx response becomes a thrown `ApiError` carrying the backend's own words - including the
 * per-field map from `MethodArgumentNotValidException` - so a form can point at the field that
 * was rejected instead of showing "request failed".
 */

import type {
  ApiResponse,
  ApplicationListQuery,
  ApplicationPayload,
  ApplicationView,
  AssignmentListQuery,
  AssignmentPayload,
  AssignmentView,
  CreateInterviewPayload,
  CreateUserProfileRequest,
  InterviewListQuery,
  InterviewRoundPayload,
  InterviewView,
  NotificationPreferencesDto,
  PagedResult,
  ScreeningCallListQuery,
  ScreeningCallPayload,
  ScreeningCallView,
  UpdateInterviewPayload,
  UpdateUserProfileRequest,
  UserView,
} from "./types";
import { ERROR_MESSAGES } from "./errorMessages";

const PREFIX = "/api/switch";

/** Mirrors the backend's `X-User-Id` stand-in. See `HeaderCurrentUser`. */
export const USER_HEADER = "X-User-Id";

/** Where the browser remembers who is signed in. */
export const SESSION_KEY = "switch.session.iamUserId";

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

export function readSession(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(SESSION_KEY);
  } catch {
    // Private browsing and blocked site data both throw rather than returning null.
    return null;
  }
}

export function writeSession(iamUserId: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (iamUserId) window.localStorage.setItem(SESSION_KEY, iamUserId);
    else window.localStorage.removeItem(SESSION_KEY);
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
function queryString(params: Record<string, unknown> | undefined): string {
  if (!params) return "";
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined || value === "") continue;
    if (value === false) continue; // `standalone=false` is already the backend's default.
    search.set(key, String(value));
  }
  const rendered = search.toString();
  return rendered ? `?${rendered}` : "";
}

async function request<T>(
  method: string,
  path: string,
  options: { query?: Record<string, unknown>; body?: unknown } = {},
): Promise<T> {
  const iamUserId = readSession();

  const headers: Record<string, string> = { Accept: "application/json" };
  if (iamUserId) headers[USER_HEADER] = iamUserId;
  if (options.body !== undefined) headers["Content-Type"] = "application/json";

  const response = await fetch(`${PREFIX}${path}${queryString(options.query)}`, {
    method,
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  const text = await response.text();
  const parsed: unknown = text ? safeJson(text) : null;

  if (!response.ok) throw toApiError(response.status, parsed);

  // DELETE answers with the envelope and a null `data`, which callers type as void.
  return (parsed as ApiResponse<T> | null)?.data as T;
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    // Not JSON, so not an answer from the backend or the proxy - most likely an error page from
    // something in between. Its text is not something to put in front of anyone.
    return null;
  }
}

/**
 * The failure as something a form can show.
 *
 * <p>A server-side failure's own words are only used if the proxy wrote them, and the proxy
 * writes nothing but the messages in `errorMessages.ts`. Anything else past 500 - an error page,
 * an empty body - falls back to the generic message rather than to what the server said.
 */
function toApiError(status: number, parsed: unknown): ApiError {
  const problem = (parsed ?? {}) as {
    title?: string;
    detail?: string;
    message?: string;
    errors?: Record<string, string>;
  };

  const detail =
    problem.detail ??
    problem.message ??
    (status >= 500 ? ERROR_MESSAGES.serverError : `Request failed with status ${status}.`);

  return new ApiError(status, problem.title ?? "Request failed", detail, problem.errors ?? {});
}

/* -------------------------------------------------------------------- api */

export const api = {
  users: {
    /**
     * Creates the profile for whichever id is in the session. The backend takes the owner from
     * the header, so the caller decides the id before this is ever called - see `signUp` in
     * `session.tsx`.
     */
    create: (body: CreateUserProfileRequest) => request<UserView>("POST", "/v1/users", { body }),
    me: () => request<UserView>("GET", "/v1/users/me"),
    update: (body: UpdateUserProfileRequest) => request<UserView>("PUT", "/v1/users/me", { body }),
    updatePreferences: (body: NotificationPreferencesDto) =>
      request<UserView>("PUT", "/v1/users/me/notification-preferences", { body }),
    remove: () => request<void>("DELETE", "/v1/users/me"),
  },

  applications: {
    list: (query: ApplicationListQuery = {}) =>
      request<PagedResult<ApplicationView>>("GET", "/v1/applications", { query }),
    byId: (id: number) => request<ApplicationView>("GET", `/v1/applications/${id}`),
    create: (body: ApplicationPayload) =>
      request<ApplicationView>("POST", "/v1/applications", { body }),
    update: (id: number, body: ApplicationPayload) =>
      request<ApplicationView>("PUT", `/v1/applications/${id}`, { body }),
    remove: (id: number) => request<void>("DELETE", `/v1/applications/${id}`),
  },

  interviews: {
    list: (query: InterviewListQuery = {}) =>
      request<InterviewView[]>("GET", "/v1/interviews", { query }),
    byId: (id: number) => request<InterviewView>("GET", `/v1/interviews/${id}`),
    create: (body: CreateInterviewPayload) =>
      request<InterviewView>("POST", "/v1/interviews", { body }),
    update: (id: number, body: UpdateInterviewPayload) =>
      request<InterviewView>("PUT", `/v1/interviews/${id}`, { body }),
    remove: (id: number) => request<void>("DELETE", `/v1/interviews/${id}`),

    // Rounds answer with the whole interview, so the caller can replace the card it came from.
    addRound: (interviewId: number, body: InterviewRoundPayload) =>
      request<InterviewView>("POST", `/v1/interviews/${interviewId}/rounds`, { body }),
    updateRound: (interviewId: number, roundId: number, body: InterviewRoundPayload) =>
      request<InterviewView>("PUT", `/v1/interviews/${interviewId}/rounds/${roundId}`, { body }),
    removeRound: (interviewId: number, roundId: number) =>
      request<InterviewView>("DELETE", `/v1/interviews/${interviewId}/rounds/${roundId}`),
  },

  assignments: {
    list: (query: AssignmentListQuery = {}) =>
      request<AssignmentView[]>("GET", "/v1/assignments", { query }),
    byId: (id: number) => request<AssignmentView>("GET", `/v1/assignments/${id}`),
    create: (body: AssignmentPayload) => request<AssignmentView>("POST", "/v1/assignments", { body }),
    update: (id: number, body: AssignmentPayload) =>
      request<AssignmentView>("PUT", `/v1/assignments/${id}`, { body }),
    remove: (id: number) => request<void>("DELETE", `/v1/assignments/${id}`),
  },

  screeningCalls: {
    list: (query: ScreeningCallListQuery = {}) =>
      request<ScreeningCallView[]>("GET", "/v1/screening-calls", { query }),
    byId: (id: number) => request<ScreeningCallView>("GET", `/v1/screening-calls/${id}`),
    create: (body: ScreeningCallPayload) =>
      request<ScreeningCallView>("POST", "/v1/screening-calls", { body }),
    update: (id: number, body: ScreeningCallPayload) =>
      request<ScreeningCallView>("PUT", `/v1/screening-calls/${id}`, { body }),
    remove: (id: number) => request<void>("DELETE", `/v1/screening-calls/${id}`),
  },
};
