import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/** A square, icon-only action for the end of a table row. Always labelled - an icon alone
 *  tells a screen reader nothing, and a tooltip does not reach a keyboard user. */
export function IconButton({
  label,
  danger,
  onClick,
  children,
}: {
  label: string;
  danger?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={cx(
        "rounded-lg p-2 text-ink-subtle transition",
        danger ? "hover:bg-bad-soft hover:text-bad" : "hover:bg-surface-sunken hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
