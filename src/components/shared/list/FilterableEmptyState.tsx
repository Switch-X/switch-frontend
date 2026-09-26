import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/icons";
import { SampleDataButton } from "@/components/shared/sample-data/SampleDataButton";

/**
 * The empty state every list shares, in its two forms.
 *
 * <p>An empty list behind filters and an empty account are different situations. The first needs
 * a way back to everything; the second needs a first record - or a worked example to look around in.
 */
export function FilterableEmptyState({
  filtered,
  icon,
  title,
  description,
  createLabel,
  onCreate,
  onClearFilters,
  onSampleDataLoaded,
}: {
  filtered: boolean;
  icon: ReactNode;
  /** Shown when there is nothing at all, rather than nothing matching. */
  title: string;
  description: string;
  createLabel: string;
  onCreate: () => void;
  onClearFilters: () => void;
  onSampleDataLoaded: () => void;
}) {
  return (
    <EmptyState
      icon={icon}
      title={filtered ? "Nothing matches those filters" : title}
      description={filtered ? "Try widening the filters above." : description}
      action={
        filtered ? (
          <Button variant="secondary" onClick={onClearFilters}>
            Clear filters
          </Button>
        ) : (
          <div className="flex flex-wrap justify-center gap-2">
            <Button onClick={onCreate}>
              <Icon.Plus className="size-4" />
              {createLabel}
            </Button>
            <SampleDataButton variant="secondary" onLoaded={onSampleDataLoaded} />
          </div>
        )
      }
    />
  );
}
