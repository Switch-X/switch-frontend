/**
 * The screening calls list.
 *
 * <p>Most recent first, ten to a page. Unlike applications and assignments, nothing here has a
 * deadline - a screening call is a thing that happened, and the useful question is "who called me
 * last week", so the sort is by contact date descending with undated rows last.
 *
 * <p>A server component: the heading and the card render here, and the filters, table and
 * dialogs are client islands from `components/screening-calls/`, sharing one provider.
 */

import { ScreeningCallsProvider } from "@/components/screening-calls/context/ScreeningCallsProvider";
import { ScreeningCallDialogs } from "@/components/screening-calls/dialogs/ScreeningCallDialogs";
import { ScreeningCallFilters } from "@/components/screening-calls/filters/ScreeningCallFilters";
import { LogCallButton } from "@/components/screening-calls/header/LogCallButton";
import { ScreeningCallsPagination } from "@/components/screening-calls/pagination/ScreeningCallsPagination";
import { ScreeningCallsTable } from "@/components/screening-calls/table/ScreeningCallsTable";
import { Card } from "@/components/ui/layout/Card";
import { PageHeader } from "@/components/ui/layout/PageHeader";

export default function ScreeningCallsPage() {
  return (
    <ScreeningCallsProvider>
      <div className="space-y-6">
        <PageHeader
          title="Screening calls"
          description="The first conversation — recruiter reach-outs included."
          actions={<LogCallButton />}
        />

        <Card>
          <ScreeningCallFilters />
          <ScreeningCallsTable />
          <ScreeningCallsPagination />
        </Card>

        <ScreeningCallDialogs />
      </div>
    </ScreeningCallsProvider>
  );
}
