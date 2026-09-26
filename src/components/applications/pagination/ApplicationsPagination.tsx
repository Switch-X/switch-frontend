"use client";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { useApplications } from "@/components/applications/context/ApplicationsProvider";

/** Hidden while everything fits on one page. */
export function ApplicationsPagination() {
  const { applications, setPage } = useApplications();
  const data = applications.data;

  if (!data || data.totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-3.5">
      <span className="text-sm text-ink-muted">
        Page {data.page + 1} of {data.totalPages}
      </span>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={!data.hasPrevious}
          onClick={() => setPage((current) => Math.max(0, current - 1))}
        >
          <Icon.ChevronLeft className="size-4" />
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={!data.hasNext}
          onClick={() => setPage((current) => current + 1)}
        >
          Next
          <Icon.ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
