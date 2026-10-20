"use client";

/**
 * One application's walkthrough, start to now.
 *
 * <p>Reads the trail the backend writes as things happen - see `ApplicationTimelineRecorder` -
 * rather than stitching four lists together here. That matters for ordering: a screening call
 * logged a week late still sits where it happened, because the backend recorded the day it
 * happened on and not the day it was typed in.
 *
 * <p>Shown in two places: the Workflows page, and a dialog off an application row. Both open the
 * same view, so there is one component rather than a page version and a dialog version that
 * drift apart.
 */

import { applicationsApi } from "@/components/applications/applications.api";
import { useResource } from "@/lib/hooks/useResource";
import { formatDayOf, formatInstant } from "@/lib/format";
import { cx } from "@/lib/cx";
import { ErrorNote } from "@/components/ui/feedback/ErrorNote";
import { SkeletonList } from "@/components/ui/feedback/Skeleton";
import { Icon } from "@/components/ui/icons";
import { WORKFLOW_STEPS } from "./workflow.constants";

export function WorkflowTimeline({ applicationId }: { applicationId: number }) {
  const timeline = useResource(() => applicationsApi.timeline(applicationId), [applicationId]);

  if (timeline.loading) return <SkeletonList count={4} itemClassName="h-12" className="space-y-4" />;
  if (timeline.error) return <ErrorNote>{timeline.error}</ErrorNote>;

  const steps = timeline.data ?? [];

  if (steps.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-ink-muted">
        Nothing has happened yet. Log a screening call, a take-home or an interview round and it
        will show up here.
      </p>
    );
  }

  return (
    <ol className="relative space-y-1">
      {steps.map((step, index) => {
        const look = WORKFLOW_STEPS[step.event];
        const StepIcon = Icon[look.icon];
        const last = index === steps.length - 1;

        return (
          <li key={step.id} className="relative flex gap-4 pb-5 last:pb-0">
            {/* The line joining one step to the next. Not drawn under the final step, or it
                would trail off as if something were missing. */}
            {!last && (
              <span
                aria-hidden="true"
                className="absolute top-9 bottom-0 left-[1.0625rem] w-px bg-border"
              />
            )}

            <span
              className={cx(
                "relative z-10 flex size-[2.125rem] shrink-0 items-center justify-center rounded-full text-white ring-4",
                look.dot,
                look.ring,
              )}
            >
              <StepIcon className="size-4" />
            </span>

            <div className="min-w-0 flex-1 pt-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h4 className="text-sm font-semibold text-ink">{look.label}</h4>
                {/* A time is only shown when there is a real one. A step taken from a date the
                    user typed has none, and "05:30" beside it would be invented. */}
                <time
                  dateTime={step.happenedAt}
                  className="shrink-0 text-xs text-ink-subtle tabular-nums"
                >
                  {step.dayOnly ? formatDayOf(step.happenedAt) : formatInstant(step.happenedAt)}
                </time>
              </div>
              {step.detail && (
                <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{step.detail}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
