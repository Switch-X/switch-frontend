import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-bad">*</span>}
      </label>
      {children}
      {/* The hint disappears once there is an error: two lines of small grey text under a red
          field is noise at exactly the moment the reader is looking for one instruction. */}
      {error ? (
        <p className="text-xs font-medium text-bad">{error}</p>
      ) : hint ? (
        <p className="text-xs text-ink-subtle">{hint}</p>
      ) : null}
    </div>
  );
}
