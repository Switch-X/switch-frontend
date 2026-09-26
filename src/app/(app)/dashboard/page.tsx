/**
 * The overview.
 *
 * <p>Built to answer one question - what needs me today - before it shows any totals. The counts
 * are the part people look at second; the deadline that lapses on Thursday is the part they open
 * this for, so it sits at the top and is the only block coloured by urgency.
 *
 * <p>A server component. The frames - the cards, their headings, the links out - render here; the
 * blocks that show the account's own data are client islands reading one shared provider,
 * because the session that says whose data it is lives in the browser. Each block lives in its
 * own folder under `components/dashboard/`.
 */

import { DashboardBody } from "@/components/dashboard/body/DashboardBody";
import { DashboardDataProvider } from "@/components/dashboard/context/DashboardDataProvider";
import { DueSoon } from "@/components/dashboard/due-soon/DueSoon";
import { GettingStarted } from "@/components/dashboard/getting-started/GettingStarted";
import { DashboardHeader } from "@/components/dashboard/header/DashboardHeader";
import { Pipeline } from "@/components/dashboard/pipeline/Pipeline";
import { RecentActivity } from "@/components/dashboard/recent-activity/RecentActivity";
import { DashboardStats } from "@/components/dashboard/stats/DashboardStats";
import { UpcomingInterviews } from "@/components/dashboard/upcoming-interviews/UpcomingInterviews";

export default function DashboardPage() {
  return (
    <DashboardDataProvider>
      <div className="space-y-6">
        <DashboardHeader />

        <DashboardBody>
          <GettingStarted />
          <DashboardStats />
          <DueSoon />

          <div className="grid gap-6 lg:grid-cols-2">
            <UpcomingInterviews />
            <Pipeline />
          </div>

          <RecentActivity />
        </DashboardBody>
      </div>
    </DashboardDataProvider>
  );
}
