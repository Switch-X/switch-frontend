/**
 * Registering, and checking an email before it.
 *
 * <p>The only calls that need no access token. Signing in is not among them any more: that runs
 * on the gateway, which holds the tokens itself - see `gateway.api.ts`.
 */

import { request } from "@/lib/api";
import type {
  EmailAvailability,
  EmailValidationRequest,
  RegisterRequest,
  SessionView,
} from "./auth.types";

export const authApi = {
  /** Creates the login in Keycloak and signs it in. The profile is a separate call after it. */
  register: (body: RegisterRequest) => request<SessionView>("POST", "/v1/auth/register", { body }),

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
