"use client";

/**
 * The pager under a list.
 *
 * <p>Takes the page and a setter rather than reading a context, so one copy serves all four
 * lists. Each feature wraps it in a few lines that pull those two things out of its own provider,
 * which is what lets the pages stay server components: they render `<XPagination />` with no
 * props and the wrapper supplies them on the client.
 *
 * <p>Previous and Next rather than numbered pages. The count comes from the server and the
 * screens it sits under hold tens of rows, so a row of numbers would be nine buttons to replace
 * one - and `hasNext`/`hasPrevious` already say exactly when each end is reached.
 */

import type { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button/Button";
import { Icon } from "@/components/ui/icons";
import type { PagedResult } from "@/lib/types";

/**
 * Whether a pager is worth showing: more than one page of results.
 *
 * <p>Exported because a caller sometimes has to know before rendering. The interviews list puts
 * its pager in a card of its own, and a card holding a component that returns null is an empty
 * bordered box - so that wrapper asks this first rather than drawing the frame and hoping.
 */
export function hasPages(data: PagedResult<unknown> | null): boolean {
  return data !== null && data.totalPages > 1;
}

export function ListPagination({
  data,
  onPage,
}: {
  /** The page as the server sent it, or null while the first one is still loading. */
  data: PagedResult<unknown> | null;
  onPage: Dispatch<SetStateAction<number>>;
}) {
  // A pager that can only say "Page 1 of 1" is noise.
  if (!hasPages(data) || !data) return null;

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
          onClick={() => onPage((current) => Math.max(0, current - 1))}
        >
          <Icon.ChevronLeft className="size-4" />
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={!data.hasNext}
          onClick={() => onPage((current) => current + 1)}
        >
          Next
          <Icon.ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
