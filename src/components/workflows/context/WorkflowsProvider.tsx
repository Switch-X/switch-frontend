"use client";

/**
 * Which application's workflow the page is showing.
 *
 * <p>The list is the light `options` call - an id and a label - because that is all a picker can
 * show. The timeline for whichever one is chosen is fetched separately, by the component that
 * draws it, so switching between applications does not refetch the list.
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { applicationsApi } from "@/components/applications/applications.api";
import type { ApplicationOption } from "@/components/applications/applications.types";
import { useResource, type Resource } from "@/lib/hooks/useResource";

type WorkflowsValue = {
  applications: Resource<ApplicationOption[]>;
  /** The application being shown, or null while the list is still loading or empty. */
  selected: ApplicationOption | null;
  select: (application: ApplicationOption) => void;
};

const WorkflowsContext = createContext<WorkflowsValue | null>(null);

export function WorkflowsProvider({ children }: { children: ReactNode }) {
  const applications = useResource(() => applicationsApi.options(), []);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const options = applications.data ?? [];

  // Open on the most recently touched application rather than on an empty pane. `options` is
  // already in that order, so the first one is the right one.
  useEffect(() => {
    if (selectedId === null && options.length > 0) setSelectedId(options[0].id);
  }, [selectedId, options]);

  const selected = options.find((option) => option.id === selectedId) ?? null;

  return (
    <WorkflowsContext.Provider
      value={{ applications, selected, select: (option) => setSelectedId(option.id) }}
    >
      {children}
    </WorkflowsContext.Provider>
  );
}

export function useWorkflows(): WorkflowsValue {
  const value = useContext(WorkflowsContext);
  if (!value) throw new Error("useWorkflows must be used inside <WorkflowsProvider>");
  return value;
}
