/**
 * The interviews list.
 *
 * <p>Cards rather than a table, because an interview is a thread with a variable number of
 * rounds hanging off it, each with its own interviewer, questions and outcome.
 *
 * <p>The order is the backend's and is left alone: latest interview date first, with the undated
 * ones at the back. Ten to a page.
 *
 * <p>A server component: the heading renders here, and the filters, cards and dialogs are client
 * islands from `components/interviews/`, sharing one provider.
 */

import { InterviewsProvider } from "@/components/interviews/context/InterviewsProvider";
import { InterviewDialogs } from "@/components/interviews/dialogs/InterviewDialogs";
import { InterviewFilters } from "@/components/interviews/filters/InterviewFilters";
import { NewInterviewButton } from "@/components/interviews/header/NewInterviewButton";
import { InterviewList } from "@/components/interviews/list/InterviewList";
import { InterviewsPagination } from "@/components/interviews/pagination/InterviewsPagination";
import { PageHeader } from "@/components/ui/layout/PageHeader";

export default function InterviewsPage() {
  return (
    <InterviewsProvider>
      <div className="space-y-6">
        <PageHeader
          title="Interviews"
          description="The most recent first."
          actions={<NewInterviewButton />}
        />

        <InterviewFilters />
        <InterviewList />
        <InterviewsPagination />
        <InterviewDialogs />
      </div>
    </InterviewsProvider>
  );
}
