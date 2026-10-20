/**
 * Registering, signing in, and checking an email before either.
 *
 * <p>The only calls that need no access token - they are how one is obtained.
 */

import { request } from "@/lib/api";
import type {
  EmailAvailability,
  EmailValidationRequest,
  LoginRequest,
  RegisterRequest,
  SessionView,
} from "./auth.types";

export const authApi = {
  /** Creates the login in Keycloak and signs it in. The profile is a separate call after it. */
  register: (body: RegisterRequest) => request<SessionView>("POST", "/v1/auth/register", { body }),

  /** Exchanges an email and password for a session. Needs no token - this is how you get one. */
  login: (body: LoginRequest) => request<SessionView>("POST", "/v1/auth/login", { body }),

  /**
   * Whether an email can still be registered.
   *
   * Answers 200 whichever way it goes, so there is nothing to catch: a taken address is an
   * answer, not a failure. Only an explicit `false` counts as taken, so an answer that cannot
   * be read lets sign-up carry on - registering still refuses a taken address, and the worst
   * case is hearing about it a step later.
   */
  isEmailAvailable: async (body: EmailValidationRequest): Promise<boolean> => {
    const answer = await request<EmailAvailability>("POST", "/v1/auth/validate", { body });
    return answer?.available !== false;
  },
};
