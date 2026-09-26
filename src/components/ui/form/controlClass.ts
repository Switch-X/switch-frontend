/**
 * The look every text-like form control shares.
 *
 * <p>Every control in this folder takes `error` and renders it. That is the whole reason they
 * exist rather than bare `<input>` tags: the backend answers a rejected write with a
 * field-to-message map, and without a shared place to put those messages each form would invent
 * its own.
 */

import { cx } from "@/lib/cx";

const CONTROL_BASE =
  "w-full rounded-lg border bg-surface px-3 py-2 text-sm text-ink transition placeholder:text-ink-subtle " +
  "focus:outline-none focus:ring-2 focus:ring-brand-ring focus:border-brand disabled:bg-surface-muted disabled:text-ink-subtle";

export function controlClass(error?: string, className?: string): string {
  return cx(CONTROL_BASE, error ? "border-bad" : "border-border-strong", className);
}
