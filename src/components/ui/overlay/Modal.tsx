"use client";

/**
 * The dialog every create and edit form opens in.
 *
 * <p>The forms in this app are long - an interview round has eleven fields - so the body scrolls
 * inside a fixed-height shell rather than growing the dialog past the bottom of the screen. The
 * header and footer stay put, which means the save button is reachable without scrolling back.
 *
 * <p>Scrolling the page behind an open dialog is the classic annoyance here: the wheel reaches
 * the end of the form and then starts moving the list underneath. Locking `body` while the dialog
 * is open fixes it, and restoring the previous value rather than clearing it is what stops two
 * stacked dialogs from unlocking the page when only the inner one closes.
 */

import { useEffect, useRef, type ReactNode } from "react";
import { cx } from "@/lib/cx";

export function Modal({
  open,
  onClose,
  title,
  description,
  footer,
  children,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    // Moving focus into the dialog is what makes Tab cycle its fields rather than the page
    // behind it, and what lets a screen reader announce the dialog at all.
    const firstField = panel.current?.querySelector<HTMLElement>(
      "input:not([type=hidden]), select, textarea, button",
    );
    firstField?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const widths = { sm: "max-w-md", md: "max-w-2xl", lg: "max-w-4xl" };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-ink/35 p-0 backdrop-blur-[2px] sm:items-center sm:p-6"
      // A click that starts inside the panel and ends on the backdrop (a drag across a text
      // field) would close the dialog if this listened for `click`, losing everything typed.
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cx(
          "flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl bg-surface shadow-2xl animate-rise sm:rounded-card",
          widths[size],
        )}
      >
        <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-ink">{title}</h2>
            {description && <p className="mt-0.5 text-sm text-ink-muted">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 shrink-0 rounded-lg p-1.5 text-ink-subtle transition hover:bg-surface-sunken hover:text-ink"
          >
            <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">{children}</div>

        {footer && (
          <footer className="flex flex-wrap items-center justify-end gap-2 border-t border-border bg-surface-muted px-5 py-3.5">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}
