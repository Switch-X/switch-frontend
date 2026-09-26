"use client";

import { Card } from "@/components/ui/Card";
import { ErrorNote } from "@/components/ui/ErrorNote";
import { SkeletonList } from "@/components/ui/Skeleton";
import { Icon } from "@/components/ui/icons";
import { FilterableEmptyState } from "@/components/shared/list/FilterableEmptyState";
import { linkedCompanyName } from "@/components/shared/utils/companyNames";
import { InterviewCard } from "@/components/interviews/card/InterviewCard";
import { useInterviews } from "@/components/interviews/context/InterviewsProvider";

/**
 * The cards, in the order the backend sent them.
 *
 * <p>Left alone on purpose: `InterviewServiceImpl` sorts upcoming first by nearest date, then past
 * by most recent, then undated - computed against the account holder's own timezone rather than
 * the server's. Re-sorting here would throw that away and get it wrong for anyone whose zone
 * differs from this browser's.
 */
export function InterviewList() {
  const {
    interviews,
    companyOf,
    filtered,
    clearFilters,
    editor,
    openRound,
    interviewDeletion,
    roundDeletion,
  } = useInterviews();
  const rows = interviews.data ?? [];

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
          onSampleDataLoaded={interviews.reload}
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
          company={linkedCompanyName(
            companyOf,
            interview.applicationId,
            "Not linked to an application",
          )}
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
