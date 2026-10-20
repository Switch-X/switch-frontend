import type { ReactNode } from "react";
import type { InterviewRoundView } from "@/components/interviews/interviews.types";

/** What was asked, what was said, and why it did not go through - shown when a round is opened. */
export function RoundDetails({ round }: { round: InterviewRoundView }) {
  return (
    <div className="space-y-4 bg-surface-muted px-5 py-4 pl-16">
      {round.questionsAsked.length > 0 && (
        <DetailBlock title="Questions asked">
          <ul className="space-y-1.5">
            {round.questionsAsked.map((question, position) => (
              <li key={position} className="flex gap-2 text-sm text-ink-muted">
                <span className="text-ink-subtle">{position + 1}.</span>
                <span>{question}</span>
              </li>
            ))}
          </ul>
        </DetailBlock>
      )}

      {round.feedbackFromInterviewer && (
        <DetailBlock title="Feedback from the interviewer">
          <p className="text-sm whitespace-pre-line text-ink-muted">
            {round.feedbackFromInterviewer}
          </p>
        </DetailBlock>
      )}

      {round.rejectionReasons.length > 0 && (
        <DetailBlock title="Why it did not go through">
          <ul className="space-y-1 text-sm text-ink-muted">
            {round.rejectionReasons.map((reason, position) => (
              <li key={position}>· {reason}</li>
            ))}
          </ul>
        </DetailBlock>
      )}

      {round.remarks && (
        <DetailBlock title="Your notes">
          <p className="text-sm whitespace-pre-line text-ink-muted">{round.remarks}</p>
        </DetailBlock>
      )}
    </div>
  );
}

function DetailBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="mb-1.5 text-xs font-semibold tracking-wide text-ink-subtle uppercase">
        {title}
      </h3>
      {children}
    </div>
  );
}
