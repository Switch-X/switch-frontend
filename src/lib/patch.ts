/**
 * The fields that actually changed, for a PATCH body.
 *
 * <p>Every update endpoint is a JSON Merge Patch (RFC 7396): a field sent replaces the stored one,
 * a field sent as `null` clears it, and **a field left out keeps its value**. The forms were
 * sending the whole record on every save, which is a PUT wearing a PATCH's clothes - correct, but
 * it gives up everything the method is for.
 *
 * <p>Two things it costs to send fields that did not change.
 *
 * <p>The first is lost updates. A full body writes every field from the state the form was opened
 * with, so anything changed elsewhere since - a screening call outcome moving the status, a round
 * being marked rejected - is silently written back to its old value by a save that only meant to
 * fix a typo in the notes. Sending just the edited field leaves the rest alone, which is the
 * difference between "set these fields" and "set the record".
 *
 * <p>The second is that the server cannot tell what was meant. Every PATCH logs the fields it
 * received, and a body that always lists all of them says nothing about what the user did.
 *
 * <p>Shallow by design, matching the server: a list or nested object is one value, replaced whole
 * rather than merged item by item. Arrays and objects are compared by their JSON, so reordering
 * counts as a change - which is right for a list the user can order, like interview rounds.
 */
export function changedFields<T extends object>(before: T, after: T): Partial<T> {
  const body: Partial<T> = {};

  for (const key of Object.keys(after) as (keyof T)[]) {
    if (!same(before[key], after[key])) {
      body[key] = after[key];
    }
  }

  return body;
}

/**
 * `undefined` and a missing key both mean "not sent", so they match; `null` does not match either,
 * because sending `null` is how a field is cleared and that is a real instruction.
 */
function same(before: unknown, after: unknown): boolean {
  if (before === after) return true;
  if (before === undefined && after === undefined) return true;
  if (before === null || after === null) return before === after;
  if (typeof before === "object" || typeof after === "object") {
    return JSON.stringify(before) === JSON.stringify(after);
  }
  return false;
}
