"use client";

/**
 * Everything the screening calls page's islands share: the filters, the list, the company names
 * for its rows, and which record is open in the editor or waiting on a delete confirmation.
 */

import { createContext, useContext, type ReactNode } from "react";
import { api } from "@/lib/api";
import { useEditor, useResource, type Editor, type Resource } from "@/lib/hooks";
import type { ScreeningCallView } from "@/lib/types";
import { useCompanyNames } from "@/components/shared/hooks/useCompanyNames";
import {
  useDeleteConfirmation,
  type DeleteConfirmation,
} from "@/components/shared/hooks/useDeleteConfirmation";
import { useListFilters, type ListFilters } from "@/components/shared/hooks/useListFilters";
import { INITIAL_FILTERS } from "@/components/screening-calls/constants/screeningCallList";
import type { ScreeningCallFilterState } from "@/components/screening-calls/types/screeningCallList";

type ScreeningCallsValue = ListFilters<ScreeningCallFilterState> & {
  calls: Resource<ScreeningCallView[]>;
  companyOf: Map<number, string>;
  editor: Editor<ScreeningCallView>;
  deletion: DeleteConfirmation<ScreeningCallView>;
};

const ScreeningCallsContext = createContext<ScreeningCallsValue | null>(null);

export function ScreeningCallsProvider({ children }: { children: ReactNode }) {
  const filters = useListFilters(INITIAL_FILTERS);

  const calls = useResource(
    () => api.screeningCalls.list(filters.filters),
    Object.values(filters.filters),
  );

  const companyOf = useCompanyNames();
  const editor = useEditor<ScreeningCallView>();

  const deletion = useDeleteConfirmation<ScreeningCallView>({
    remove: (call) => api.screeningCalls.remove(call.id),
    deleted: "Screening call deleted",
    failed: "Could not delete that call",
    onDeleted: calls.reload,
  });

  const value: ScreeningCallsValue = { ...filters, calls, companyOf, editor, deletion };

  return <ScreeningCallsContext.Provider value={value}>{children}</ScreeningCallsContext.Provider>;
}

export function useScreeningCalls(): ScreeningCallsValue {
  const value = useContext(ScreeningCallsContext);
  if (!value) throw new Error("useScreeningCalls must be used inside <ScreeningCallsProvider>");
  return value;
}
