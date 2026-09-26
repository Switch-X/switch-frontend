"use client";

import { useSession } from "@/lib/session";
import { initialsOf } from "@/lib/format";
import { Icon } from "@/components/ui/icons";

/** Who is signed in, at the foot of the sidebar, with the way out. */
export function SidebarAccount() {
  const { user, signOut } = useSession();

  return (
    <div className="border-t border-border p-3">
      <div className="flex items-center gap-3 rounded-lg px-2 py-2">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-semibold text-brand">
          {initialsOf(user?.fullName)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-ink">{user?.fullName}</span>
          <span className="block truncate text-xs text-ink-subtle">{user?.email}</span>
        </span>
        <button
          type="button"
          onClick={signOut}
          title="Sign out"
          aria-label="Sign out"
          className="shrink-0 rounded-lg p-1.5 text-ink-subtle transition hover:bg-surface-sunken hover:text-bad"
        >
          <Icon.Logout className="size-[18px]" />
        </button>
      </div>
    </div>
  );
}
