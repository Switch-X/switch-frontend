import type { ReactNode } from "react";

export function ErrorNote({ children }: { children: ReactNode }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-lg border border-bad/25 bg-bad-soft px-3 py-2.5 text-sm text-bad"
    >
      <span aria-hidden="true" className="mt-px font-bold">
        !
      </span>
      <span className="min-w-0">{children}</span>
    </div>
  );
}
