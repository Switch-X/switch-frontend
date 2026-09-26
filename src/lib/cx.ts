/**
 * Joins class names, dropping the falsy ones so callers can write `condition && "..."`.
 *
 * <p>A plain join, with no Tailwind conflict resolution: two classes that set the same property
 * are settled by the stylesheet's order, not the order they are passed in here.
 */
export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}
