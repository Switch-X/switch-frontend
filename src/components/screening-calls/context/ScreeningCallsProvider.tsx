"use client";

/**
 * Everything the screening calls page's islands share: the filters, the list, the company names
 * for its rows, and which record is open in the editor or waiting on a delete confirmation.
 */

import { screeningCallsApi } from "@/components/screening-calls/screeningCalls.api";
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
import type { ScreeningCallView } from "@/components/screening-calls/screeningCalls.types";
import {
  useDeleteConfirmation,
  type DeleteConfirmation,
} from "@/components/shared/hooks/useDeleteConfirmation";
import { useListFilters, type ListFilters } from "@/components/shared/hooks/useListFilters";
import { usePageGuard } from "@/components/shared/hooks/usePageGuard";
import { INITIAL_FILTERS } from "@/components/screening-calls/screeningCallList.constants";
import { PAGE_SIZE } from "@/components/shared/constants/paging";
import type { PagedResult } from "@/lib/types";
import type { ScreeningCallFilterState } from "@/components/screening-calls/screeningCallList.types";

type ScreeningCallsValue = ListFilters<ScreeningCallFilterState> & {
  setPage: Dispatch<SetStateAction<number>>;
  calls: Resource<PagedResult<ScreeningCallView>>;
  editor: Editor<ScreeningCallView>;
  deletion: DeleteConfirmation<ScreeningCallView>;
};

const ScreeningCallsContext = createContext<ScreeningCallsValue | null>(null);

export function ScreeningCallsProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState(0);

  // Any filter change invalidates the current page number: staying on page 4 while narrowing to
  // a filter with six results shows an empty table and looks like a bug.
  const filters = useListFilters(INITIAL_FILTERS, () => setPage(0));

  const calls = useResource(
    () => screeningCallsApi.list({ ...filters.filters, page, size: PAGE_SIZE }),
    [...Object.values(filters.filters), page],
  );

  // Deleting the last row on the last page leaves this asking for a page that has gone.
  usePageGuard(calls.data, setPage);

  const editor = useEditor<ScreeningCallView>();

  const deletion = useDeleteConfirmation<ScreeningCallView>({
    remove: (call) => screeningCallsApi.remove(call.id),
    deleted: "Screening call deleted",
    failed: "Could not delete that call",
    onDeleted: calls.reload,
  });

  const value: ScreeningCallsValue = { ...filters, setPage, calls, editor, deletion };

  return <ScreeningCallsContext.Provider value={value}>{children}</ScreeningCallsContext.Provider>;
}

export function useScreeningCalls(): ScreeningCallsValue {
  const value = useContext(ScreeningCallsContext);
  if (!value) throw new Error("useScreeningCalls must be used inside <ScreeningCallsProvider>");
  return value;
}
