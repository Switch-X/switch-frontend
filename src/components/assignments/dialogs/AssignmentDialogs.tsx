"use client";

import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useToast } from "@/components/ui/Toast";
import { useAssignments } from "@/components/assignments/context/AssignmentsProvider";
import { AssignmentForm } from "@/components/assignments/form/AssignmentForm";

/** The create/edit dialog and the delete confirmation - nothing on screen until one is opened. */
export function AssignmentDialogs() {
  const { editor, deletion, assignments } = useAssignments();
  const toast = useToast();

  return (
    <>
      {editor.open && (
        <AssignmentForm
          key={editor.editing?.id ?? "new"}
          open={editor.open}
          editing={editor.editing}
          onClose={editor.close}
          onSaved={(message) => {
            toast(message);
            assignments.reload();
          }}
        />
      )}

      <ConfirmDialog
        open={deletion.pending !== null}
        busy={deletion.busy}
        title="Delete this assignment?"
        message="The assignment and everything recorded on it will be removed. This cannot be undone."
        onCancel={deletion.cancel}
        onConfirm={deletion.confirm}
      />
    </>
  );
}
