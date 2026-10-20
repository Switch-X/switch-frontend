"use client";

import { ConfirmDialog } from "@/components/ui/overlay/ConfirmDialog";
import { useToast } from "@/components/ui/feedback/Toast";
import { useScreeningCalls } from "@/components/screening-calls/context/ScreeningCallsProvider";
import { ScreeningCallForm } from "@/components/screening-calls/form/ScreeningCallForm";

/** The create/edit dialog and the delete confirmation - nothing on screen until one is opened. */
export function ScreeningCallDialogs() {
  const { editor, deletion, calls } = useScreeningCalls();
  const toast = useToast();

  return (
    <>
      {editor.open && (
        <ScreeningCallForm
          key={editor.editing?.id ?? "new"}
          open={editor.open}
          editing={editor.editing}
          onClose={editor.close}
          onSaved={(message) => {
            toast(message);
            calls.reload();
          }}
        />
      )}

      <ConfirmDialog
        open={deletion.pending !== null}
        busy={deletion.busy}
        title="Delete this screening call?"
        message="The call and everything recorded on it will be removed. This cannot be undone."
        onCancel={deletion.cancel}
        onConfirm={deletion.confirm}
      />
    </>
  );
}
