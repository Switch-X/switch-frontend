"use client";

import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { useDrawer } from "@/components/app-shell/context/DrawerProvider";

/**
 * The sidebar's frame: a permanent rail from `lg` up, a drawer that slides in below it.
 *
 * <p>Only the frame is a client component, because only the frame moves. What sits inside it is
 * passed in as `children`, so the brand renders on the server and the nav and account strip are
 * their own islands.
 */
export function Sidebar({ children }: { children: ReactNode }) {
  const { open } = useDrawer();

  return (
    <aside
      className={cx(
        "fixed inset-y-0 left-0 z-40 flex w-[264px] flex-col border-r border-border bg-surface transition-transform duration-200 lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
      )}
    >
      {children}
    </aside>
  );
}
