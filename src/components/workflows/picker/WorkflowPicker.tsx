"use client";

/**
 * The applications to choose between, down the side of the page.
 *
 * <p>A list rather than a dropdown: the point of this page is comparing how far along each
 * application is, and a dropdown hides every one you are not looking at.
 */

import { cx } from "@/lib/cx";
import { ErrorNote } from "@/components/ui/feedback/ErrorNote";
import { SkeletonList } from "@/components/ui/feedback/Skeleton";
import { useWorkflows } from "@/components/workflows/context/WorkflowsProvider";

export function WorkflowPicker() {
  const { applications, selected, select } = useWorkflows();

  if (applications.loading) {
    return <SkeletonList count={5} itemClassName="h-14" className="space-y-2 p-4" />;
  }
  if (applications.error) {
    return (
      <div className="p-4">
        <ErrorNote>{applications.error}</ErrorNote>
      </div>
    );
  }

  const options = applications.data ?? [];
  if (options.length === 0) return null;

  return (
    <ul className="max-h-[32rem] overflow-y-auto p-2">
      {options.map((option) => {
        const active = option.id === selected?.id;
        return (
          <li key={option.id}>
            <button
              type="button"
              onClick={() => select(option)}
              aria-current={active ? "true" : undefined}
              className={cx(
                "w-full rounded-lg px-3 py-2.5 text-left transition",
                active ? "bg-brand-soft" : "hover:bg-surface-muted",
              )}
            >
              <span
                className={cx(
                  "block truncate text-sm font-medium",
                  active ? "text-brand" : "text-ink",
                )}
              >
                {option.companyName}
              </span>
              <span className="block truncate text-xs text-ink-subtle">
                {option.jobProfile ?? "Role not set"}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
