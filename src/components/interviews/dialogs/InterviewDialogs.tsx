"use client";

import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useToast } from "@/components/ui/Toast";
import { useInterviews } from "@/components/interviews/context/InterviewsProvider";
import { InterviewForm } from "@/components/interviews/form/InterviewForm";
import { RoundForm } from "@/components/interviews/round-form/RoundForm";

/**
 * The page's four dialogs: the interview editor, the round editor, and a delete confirmation for
 * each. Nothing is on screen until one of them is opened.
 */
export function InterviewDialogs() {
  const { editor, roundTarget, closeRound, interviews, interviewDeletion, roundDeletion } =
    useInterviews();
  const toast = useToast();

  function saved(message: string) {
    toast(message);
    interviews.reload();
  }

  return (
    <>
      {editor.open && (
        <InterviewForm
          key={editor.editing?.id ?? "new"}
          open={editor.open}
          editing={editor.editing}
          onClose={editor.close}
          onSaved={saved}
        />
      )}

      {roundTarget && (
        <RoundForm
          key={`${roundTarget.interview.id}-${roundTarget.round?.roundId ?? "new"}`}
          open
          interview={roundTarget.interview}
          editing={roundTarget.round}
          onClose={closeRound}
          onSaved={(_updated, message) => saved(message)}
        />
      )}

      <ConfirmDialog
        open={interviewDeletion.pending !== null}
        busy={interviewDeletion.busy}
        title="Delete this interview?"
        message="Every round on it, with its questions and feedback, goes too. This cannot be undone."
        onCancel={interviewDeletion.cancel}
        onConfirm={interviewDeletion.confirm}
      />

      <ConfirmDialog
        open={roundDeletion.pending !== null}
        busy={roundDeletion.busy}
        confirmLabel="Remove round"
        title="Remove this round?"
        message="The round and everything recorded on it will be removed from this interview."
        onCancel={roundDeletion.cancel}
        onConfirm={roundDeletion.confirm}
      />
    </>
  );
}
