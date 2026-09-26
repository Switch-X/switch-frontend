"use client";

import { ErrorNote } from "@/components/ui/ErrorNote";
import { SkeletonList } from "@/components/ui/Skeleton";
import { Icon } from "@/components/ui/icons";
import { DataTable } from "@/components/shared/list/DataTable";
import { FilterableEmptyState } from "@/components/shared/list/FilterableEmptyState";
import { linkedCompanyName } from "@/components/shared/utils/companyNames";
import { ASSIGNMENT_COLUMNS } from "@/components/assignments/constants/assignmentList";
import { useAssignments } from "@/components/assignments/context/AssignmentsProvider";
import { sortBySubmissionDeadline } from "@/components/assignments/utils/assignmentList";
import { AssignmentRow } from "./AssignmentRow";

export function AssignmentsTable() {
  const { assignments, companyOf, filtered, clearFilters, editor, deletion } = useAssignments();
  const rows = sortBySubmissionDeadline(assignments.data ?? []);

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
        onSampleDataLoaded={assignments.reload}
      />
    );
  }

  return (
    <DataTable columns={ASSIGNMENT_COLUMNS} className="min-w-[840px]">
      {rows.map((assignment) => (
        <AssignmentRow
          key={assignment.id}
          assignment={assignment}
          company={linkedCompanyName(companyOf, assignment.applicationId, "Not linked")}
          onEdit={editor.edit}
          onDelete={deletion.request}
        />
      ))}
    </DataTable>
  );
}
