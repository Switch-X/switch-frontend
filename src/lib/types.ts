/**
 * The shapes every feature shares: the envelope the backend answers in, and the two enums more than one feature uses.
 *
 * Hand-written against the Java records in `com.switchapp.backend.api.dto` rather than generated,
 * so every field here should be traceable to one there. Where a Java field is a primitive
 * (`int`, `boolean`) the property is required and non-nullable on this side too - Jackson maps a
 * missing primitive to zero rather than rejecting it, which would silently file a 90-minute
 * interview as a 0-minute one.
 */

/**
 * Every endpoint answers inside this wrapper - see `utils/ApiResponse.java`. `data` is null after an
 * update or a delete.
 */
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
  responseCode: string;
  traceId: string | null;
  timestamps: string;
};

/** What adding something returns - only the new id. See `utils/NewId.java`. */
export type NewId = { id: number };

/** Only the applications list is paged. Everything else returns a bare array. */
export type PagedResult<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type DifficultyLevel = "EASY" | "MEDIUM" | "HARD" | "INSANE";

export type ProceedingVia = "APPLIED_APPLICATION" | "CONNECTION" | "RECRUITER_REACH_OUT";
