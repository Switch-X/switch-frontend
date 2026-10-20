"use client";

import { useSession } from "@/lib/session";
import { WORKING_PROFILE, describe } from "@/lib/enums";
import { formatInstant, initialsOf } from "@/lib/format";
import { Badge } from "@/components/ui/display/Badge";
import { Card } from "@/components/ui/layout/Card";

/** Who this account is, at a glance - above the forms that change it. */
export function ProfileSummary() {
  const { user } = useSession();
  if (!user) return null;

  const stage = describe(WORKING_PROFILE, user.workingProfile);

  return (
    <Card className="flex flex-wrap items-center gap-4 p-5">
      <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-soft text-lg font-semibold text-brand">
        {initialsOf(user.fullName)}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold text-ink">{user.fullName}</h2>
          <Badge tone={stage.tone}>{stage.label}</Badge>
          {user.emailVerified ? (
            <Badge tone="good">Email verified</Badge>
          ) : (
            <Badge tone="warn">Email not verified</Badge>
          )}
        </div>
        <p className="mt-0.5 text-sm text-ink-muted">{user.email}</p>
        <p className="mt-0.5 text-xs text-ink-subtle">Joined {formatInstant(user.createdAt)}</p>
      </div>
    </Card>
  );
}
