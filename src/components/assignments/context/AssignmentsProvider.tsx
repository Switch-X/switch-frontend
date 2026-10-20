"use client";

/**
 * Everything the assignments page's islands share: the filters, the list, the company names
 * for its rows, and which record is open in the editor or waiting on a delete confirmation.
 */

import { assignmentsApi } from "@/components/assignments/assignments.api";
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import { type Editor, useEditor } from "@/lib/hooks/useEditor";
import { type Resource, useResource } from "@/lib/hooks/useResource";
import type { AssignmentView } from "@/components/assignments/assignments.types";
import {
  useDeleteConfirmation,
  type DeleteConfirmation,
} from "@/components/shared/hooks/useDeleteConfirmation";
import { useListFilters, type ListFilters } from "@/components/shared/hooks/useListFilters";
import { usePageGuard } from "@/components/shared/hooks/usePageGuard";
import { INITIAL_FILTERS } from "@/components/assignments/assignmentList.constants";
import { PAGE_SIZE } from "@/components/shared/constants/paging";
import type { PagedResult } from "@/lib/types";
import type { AssignmentFilterState } from "@/components/assignments/assignmentList.types";

type AssignmentsValue = ListFilters<AssignmentFilterState> & {
  setPage: Dispatch<SetStateAction<number>>;
  assignments: Resource<PagedResult<AssignmentView>>;
  editor: Editor<AssignmentView>;
  deletion: DeleteConfirmation<AssignmentView>;
};

const AssignmentsContext = createContext<AssignmentsValue | null>(null);

export function AssignmentsProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState(0);

  // Any filter change invalidates the current page number: staying on page 4 while narrowing to
  // a filter with six results shows an empty table and looks like a bug.
  const filters = useListFilters(INITIAL_FILTERS, () => setPage(0));

  const assignments = useResource(
    () => assignmentsApi.list({ ...filters.filters, page, size: PAGE_SIZE }),
    [...Object.values(filters.filters), page],
  );

  // Deleting the last row on the last page leaves this asking for a page that has gone.
  usePageGuard(assignments.data, setPage);

  const editor = useEditor<AssignmentView>();

  const deletion = useDeleteConfirmation<AssignmentView>({
    remove: (assignment) => assignmentsApi.remove(assignment.id),
    deleted: "Assignment deleted",
    failed: "Could not delete that assignment",
    onDeleted: assignments.reload,
  });

  const value: AssignmentsValue = { ...filters, setPage, assignments, editor, deletion };

  return <AssignmentsContext.Provider value={value}>{children}</AssignmentsContext.Provider>;
}

export function useAssignments(): AssignmentsValue {
  const value = useContext(AssignmentsContext);
  if (!value) throw new Error("useAssignments must be used inside <AssignmentsProvider>");
  return value;
}
