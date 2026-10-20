"use client";

import { useRouter } from "next/navigation";
import { useSession } from "@/lib/session";
import { Button } from "@/components/ui/button/Button";
import { Icon } from "@/components/ui/icons";

/** Signed in, but with no profile behind it - offered a way forward rather than a redirect loop. */
export function NoProfileScreen() {
  const { signOut } = useSession();
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-card border border-border bg-surface p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-warn-soft text-warn">
          <Icon.Profile />
        </div>
        <h1 className="text-lg font-semibold text-ink">No profile yet</h1>
        <p className="mt-2 text-sm text-ink-muted">
          You are signed in, but this account has no profile set up yet. Create one to carry on,
          or sign out and use a different account.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button variant="secondary" onClick={signOut}>
            Sign out
          </Button>
          <Button onClick={() => router.push("/?create=1")}>Create the profile</Button>
        </div>
      </div>
    </div>
  );
}
