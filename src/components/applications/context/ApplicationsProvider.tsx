"use client";

/**
 * Everything the applications page's islands share: the filters, the sort, the page, the list,
 * and which record is open in the editor or waiting on a delete confirmation.
 *
 * <p>The page is a server component, so its header, card and layout render there; the filters,
 * table, pager and dialogs are separate client islands under it, and this is how they talk.
 */

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { api } from "@/lib/api";
import { useEditor, useResource, type Editor, type Resource } from "@/lib/hooks";
import type { ApplicationSort, ApplicationView, PagedResult } from "@/lib/types";
import {
  useDeleteConfirmation,
  type DeleteConfirmation,
} from "@/components/shared/hooks/useDeleteConfirmation";
import { useListFilters, type ListFilters } from "@/components/shared/hooks/useListFilters";
import {
  DEFAULT_SORT,
  INITIAL_FILTERS,
  PAGE_SIZE,
} from "@/components/applications/constants/applicationList";
import type { ApplicationFilterState } from "@/components/applications/types/applicationList";

type ApplicationsValue = ListFilters<ApplicationFilterState> & {
  sort: ApplicationSort;
  setSort: (sort: ApplicationSort) => void;
  setPage: Dispatch<SetStateAction<number>>;
  applications: Resource<PagedResult<ApplicationView>>;
  editor: Editor<ApplicationView>;
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
    () => api.applications.list({ ...filters.filters, sort, page, size: PAGE_SIZE }),
    [...Object.values(filters.filters), sort, page],
  );

  const editor = useEditor<ApplicationView>();

  const deletion = useDeleteConfirmation<ApplicationView>({
    remove: (application) => api.applications.remove(application.id),
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
    deletion,
  };

  return <ApplicationsContext.Provider value={value}>{children}</ApplicationsContext.Provider>;
}

export function useApplications(): ApplicationsValue {
  const value = useContext(ApplicationsContext);
  if (!value) throw new Error("useApplications must be used inside <ApplicationsProvider>");
  return value;
}
