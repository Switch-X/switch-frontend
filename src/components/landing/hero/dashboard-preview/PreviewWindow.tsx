"use client";

import { useState, type ReactNode } from "react";
import { PREVIEW_CYCLE_MS, PREVIEW_VIEWS } from "@/components/landing/hero/dashboard-preview/dashboardPreview.constants";
import { useAutoAdvance } from "@/components/landing/useAutoAdvance";
import { PreviewProgress } from "./PreviewProgress";
import { PreviewSidebar } from "./PreviewSidebar";

/**
 * The browser window the panes cycle inside.
 *
 * <p>It is decoration, not a demo: `aria-hidden`, no focusable controls, and the views advance on
 * their own. Hovering holds the current one still. Anything genuinely interactive belongs further
 * down the page, where it is not competing with the sign-up button.
 */
export function PreviewWindow({
  overview,
  applications,
  interviews,
  workflows,
}: {
  overview: ReactNode;
  applications: ReactNode;
  interviews: ReactNode;
  workflows: ReactNode;
}) {
  const [paused, setPaused] = useState(false);
  const [view] = useAutoAdvance(PREVIEW_VIEWS.length, PREVIEW_CYCLE_MS, paused);
  // In `PREVIEW_VIEWS` order.
  const panes = [overview, applications, interviews, workflows];

  return (
    <div
      aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative select-none"
    >
      {/* Glow sitting behind the glass, so the window looks lit rather than pasted on. */}
      <div
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[36px] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(55% 55% at 30% 25%, var(--color-brand-ring), transparent 70%), radial-gradient(45% 45% at 75% 70%, var(--color-accent-soft), transparent 70%)",
        }}
      />

      <div className="float-soft overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_28px_80px_-20px_rgba(10,6,20,0.65)]">
        {/* Window chrome. The traffic lights are what make a floating rectangle read as a screen. */}
        <div className="flex items-center gap-2 border-b border-border bg-surface-muted px-4 py-3">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="mx-auto flex items-center gap-1.5 rounded-md bg-surface px-3 py-1 text-[11px] text-ink-subtle">
            <span className="size-1.5 rounded-full bg-good" />
            switch.app/{PREVIEW_VIEWS[view].toLowerCase()}
          </span>
        </div>

        <div className="flex min-h-[330px] sm:min-h-[370px]">
          <PreviewSidebar active={view} />

          {/* `key` on the pane restarts its entry animation every time the view changes, which is
              what makes the switch feel like a navigation rather than a text swap. */}
          <div key={view} className="min-w-0 flex-1 animate-fade p-4">
            {panes[view]}
          </div>
        </div>
      </div>

      <PreviewProgress active={view} />
    </div>
  );
}
