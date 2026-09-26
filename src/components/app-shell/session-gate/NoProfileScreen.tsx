"use client";

import { useRouter } from "next/navigation";
import { useSession } from "@/lib/session";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";

/** A remembered id with no profile behind it - offered a way forward rather than a redirect loop. */
export function NoProfileScreen() {
  const { iamUserId, signOut } = useSession();
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-card border border-border bg-surface p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-warn-soft text-warn">
          <Icon.Profile />
        </div>
        <h1 className="text-lg font-semibold text-ink">No profile yet</h1>
        <p className="mt-2 text-sm text-ink-muted">
          This browser is signed in as{" "}
          <code className="rounded bg-surface-sunken px-1.5 py-0.5 text-xs text-ink">
            {iamUserId}
          </code>
          , but there is no profile set up for that account yet. Create one to carry on.
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
