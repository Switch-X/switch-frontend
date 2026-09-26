import type { ReactNode } from "react";

/** The strip of filters across the top of a list's card. */
export function FilterBar({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end gap-3 border-b border-border px-5 py-4">{children}</div>
  );
}
