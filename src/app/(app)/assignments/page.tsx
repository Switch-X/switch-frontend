/**
 * The assignments list.
 *
 * <p>Ten to a page, ordered by the submission deadline with the undated ones last - the order
 * someone with three open take-homes needs. The ordering is the query's, which is what paging
 * requires: sorting a page in the browser only reorders the rows the server already chose.
 *
 * <p>A server component: the heading and the card render here, and the filters, table and
 * dialogs are client islands from `components/assignments/`, sharing one provider.
 */

import { AssignmentsProvider } from "@/components/assignments/context/AssignmentsProvider";
import { AssignmentDialogs } from "@/components/assignments/dialogs/AssignmentDialogs";
import { AssignmentFilters } from "@/components/assignments/filters/AssignmentFilters";
import { NewAssignmentButton } from "@/components/assignments/header/NewAssignmentButton";
import { AssignmentsPagination } from "@/components/assignments/pagination/AssignmentsPagination";
import { AssignmentsTable } from "@/components/assignments/table/AssignmentsTable";
import { Card } from "@/components/ui/layout/Card";
import { PageHeader } from "@/components/ui/layout/PageHeader";

export default function AssignmentsPage() {
  return (
    <AssignmentsProvider>
      <div className="space-y-6">
        <PageHeader
          title="Assignments"
          description="Take-home tasks, ordered by whichever is due first."
          actions={<NewAssignmentButton />}
        />

        <Card>
          <AssignmentFilters />
          <AssignmentsTable />
          <AssignmentsPagination />
        </Card>

        <AssignmentDialogs />
      </div>
    </AssignmentsProvider>
  );
}
