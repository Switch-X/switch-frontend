"use client";

import { Card } from "@/components/ui/layout/Card";
import { ErrorNote } from "@/components/ui/feedback/ErrorNote";
import { SkeletonList } from "@/components/ui/feedback/Skeleton";
import { Icon } from "@/components/ui/icons";
import { FilterableEmptyState } from "@/components/shared/list/FilterableEmptyState";
import { applicationLabel } from "@/components/shared/utils/companyNames";
import { InterviewCard } from "@/components/interviews/card/InterviewCard";
import { useInterviews } from "@/components/interviews/context/InterviewsProvider";

/**
 * The cards, in the order the backend sent them.
 *
 * <p>Left alone on purpose, and now it has to be: the list is one page of a larger set, ordered
 * by the query. Sorting here would only reorder the ten rows on this page while the server
 * decided which ten they were, which looks sorted and is not.
 */
export function InterviewList() {
  const {
    interviews,
    filtered,
    clearFilters,
    editor,
    openRound,
    interviewDeletion,
    roundDeletion,
  } = useInterviews();
  const rows = interviews.data?.content ?? [];

  if (interviews.error) return <ErrorNote>{interviews.error}</ErrorNote>;

  if (interviews.loading && rows.length === 0) {
    return <SkeletonList count={3} className="space-y-4" itemClassName="h-44 w-full" />;
  }

  if (rows.length === 0) {
    return (
      <Card>
        <FilterableEmptyState
          filtered={filtered}
          icon={<Icon.Interviews />}
          title="No interviews yet"
          description="Add one when you get the invite, then add each round as it happens."
          createLabel="New interview"
          onCreate={editor.create}
          onClearFilters={clearFilters}
        />
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {rows.map((interview) => (
        <InterviewCard
          key={interview.id}
          interview={interview}
          company={applicationLabel(interview, "Not linked to an application")}
          onEdit={() => editor.edit(interview)}
          onDelete={() => interviewDeletion.request(interview)}
          onAddRound={() => openRound(interview, null)}
          onEditRound={(round) => openRound(interview, round)}
          onDeleteRound={(round) => roundDeletion.request({ interview, round })}
        />
      ))}
    </div>
  );
}
