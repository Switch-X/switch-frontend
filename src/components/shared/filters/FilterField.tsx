import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/** A labelled filter control. `className` carries its minimum width, which follows the label. */
export function FilterField({
  label,
  className = "min-w-[150px]",
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("flex flex-col gap-1", className)}>
      <span className="text-xs font-medium text-ink-subtle">{label}</span>
      {children}
    </div>
  );
}
