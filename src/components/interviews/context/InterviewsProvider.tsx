"use client";

/**
 * Everything the interviews page's islands share: the filters, the list, the company names for
 * its cards, and which interview or round is open in a dialog or waiting on a delete confirmation.
 */

import { interviewsApi } from "@/components/interviews/interviews.api";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import { type Editor, useEditor } from "@/lib/hooks/useEditor";
import { type Resource, useResource } from "@/lib/hooks/useResource";
import type { InterviewRoundView, InterviewView } from "@/components/interviews/interviews.types";
import {
  useDeleteConfirmation,
  type DeleteConfirmation,
} from "@/components/shared/hooks/useDeleteConfirmation";
import { useListFilters, type ListFilters } from "@/components/shared/hooks/useListFilters";
import { usePageGuard } from "@/components/shared/hooks/usePageGuard";
import { INITIAL_FILTERS } from "@/components/interviews/interviewList.constants";
import { PAGE_SIZE } from "@/components/shared/constants/paging";
import type { PagedResult } from "@/lib/types";
import type {
  InterviewFilterState,
  RoundDeleteTarget,
  RoundTarget,
} from "@/components/interviews/interviewList.types";

type InterviewsValue = ListFilters<InterviewFilterState> & {
  setPage: Dispatch<SetStateAction<number>>;
  interviews: Resource<PagedResult<InterviewView>>;
  editor: Editor<InterviewView>;
  roundTarget: RoundTarget | null;
  openRound: (interview: InterviewView, round: InterviewRoundView | null) => void;
  closeRound: () => void;
  interviewDeletion: DeleteConfirmation<InterviewView>;
  roundDeletion: DeleteConfirmation<RoundDeleteTarget>;
};

const InterviewsContext = createContext<InterviewsValue | null>(null);

export function InterviewsProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState(0);

  // Any filter change invalidates the current page number: staying on page 4 while narrowing to
  // a filter with six results shows an empty table and looks like a bug.
  const filters = useListFilters(INITIAL_FILTERS, () => setPage(0));

  const interviews = useResource(
    () => interviewsApi.list({ ...filters.filters, page, size: PAGE_SIZE }),
    [...Object.values(filters.filters), page],
  );

  // Deleting the last row on the last page leaves this asking for a page that has gone.
  usePageGuard(interviews.data, setPage);

  // With the role as well as the company: one company can have more than one loop open.
  const editor = useEditor<InterviewView>();

  const [roundTarget, setRoundTarget] = useState<RoundTarget | null>(null);
  const openRound = useCallback(
    (interview: InterviewView, round: InterviewRoundView | null) =>
      setRoundTarget({ interview, round }),
    [],
  );
  const closeRound = useCallback(() => setRoundTarget(null), []);

  const interviewDeletion = useDeleteConfirmation<InterviewView>({
    remove: (interview) => interviewsApi.remove(interview.id),
    deleted: "Interview deleted",
    failed: "Could not delete that interview",
    onDeleted: interviews.reload,
  });

  const roundDeletion = useDeleteConfirmation<RoundDeleteTarget>({
    remove: ({ interview, round }) => interviewsApi.removeRound(interview.id, round.roundId),
    deleted: "Round removed",
    failed: "Could not remove that round",
    onDeleted: interviews.reload,
  });

  const value: InterviewsValue = {
    ...filters,
    setPage,
    interviews,
    editor,
    roundTarget,
    openRound,
    closeRound,
    interviewDeletion,
    roundDeletion,
  };

  return <InterviewsContext.Provider value={value}>{children}</InterviewsContext.Provider>;
}

export function useInterviews(): InterviewsValue {
  const value = useContext(InterviewsContext);
  if (!value) throw new Error("useInterviews must be used inside <InterviewsProvider>");
  return value;
}
