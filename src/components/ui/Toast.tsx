"use client";

/**
 * Short confirmations for writes that succeeded.
 *
 * <p>A save that works should say so somewhere, or the only feedback is a dialog closing - which
 * looks identical to a dialog being dismissed. Failures do not come through here: those belong
 * next to the field or the form that caused them, where the reader is already looking, not in a
 * corner that disappears after four seconds.
 */

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { cx } from "@/lib/cx";

type Toast = { id: number; message: string; tone: "good" | "info" };

const ToastContext = createContext<((message: string, tone?: "good" | "info") => void) | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((message: string, tone: "good" | "info" = "good") => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, message, tone }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const value = useMemo(() => push, [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* `pointer-events-none` on the stack and `auto` on each toast keeps the strip from
          swallowing clicks aimed at the page underneath it. */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center gap-2 p-4 sm:items-end"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cx(
              "pointer-events-auto flex max-w-sm items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm font-medium shadow-lg animate-rise",
              toast.tone === "good" ? "bg-good text-white" : "bg-ink text-white",
            )}
          >
            <svg viewBox="0 0 20 20" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const push = useContext(ToastContext);
  if (!push) throw new Error("useToast must be used inside <ToastProvider>");
  return push;
}
