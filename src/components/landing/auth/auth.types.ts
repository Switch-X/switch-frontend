/**
 * Registering, and checking an email before it.
 *
 * Hand-written against the Java records in `com.switchapp.backend.api.dto` rather than generated,
 * so every field here should be traceable to one there. Where a Java field is a primitive
 * (`int`, `boolean`) the property is required and non-nullable on this side too - Jackson maps a
 * missing primitive to zero rather than rejecting it, which would silently file a 90-minute
 * interview as a 0-minute one.
 */

/**
 * What registering hands back.
 *
 * One field, because the backend sends one. The account id, refresh token and lifetime it used to
 * return were all unused here and were dropped from the response - see `SessionView` on the Java
 * side for why the refresh token in particular is no longer handed to a browser.
 */
export type SessionView = {
  accessToken: string;
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
