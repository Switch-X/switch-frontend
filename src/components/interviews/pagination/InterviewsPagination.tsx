"use client";

import { ListPagination, hasPages } from "@/components/shared/list/ListPagination";
import { useInterviews } from "@/components/interviews/context/InterviewsProvider";
import { Card } from "@/components/ui/layout/Card";

/**
 * The only one of the four pagers that draws its own card.
 *
 * <p>Interviews are rendered as free-standing cards rather than rows in a table, so there is no
 * table card for the pager to close off - it needs a container of its own. Nothing is drawn at
 * all when there is only one page, or the card would be an empty box.
 */
export function InterviewsPagination() {
  const { interviews, setPage } = useInterviews();

  if (!hasPages(interviews.data)) return null;

  return (
    <Card>
      <ListPagination data={interviews.data} onPage={setPage} />
    </Card>
  );
}
