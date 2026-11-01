/**
 * The three sign-in calls, which go to the gateway rather than the backend.
 *
 * <p>Deliberately not through `lib/api.ts`. These are not SWITCH API endpoints: they live on the
 * gateway, answer with their own small shapes rather than the `ApiResponse` envelope, and must
 * work before there is any session at all - so unwrapping an envelope that is not there, or
 * ending a session on a 401, would both be wrong.
 *
 * <p>`credentials: "include"` on every one of them. The session cookie is cross-origin from this
 * app's point of view, and `fetch` leaves it out unless told otherwise - the single easiest way
 * to end up debugging a session that was created correctly and then never sent.
 */

import { GATEWAY_BASE_URL } from "@/lib/authMode";

/** What the gateway will say about the current cookie. No token is ever in here. */
export type GatewaySession = {
  authenticated: boolean;
  email?: string;
  subject?: string;
};

export const gatewayApi = {
  /**
   * Where to send the browser to sign in.
   *
   * <p>A URL to navigate to, not something to fetch. The sign-in page belongs to Keycloak, and
   * the browser has to arrive there as a top-level navigation or it cannot show a password field,
   * an MFA step, or an SSO session the reader already has. Fetching it would get the HTML and
   * achieve nothing.
   */
  loginUrl: (redirectTo = "/dashboard") =>
    `${GATEWAY_BASE_URL}/auth/login?redirect=${encodeURIComponent(redirectTo)}`,

  /**
   * Whether this browser has a session, and whose.
   *
   * <p>The app has to ask, because the cookie is HttpOnly and no script can read it. That is the
   * trade: the page cannot see the session, so it cannot leak it either.
   */
  session: async (): Promise<GatewaySession> => {
    try {
      const response = await fetch(`${GATEWAY_BASE_URL}/auth/session`, {
        credentials: "include",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) return { authenticated: false };
      return (await response.json()) as GatewaySession;
    } catch {
      // The gateway being unreachable is not a session, and it is not worth an error screen on
      // the landing page either - the reader simply is not signed in yet.
      return { authenticated: false };
    }
  },

  /** Ends the session on the gateway and at Keycloak, and clears the cookie. */
  logout: async (): Promise<void> => {
    try {
      await fetch(`${GATEWAY_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Signing out locally still has to happen. A gateway that cannot be reached must not be
      // able to keep somebody looking signed in.
    }
  },
};
