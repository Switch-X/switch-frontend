import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={cx(
        "rounded-card border border-border bg-surface shadow-[0_1px_2px_rgba(25,21,19,0.05)]",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function CardHeader({
  title,
  description,
  actions,
}: {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-5 py-4">
      <div className="min-w-0">
        <h2 className="text-base font-semibold text-ink">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-ink-muted">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  );
}
