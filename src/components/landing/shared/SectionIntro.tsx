import type { ReactNode } from "react";

/** The paragraph under a section's heading, before its content. */
export function SectionIntro({ children }: { children: ReactNode }) {
  return (
    <p className="mx-auto mb-10 max-w-2xl text-center text-lg leading-relaxed text-ink-muted">
      {children}
    </p>
  );
}
