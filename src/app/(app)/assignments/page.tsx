/**
 * The assignments list.
 *
 * <p>Unpaged, because the backend's assignment endpoint returns a plain list. Sorted in the
 * browser by the submission deadline with the undated ones last, which is the order someone with
 * three open take-homes needs and the only sort this endpoint does not offer server-side.
 *
 * <p>A server component: the heading and the card render here, and the filters, table and
 * dialogs are client islands from `components/assignments/`, sharing one provider.
 */

import { AssignmentsProvider } from "@/components/assignments/context/AssignmentsProvider";
import { AssignmentDialogs } from "@/components/assignments/dialogs/AssignmentDialogs";
import { AssignmentFilters } from "@/components/assignments/filters/AssignmentFilters";
import { NewAssignmentButton } from "@/components/assignments/header/NewAssignmentButton";
import { AssignmentsTable } from "@/components/assignments/table/AssignmentsTable";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";

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
        </Card>

        <AssignmentDialogs />
      </div>
    </AssignmentsProvider>
  );
}
