/**
 * The frame every signed-in screen sits in.
 *
 * <p>A server component. The frame itself - the two columns, the brand, the page container - is
 * static markup. The parts that need the browser are islands inside it, each in
 * `components/app-shell/`: the session gate (the session is a cookie, so it asks), the drawer
 * (open or closed), the nav (which row is current) and the account strip (who is signed in).
 *
 * <p>The sidebar is fixed and only the main column scrolls, so the navigation does not slide away
 * while reading a long list.
 */

import type { ReactNode } from "react";
import { DrawerProvider } from "@/components/app-shell/context/DrawerProvider";
import { DrawerBackdrop } from "@/components/app-shell/drawer/DrawerBackdrop";
import { MobileHeader } from "@/components/app-shell/mobile-header/MobileHeader";
import { SessionGate } from "@/components/app-shell/session-gate/SessionGate";
import { Sidebar } from "@/components/app-shell/sidebar/Sidebar";
import { SidebarAccount } from "@/components/app-shell/sidebar/SidebarAccount";
import { SidebarBrand } from "@/components/app-shell/sidebar/SidebarBrand";
import { SidebarNav } from "@/components/app-shell/sidebar/SidebarNav";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SessionGate>
      <DrawerProvider>
        <div className="flex min-h-screen">
          <DrawerBackdrop />

          <Sidebar>
            <SidebarBrand />
            <SidebarNav />
            <SidebarAccount />
          </Sidebar>

          <div className="flex min-w-0 flex-1 flex-col lg:pl-[264px]">
            <MobileHeader />
            <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
              <div className="mx-auto w-full max-w-6xl">{children}</div>
            </main>
          </div>
        </div>
      </DrawerProvider>
    </SessionGate>
  );
}
