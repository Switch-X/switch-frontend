"use client";

/**
 * Everything the interviews page's islands share: the filters, the list, the company names for
 * its cards, and which interview or round is open in a dialog or waiting on a delete confirmation.
 */

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { api } from "@/lib/api";
import { useEditor, useResource, type Editor, type Resource } from "@/lib/hooks";
import type { InterviewRoundView, InterviewView } from "@/lib/types";
import { useCompanyNames } from "@/components/shared/hooks/useCompanyNames";
import {
  useDeleteConfirmation,
  type DeleteConfirmation,
} from "@/components/shared/hooks/useDeleteConfirmation";
import { useListFilters, type ListFilters } from "@/components/shared/hooks/useListFilters";
import { INITIAL_FILTERS } from "@/components/interviews/constants/interviewList";
import type {
  InterviewFilterState,
  RoundDeleteTarget,
  RoundTarget,
} from "@/components/interviews/types/interviewList";

type InterviewsValue = ListFilters<InterviewFilterState> & {
  interviews: Resource<InterviewView[]>;
  companyOf: Map<number, string>;
  editor: Editor<InterviewView>;
  roundTarget: RoundTarget | null;
  openRound: (interview: InterviewView, round: InterviewRoundView | null) => void;
  closeRound: () => void;
  interviewDeletion: DeleteConfirmation<InterviewView>;
  roundDeletion: DeleteConfirmation<RoundDeleteTarget>;
};

const InterviewsContext = createContext<InterviewsValue | null>(null);

export function InterviewsProvider({ children }: { children: ReactNode }) {
  const filters = useListFilters(INITIAL_FILTERS);

  const interviews = useResource(
    () => api.interviews.list(filters.filters),
    Object.values(filters.filters),
  );

  // With the role as well as the company: one company can have more than one loop open.
  const companyOf = useCompanyNames({ withRole: true });
  const editor = useEditor<InterviewView>();

  const [roundTarget, setRoundTarget] = useState<RoundTarget | null>(null);
  const openRound = useCallback(
    (interview: InterviewView, round: InterviewRoundView | null) =>
      setRoundTarget({ interview, round }),
    [],
  );
  const closeRound = useCallback(() => setRoundTarget(null), []);

  const interviewDeletion = useDeleteConfirmation<InterviewView>({
    remove: (interview) => api.interviews.remove(interview.id),
    deleted: "Interview deleted",
    failed: "Could not delete that interview",
    onDeleted: interviews.reload,
  });

  const roundDeletion = useDeleteConfirmation<RoundDeleteTarget>({
    remove: ({ interview, round }) => api.interviews.removeRound(interview.id, round.roundId),
    deleted: "Round removed",
    failed: "Could not remove that round",
    onDeleted: interviews.reload,
  });

  const value: InterviewsValue = {
    ...filters,
    interviews,
    companyOf,
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
