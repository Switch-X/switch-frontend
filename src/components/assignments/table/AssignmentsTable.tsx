"use client";

import { ErrorNote } from "@/components/ui/feedback/ErrorNote";
import { SkeletonList } from "@/components/ui/feedback/Skeleton";
import { Icon } from "@/components/ui/icons";
import { DataTable } from "@/components/shared/list/DataTable";
import { FilterableEmptyState } from "@/components/shared/list/FilterableEmptyState";
import { applicationLabel } from "@/components/shared/utils/companyNames";
import { ASSIGNMENT_COLUMNS } from "@/components/assignments/assignmentList.constants";
import { useAssignments } from "@/components/assignments/context/AssignmentsProvider";
import { AssignmentRow } from "./AssignmentRow";

/**
 * The rows as the server ordered them: soonest deadline first, the undated ones last.
 *
 * <p>This used to sort in the browser, which was fine while the endpoint returned everything.
 * Now that it returns one page, sorting here would only reorder the ten rows on this page while
 * the query decided which ten they were.
 */
export function AssignmentsTable() {
  const { assignments, filtered, clearFilters, editor, deletion } = useAssignments();
  const rows = assignments.data?.content ?? [];

  if (assignments.error) {
    return (
      <div className="p-5">
        <ErrorNote>{assignments.error}</ErrorNote>
      </div>
    );
  }

  if (assignments.loading && rows.length === 0) {
    return <SkeletonList count={4} itemClassName="h-14 w-full" />;
  }

  if (rows.length === 0) {
    return (
      <FilterableEmptyState
        filtered={filtered}
        icon={<Icon.Assignments />}
        title="No assignments yet"
        description="Log a take-home when it arrives so its deadline stops being a surprise."
        createLabel="New assignment"
        onCreate={editor.create}
        onClearFilters={clearFilters}
      />
    );
  }

  return (
    <DataTable columns={ASSIGNMENT_COLUMNS} className="min-w-[840px]">
      {rows.map((assignment) => (
        <AssignmentRow
          key={assignment.id}
          assignment={assignment}
          company={applicationLabel(assignment, "Not linked")}
          onEdit={editor.edit}
          onDelete={deletion.request}
        />
      ))}
    </DataTable>
  );
}
