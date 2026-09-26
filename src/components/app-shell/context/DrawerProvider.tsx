"use client";

/**
 * Whether the navigation drawer is open, on screens too narrow for the permanent sidebar.
 *
 * <p>Held above the sidebar, its backdrop and the mobile header's menu button - three separate
 * pieces of the shell that all need the same answer.
 */

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

type DrawerValue = {
  open: boolean;
  show: () => void;
  hide: () => void;
};

const DrawerContext = createContext<DrawerValue | null>(null);

export function DrawerProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Following a link should not leave the mobile drawer covering the page it navigated to.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const value = useMemo<DrawerValue>(
    () => ({ open, show: () => setOpen(true), hide: () => setOpen(false) }),
    [open],
  );

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
}

export function useDrawer(): DrawerValue {
  const value = useContext(DrawerContext);
  if (!value) throw new Error("useDrawer must be used inside <DrawerProvider>");
  return value;
}
