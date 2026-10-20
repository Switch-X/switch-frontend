"use client";

/**
 * The chosen application's heading and its walkthrough.
 *
 * <p>Separate from `WorkflowTimeline` because the dialog on the applications page already has a
 * heading of its own - this is the part only the page needs.
 */

import { Icon } from "@/components/ui/icons";
import { useWorkflows } from "@/components/workflows/context/WorkflowsProvider";
import { WorkflowTimeline } from "./WorkflowTimeline";

export function SelectedWorkflow() {
  const { applications, selected } = useWorkflows();

  if (applications.loading) return null;

  if (!selected) {
    return (
      <div className="px-6 py-16 text-center">
        <span className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-surface-sunken text-ink-subtle">
          <Icon.Clock />
        </span>
        <h2 className="text-base font-semibold text-ink">No applications yet</h2>
        <p className="mx-auto mt-1 max-w-sm text-sm text-ink-muted">
          Add an application and its workflow builds itself from there - every call, take-home
          and interview round you log against it lands here in order.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 border-b border-border pb-4">
        <h2 className="font-display text-xl font-bold tracking-tight text-ink">
          {selected.companyName}
        </h2>
        <p className="mt-0.5 text-sm text-ink-muted">{selected.jobProfile ?? "Role not set"}</p>
      </div>

      {/* Keyed so switching application refetches rather than showing the last one's steps. */}
      <WorkflowTimeline key={selected.id} applicationId={selected.id} />
    </div>
  );
}
