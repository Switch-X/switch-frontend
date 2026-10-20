"use client";

/**
 * Steps back when the page being shown has fallen off the end of the list.
 *
 * <p>The page number lives in the browser and the row count lives on the server, so the two can
 * disagree. Delete the only row on the last page and the server now has one page fewer, but the
 * screen is still asking for the page that has gone: the answer is a page with no rows on it and
 * a total that says there are plenty. The table shows its empty state - "nothing here yet" - and
 * the pager hides itself, because there is no longer more than one page to move between. The rows
 * that do exist become unreachable without a reload.
 *
 * <p>Clamping on the server instead would be worse: it would answer a different page than the one
 * asked for, and the screen would have no idea which page it was looking at.
 */

import { useEffect, type Dispatch, type SetStateAction } from "react";

import type { PagedResult } from "@/lib/types";

export function usePageGuard(
  data: PagedResult<unknown> | null,
  setPage: Dispatch<SetStateAction<number>>,
): void {
  const page = data?.page ?? 0;
  const empty = data?.content.length === 0;
  const total = data?.totalElements ?? 0;
  const lastPage = (data?.totalPages ?? 1) - 1;

  useEffect(() => {
    // An empty first page is an empty list, which is a real answer and not this hook's business.
    if (page > 0 && empty && total > 0) {
      setPage(Math.max(0, lastPage));
    }
  }, [page, empty, total, lastPage, setPage]);
}
