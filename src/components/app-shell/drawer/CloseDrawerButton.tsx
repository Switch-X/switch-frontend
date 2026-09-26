"use client";

import { Icon } from "@/components/ui/icons";
import { useDrawer } from "@/components/app-shell/context/DrawerProvider";

export function CloseDrawerButton() {
  const { hide } = useDrawer();

  return (
    <button
      type="button"
      onClick={hide}
      className="rounded-lg p-1.5 text-ink-subtle hover:bg-surface-sunken lg:hidden"
      aria-label="Close navigation"
    >
      <Icon.Close className="size-5" />
    </button>
  );
}
