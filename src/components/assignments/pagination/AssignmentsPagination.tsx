"use client";

import { ListPagination } from "@/components/shared/list/ListPagination";
import { useAssignments } from "@/components/assignments/context/AssignmentsProvider";

export function AssignmentsPagination() {
  const { assignments, setPage } = useAssignments();
  return <ListPagination data={assignments.data} onPage={setPage} />;
}
