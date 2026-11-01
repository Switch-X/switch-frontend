"use client";

/**
 * Which credential this browser is holding, and therefore where its calls go.
 *
 * <p>There are two, and they arrive by different doors:
 *
 * <p><b>`token`</b> - registering answers with an access token. The profile has to be created
 * under one, and that call is made before any session cookie exists, so a freshly registered
 * browser keeps the token in `localStorage` and sends it as a bearer token, straight to the
 * backend.
 *
 * <p><b>`session`</b> - signing in. The gateway runs the authorization-code flow, keeps the
 * tokens itself, and gives the browser an opaque session id in an HttpOnly cookie. Calls go
 * through the gateway, which swaps the cookie for a bearer token. Nothing a script on the page
 * can read, which is the difference that matters: the token in `localStorage` is readable by any
 * script that ends up on the page, and a refresh token there would be worse.
 *
 * <p>Stored rather than worked out, because the two talk to different addresses. `token` goes
 * straight to the backend; `session` must go through the gateway, since the gateway is the only
 * thing that can turn the cookie into a token. A call sent to the wrong one of those fails in a
 * way that looks like being signed out.
 *
 * <p>This is a preference, not a credential - it says which door was used, never who came
 * through it. Clearing it signs nobody out by itself: the token or the cookie does that.
 */

export type AuthMode = "token" | "session";

const MODE_KEY = "switch.auth.mode";

/** `token` when nothing has been recorded, which is the path that needs no cookie. */
export function readAuthMode(): AuthMode {
  if (typeof window === "undefined") return "token";
  try {
    return window.localStorage.getItem(MODE_KEY) === "session" ? "session" : "token";
  } catch {
    // Private browsing and blocked site data both throw rather than returning null.
    return "token";
  }
}

export function writeAuthMode(mode: AuthMode): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(MODE_KEY, mode);
  } catch {
    // Nothing to do. The mode falls back to `token`, which needs no cookie.
  }
}

export function isSessionMode(): boolean {
  return readAuthMode() === "session";
}

/**
 * Where the gateway is.
 *
 * <p>Only the cookie path uses it. `NEXT_PUBLIC_` because the browser is what navigates to it -
 * the address is not a secret and never was. What the gateway keeps private is the client secret
 * and the tokens, neither of which is here.
 */
export const GATEWAY_BASE_URL =
  process.env.NEXT_PUBLIC_SWITCH_GATEWAY_BASE_URL ?? "http://localhost:8090";
