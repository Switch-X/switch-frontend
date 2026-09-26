import type { ApplicationStatus } from "@/lib/types";

/**
 * The status a new application starts in.
 *
 * <p>The backend's update record marks `applicationStatus` `@NotNull` while the create record
 * leaves it optional. Rather than branch on that, the form always sends a status, starting from
 * this one - "Not applied yet" is a real answer, and the right one for a row someone is adding
 * before they apply.
 */
export const NEW_APPLICATION_STATUS: ApplicationStatus = "NOT_APPLIED_YET";
