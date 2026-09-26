/**
 * The interviews list.
 *
 * <p>Cards rather than a table, because an interview is a thread with a variable number of
 * rounds hanging off it, each with its own interviewer, questions and outcome.
 *
 * <p>The order is the backend's and is left alone: `InterviewServiceImpl` sorts upcoming first
 * against the account holder's own timezone, which re-sorting in the browser would throw away.
 *
 * <p>A server component: the heading renders here, and the filters, cards and dialogs are client
 * islands from `components/interviews/`, sharing one provider.
 */

import { InterviewsProvider } from "@/components/interviews/context/InterviewsProvider";
import { InterviewDialogs } from "@/components/interviews/dialogs/InterviewDialogs";
import { InterviewFilters } from "@/components/interviews/filters/InterviewFilters";
import { NewInterviewButton } from "@/components/interviews/header/NewInterviewButton";
import { InterviewList } from "@/components/interviews/list/InterviewList";
import { PageHeader } from "@/components/ui/PageHeader";

export default function InterviewsPage() {
  return (
    <InterviewsProvider>
      <div className="space-y-6">
        <PageHeader
          title="Interviews"
          description="Upcoming first, then the most recent behind you."
          actions={<NewInterviewButton />}
        />

        <InterviewFilters />
        <InterviewList />
        <InterviewDialogs />
      </div>
    </InterviewsProvider>
  );
}
