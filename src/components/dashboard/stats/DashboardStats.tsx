"use client";

import { SkeletonList } from "@/components/ui/feedback/Skeleton";
import { Stat } from "@/components/ui/display/Stat";
import { useDashboardData } from "@/components/dashboard/context/DashboardDataProvider";
import {
  countActive,
  countOffers,
  countOutstanding,
} from "@/components/dashboard/summary.utils";

/** The four totals. Read second - the deadlines above them are what people open this for. */
export function DashboardStats() {
  const { loading, applications, totalApplications, interviews, upcoming, assignments } =
    useDashboardData();

  if (loading) {
    return (
      <SkeletonList
        count={4}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        itemClassName="h-[92px]"
      />
    );
  }

  const offers = countOffers(applications);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Stat
        label="Applications"
        value={totalApplications}
        hint={`${countActive(applications)} still in flight`}
      />
      <Stat
        label="Interviews"
        value={interviews.length}
        hint={`${upcoming.length} coming up`}
        tone={upcoming.length > 0 ? "accent" : "neutral"}
      />
      <Stat
        label="Assignments"
        value={assignments.length}
        hint={`${countOutstanding(assignments)} outstanding`}
      />
      <Stat
        label="Offers"
        value={offers}
        tone={offers > 0 ? "good" : "neutral"}
        hint={offers > 0 ? "Nicely done." : "Not yet — keep going."}
      />
    </div>
  );
}
