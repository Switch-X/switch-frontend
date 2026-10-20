"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/lib/cx";
import { NAV_ITEMS } from "@/components/app-shell/sidebar/navigation.constants";

/** A client component only because the highlighted row follows the current path. */
export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
      <p className="px-3 pt-2 pb-1.5 text-[11px] font-semibold tracking-wider text-ink-subtle uppercase">
        Your search
      </p>
      {NAV_ITEMS.map((item) => {
        // `startsWith` rather than equality so a nested route keeps its parent highlighted.
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cx(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
              active
                ? "bg-brand-soft text-brand"
                : "text-ink-muted hover:bg-surface-sunken hover:text-ink",
            )}
          >
            <item.icon className="size-[18px] shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
