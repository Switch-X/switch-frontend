"use client";

import { useDrawer } from "@/components/app-shell/context/DrawerProvider";

/** Dims the page behind the open drawer. Hidden entirely at `lg`, where the rail is permanent. */
export function DrawerBackdrop() {
  const { open, hide } = useDrawer();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 bg-ink/35 backdrop-blur-[2px] lg:hidden" onClick={hide} />
  );
}
