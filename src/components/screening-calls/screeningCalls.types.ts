/**
 * A screening call, as the backend sends and accepts it.
 *
 * Hand-written against the Java records in `com.switchapp.backend.api.dto` rather than generated,
 * so every field here should be traceable to one there. Where a Java field is a primitive
 * (`int`, `boolean`) the property is required and non-nullable on this side too - Jackson maps a
 * missing primitive to zero rather than rejecting it, which would silently file a 90-minute
 * interview as a 0-minute one.
 */

import type { ProceedingVia } from "@/lib/types";

export type ScreeningOutcome = "AWAITED" | "IN_LOOP" | "REJECTED" | "INTERVIEWING" | "ASSIGNMENT";

export type ScreeningCallView = {
  id: number;
  applicationId: number | null;
  /** The linked application, named with its role - "Stripe — Backend Engineer". Null when unlinked. */
  linkedApplication: string | null;
  contactedOn: string | null;
  discussionDuration: number;
  hrName: string | null;
  /**
   * Who it is with: the linked application's company, or the record's own when unlinked.
   *
   * Only null when a record predates having one, since the backend requires it whenever there is
   * no application to read it from.
   */
  companyName: string | null;
  proceeding: ScreeningOutcome;
  callReceivedVia: ProceedingVia;
};

export type ScreeningCallPayload = {
  applicationId?: number | null;
  contactedOn?: string | null;
  discussionDuration: number;
  hrName?: string | null;
  /**
   * Who it is with. Required when `applicationId` is null and ignored when it is not - the
   * application is where the company lives once there is one.
   */
  companyName?: string | null;
  proceeding?: ScreeningOutcome | null;
  callReceivedVia?: ProceedingVia | null;
};

export type ScreeningCallListQuery = {
  applicationId?: number | null;
  standalone?: boolean;
  proceeding?: ScreeningOutcome | null;
  callReceivedVia?: ProceedingVia | null;
  /** Which page, counting from zero. */
  page?: number;
  /** Rows on it. The backend clamps this at 100 and defaults to 10. */
  size?: number;
};
