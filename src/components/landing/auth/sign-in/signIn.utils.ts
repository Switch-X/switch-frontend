/** Why a sign-in failed, in words for the person trying it. */

import { ApiError } from "@/lib/api";
import { ERROR_MESSAGES } from "@/lib/errorMessages";

/**
 * Why a sign-in failed, in words for the person trying it.
 *
 * <p>`missingProfile` is the caller's own wording for an id with nothing behind it, which is
 * almost always a typo in a typed id rather than anything more interesting.
 */
export function signInErrorMessage(failure: unknown, missingProfile: string): string {
  if (!(failure instanceof ApiError)) return ERROR_MESSAGES.offline;
  return failure.isMissingProfile ? missingProfile : failure.message;
}
