"use client";

/**
 * Everything the assignments page's islands share: the filters, the list, the company names
 * for its rows, and which record is open in the editor or waiting on a delete confirmation.
 */

import { createContext, useContext, type ReactNode } from "react";
import { api } from "@/lib/api";
import { useEditor, useResource, type Editor, type Resource } from "@/lib/hooks";
import type { AssignmentView } from "@/lib/types";
import { useCompanyNames } from "@/components/shared/hooks/useCompanyNames";
import {
  useDeleteConfirmation,
  type DeleteConfirmation,
} from "@/components/shared/hooks/useDeleteConfirmation";
import { useListFilters, type ListFilters } from "@/components/shared/hooks/useListFilters";
import { INITIAL_FILTERS } from "@/components/assignments/constants/assignmentList";
import type { AssignmentFilterState } from "@/components/assignments/types/assignmentList";

type AssignmentsValue = ListFilters<AssignmentFilterState> & {
  assignments: Resource<AssignmentView[]>;
  companyOf: Map<number, string>;
  editor: Editor<AssignmentView>;
  deletion: DeleteConfirmation<AssignmentView>;
};

const AssignmentsContext = createContext<AssignmentsValue | null>(null);

export function AssignmentsProvider({ children }: { children: ReactNode }) {
  const filters = useListFilters(INITIAL_FILTERS);

  const assignments = useResource(
    () => api.assignments.list(filters.filters),
    Object.values(filters.filters),
  );

  const companyOf = useCompanyNames();
  const editor = useEditor<AssignmentView>();

  const deletion = useDeleteConfirmation<AssignmentView>({
    remove: (assignment) => api.assignments.remove(assignment.id),
    deleted: "Assignment deleted",
    failed: "Could not delete that assignment",
    onDeleted: assignments.reload,
  });

  const value: AssignmentsValue = { ...filters, assignments, companyOf, editor, deletion };

  return <AssignmentsContext.Provider value={value}>{children}</AssignmentsContext.Provider>;
}

export function useAssignments(): AssignmentsValue {
  const value = useContext(AssignmentsContext);
  if (!value) throw new Error("useAssignments must be used inside <AssignmentsProvider>");
  return value;
}
