/**
 * Registering, signing in, and checking an email before either.
 *
 * Hand-written against the Java records in `com.switchapp.backend.api.dto` rather than generated,
 * so every field here should be traceable to one there. Where a Java field is a primitive
 * (`int`, `boolean`) the property is required and non-nullable on this side too - Jackson maps a
 * missing primitive to zero rather than rejecting it, which would silently file a 90-minute
 * interview as a 0-minute one.
 */

/** Signing in, or registering: both end with the same thing in hand. */
export type SessionView = {
  /** The identity provider's id. Read from the token by the backend; never sent by this app. */
  accountId: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

/** The one field `POST /v1/auth/validate` takes. */
export type EmailValidationRequest = {
  email: string;
};

/** What it answers with. */
export type EmailAvailability = {
  available: boolean;
};
