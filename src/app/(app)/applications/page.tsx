/**
 * The applications list.
 *
 * <p>The only paged endpoint in the app, so this is the only screen with a pager. Filters reset
 * the page to zero when they change - staying on page 4 while narrowing to a filter with six
 * results shows an empty table and looks like a bug.
 *
 * <p>A server component: the heading and the card render here, and the parts that hold state -
 * filters, table, pager, dialogs - are client islands from `components/applications/`, sharing
 * one provider.
 */

import { ApplicationsProvider } from "@/components/applications/context/ApplicationsProvider";
import { ApplicationDialogs } from "@/components/applications/dialogs/ApplicationDialogs";
import { ApplicationFilters } from "@/components/applications/filters/ApplicationFilters";
import { NewApplicationButton } from "@/components/applications/header/NewApplicationButton";
import { ApplicationsPagination } from "@/components/applications/pagination/ApplicationsPagination";
import { ApplicationsTable } from "@/components/applications/table/ApplicationsTable";
import { Card } from "@/components/ui/layout/Card";
import { PageHeader } from "@/components/ui/layout/PageHeader";

export default function ApplicationsPage() {
  return (
    <ApplicationsProvider>
      <div className="space-y-6">
        <PageHeader
          title="Applications"
          description="Everything you have applied for, or are about to."
          actions={<NewApplicationButton />}
        />

        <Card>
          <ApplicationFilters />
          <ApplicationsTable />
          <ApplicationsPagination />
        </Card>

        <ApplicationDialogs />
      </div>
    </ApplicationsProvider>
  );
}
