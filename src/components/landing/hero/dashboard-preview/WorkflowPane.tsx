import { cx } from "@/lib/cx";
import { Icon } from "@/components/ui/icons";
import { EXAMPLE_WORKFLOW } from "./exampleWorkflow.constants";
import { WORKFLOW_STEPS } from "@/components/workflows/timeline/workflow.constants";

/** The Workflows page at miniature scale - the same steps, the same colours. */
export function WorkflowPane() {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] font-semibold">Stripe — Backend Engineer</span>
        <span className="text-[9px] text-ink-subtle">4 steps</span>
      </div>

      <ol className="rounded-lg border border-border p-2.5">
        {EXAMPLE_WORKFLOW.map((step, index) => {
          const look = WORKFLOW_STEPS[step.event];
          const StepIcon = Icon[look.icon];
          const last = index === EXAMPLE_WORKFLOW.length - 1;

          return (
            <li
              key={step.label}
              className="animate-rise relative flex gap-2 pb-3 last:pb-0"
              style={{ animationDelay: `${index * 90}ms`, animationFillMode: "backwards" }}
            >
              {!last && (
                <span className="absolute top-6 bottom-0 left-[0.65rem] w-px bg-border" />
              )}
              <span
                className={cx(
                  "relative z-10 flex size-[1.3rem] shrink-0 items-center justify-center rounded-full text-white ring-2",
                  look.dot,
                  look.ring,
                )}
              >
                <StepIcon className="size-2.5" />
              </span>
              <span className="flex min-w-0 flex-1 items-baseline justify-between gap-2">
                <span className="min-w-0">
                  <span className="block truncate text-[10px] font-medium">{step.label}</span>
                  <span className="block truncate text-[9px] text-ink-subtle">{step.detail}</span>
                </span>
                <span className="shrink-0 text-[9px] text-ink-subtle tabular-nums">{step.when}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
