"use client";

import { Card, CardHeader } from "@/components/ui/layout/Card";
import { Icon } from "@/components/ui/icons";
import { useDashboardData } from "@/components/dashboard/context/DashboardDataProvider";
import { dueThisWeek } from "@/components/dashboard/due-soon/dueSoon.utils";
import { DueSoonItem } from "./DueSoonItem";

/**
 * What needs the reader this week - the block the overview exists for.
 *
 * <p>The only block on the page coloured by urgency, and it sits above the totals. It disappears
 * entirely when nothing is due, rather than showing an empty card that says so.
 */
export function DueSoon() {
  const { applications, assignments } = useDashboardData();
  const items = dueThisWeek(applications, assignments);

  if (items.length === 0) return null;

  return (
    <Card className="border-warn/30 bg-warn-soft/40">
      <CardHeader
        title={
          <span className="flex items-center gap-2">
            <Icon.Clock className="size-4 text-warn" />
            Needs you this week
          </span>
        }
        description="Anything already late, then anything due in the next seven days."
      />
      <ul className="divide-y divide-border">
        {items.map((item) => (
          <DueSoonItem key={item.key} item={item} />
        ))}
      </ul>
    </Card>
  );
}
