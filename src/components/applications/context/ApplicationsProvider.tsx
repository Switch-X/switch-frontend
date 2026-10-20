"use client";

/**
 * Everything the applications page's islands share: the filters, the sort, the page, the list,
 * and which record is open in the editor or waiting on a delete confirmation.
 *
 * <p>The page is a server component, so its header, card and layout render there; the filters,
 * table, pager and dialogs are separate client islands under it, and this is how they talk.
 */

import { applicationsApi } from "@/components/applications/applications.api";
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
import type { ApplicationSort, ApplicationView } from "@/components/applications/applications.types";
import type { PagedResult } from "@/lib/types";
import {
  useDeleteConfirmation,
  type DeleteConfirmation,
} from "@/components/shared/hooks/useDeleteConfirmation";
import { useListFilters, type ListFilters } from "@/components/shared/hooks/useListFilters";
import { usePageGuard } from "@/components/shared/hooks/usePageGuard";
import {
  DEFAULT_SORT,
  INITIAL_FILTERS,
} from "@/components/applications/applicationList.constants";
import { PAGE_SIZE } from "@/components/shared/constants/paging";
import type { ApplicationFilterState } from "@/components/applications/applicationList.types";

type ApplicationsValue = ListFilters<ApplicationFilterState> & {
  sort: ApplicationSort;
  setSort: (sort: ApplicationSort) => void;
  setPage: Dispatch<SetStateAction<number>>;
  applications: Resource<PagedResult<ApplicationView>>;
  editor: Editor<ApplicationView>;
  /** The application whose walkthrough is open, or null while none is. */
  workflowFor: ApplicationView | null;
  showWorkflow: (application: ApplicationView) => void;
  closeWorkflow: () => void;
  deletion: DeleteConfirmation<ApplicationView>;
};

const ApplicationsContext = createContext<ApplicationsValue | null>(null);

export function ApplicationsProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState(0);
  const [sort, setSortState] = useState<ApplicationSort>(DEFAULT_SORT);

  // Any filter change invalidates the current page number: staying on page 4 while narrowing to
  // a filter with six results shows an empty table and looks like a bug.
  const filters = useListFilters(INITIAL_FILTERS, () => setPage(0));

  const applications = useResource(
    () => applicationsApi.list({ ...filters.filters, sort, page, size: PAGE_SIZE }),
    [...Object.values(filters.filters), sort, page],
  );

  // Deleting the last row on the last page leaves this asking for a page that has gone.
  usePageGuard(applications.data, setPage);

  const editor = useEditor<ApplicationView>();
  const [workflowFor, setWorkflowFor] = useState<ApplicationView | null>(null);

  const deletion = useDeleteConfirmation<ApplicationView>({
    remove: (application) => applicationsApi.remove(application.id),
    deleted: "Application deleted",
    failed: "Could not delete that application",
    onDeleted: applications.reload,
  });

  function setSort(next: ApplicationSort) {
    setSortState(next);
    setPage(0);
  }

  const value: ApplicationsValue = {
    ...filters,
    sort,
    setSort,
    setPage,
    applications,
    editor,
    workflowFor,
    showWorkflow: setWorkflowFor,
    closeWorkflow: () => setWorkflowFor(null),
    deletion,
  };

  return <ApplicationsContext.Provider value={value}>{children}</ApplicationsContext.Provider>;
}

export function useApplications(): ApplicationsValue {
  const value = useContext(ApplicationsContext);
  if (!value) throw new Error("useApplications must be used inside <ApplicationsProvider>");
  return value;
}
