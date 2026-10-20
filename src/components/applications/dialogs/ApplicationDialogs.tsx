"use client";

import { ConfirmDialog } from "@/components/ui/overlay/ConfirmDialog";
import { Modal } from "@/components/ui/overlay/Modal";
import { WorkflowTimeline } from "@/components/workflows/timeline/WorkflowTimeline";
import { useToast } from "@/components/ui/feedback/Toast";
import { useApplications } from "@/components/applications/context/ApplicationsProvider";
import { ApplicationForm } from "@/components/applications/form/ApplicationForm";

/** The create/edit dialog and the delete confirmation - nothing on screen until one is opened. */
export function ApplicationDialogs() {
  const { editor, deletion, applications, workflowFor, closeWorkflow } = useApplications();
  const toast = useToast();

  return (
    <>
      {editor.open && (
        <ApplicationForm
          // Remounts between records, so the fields never carry over from the last one opened.
          key={editor.editing?.id ?? "new"}
          open={editor.open}
          editing={editor.editing}
          onClose={editor.close}
          onSaved={(message) => {
            toast(message);
            applications.reload();
          }}
        />
      )}

      <Modal
        open={workflowFor !== null}
        onClose={closeWorkflow}
        title={workflowFor ? workflowFor.companyName : "Workflow"}
        description={
          workflowFor?.jobProfile
            ? `${workflowFor.jobProfile} — everything that has happened so far`
            : "Everything that has happened so far"
        }
      >
        {workflowFor && <WorkflowTimeline applicationId={workflowFor.id} />}
      </Modal>

      <ConfirmDialog
        open={deletion.pending !== null}
        busy={deletion.busy}
        title="Delete this application?"
        message={
          <>
            <strong className="text-ink">{deletion.pending?.companyName}</strong> will be removed,
            along with every interview, assignment and screening call linked to it. This cannot be
            undone.
          </>
        }
        onCancel={deletion.cancel}
        onConfirm={deletion.confirm}
      />
    </>
  );
}
