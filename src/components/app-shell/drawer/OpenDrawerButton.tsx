"use client";

import { Icon } from "@/components/ui/icons";
import { useDrawer } from "@/components/app-shell/context/DrawerProvider";

export function OpenDrawerButton() {
  const { show } = useDrawer();

  return (
    <button
      type="button"
      onClick={show}
      className="rounded-lg p-2 text-ink-muted hover:bg-surface-sunken"
      aria-label="Open navigation"
    >
      <Icon.Menu />
    </button>
  );
}
