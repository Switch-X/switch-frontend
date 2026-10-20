"use client";

/**
 * Create or edit a take-home assignment.
 *
 * <p>Always sends `submission` and `assignmentOutcome`, which update requires and create does not
 * - see `NEW_ASSIGNMENT` for the defaults a new one starts from.
 */

import { assignmentsApi } from "@/components/assignments/assignments.api";
import { ASSIGNMENT_OUTCOME, DIFFICULTY, SUBMISSION } from "@/lib/enums";
import { useFormFields } from "@/lib/hooks/useFormFields";
import { changedFields } from "@/lib/patch";
import type { AssignmentView } from "@/components/assignments/assignments.types";
import { Button } from "@/components/ui/button/Button";
import { ErrorNote } from "@/components/ui/feedback/ErrorNote";
import { Modal } from "@/components/ui/overlay/Modal";
import { EnumSelect } from "@/components/ui/form/EnumSelect";
import { Field } from "@/components/ui/form/Field";
import { Input } from "@/components/ui/form/Input";
import { Textarea } from "@/components/ui/form/Textarea";
import { ApplicationSelect } from "@/components/shared/application-select/ApplicationSelect";
import { StandaloneCompanyField } from "@/components/shared/application-select/StandaloneCompanyField";
import { useSaveForm } from "@/components/shared/hooks/useSaveForm";
import { savedMessage } from "@/components/shared/utils/interviewNudge";
import { NEW_ASSIGNMENT } from "@/components/assignments/form/assignmentForm.constants";
import {
  initialAssignmentForm,
  toAssignmentPayload,
} from "@/components/assignments/form/assignmentForm.utils";

export function AssignmentForm({
  open,
  editing,
  onClose,
  onSaved,
}: {
  open: boolean;
  editing: AssignmentView | null;
  onClose: () => void;
  onSaved: (message: string) => void;
}) {
  const [form, set] = useFormFields(() => initialAssignmentForm(editing));

  const { busy, error, fieldErrors, submit } = useSaveForm({
    save: () => {
      const payload = toAssignmentPayload(form);
      if (!editing) return assignmentsApi.create(payload);
      return assignmentsApi.update(
        editing.id,
        changedFields(toAssignmentPayload(initialAssignmentForm(editing)), payload),
      );
    },
    saved: savedMessage(
      form.assignmentOutcome === "INTERVIEWING",
      editing?.assignmentOutcome === "INTERVIEWING",
      editing ? "Assignment updated" : "Assignment added",
    ),
    offline: "Could not reach SWITCH. Your assignment was not saved.",
    onSaved,
    onClose,
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editing ? "Edit assignment" : "New assignment"}
      description="Take-home tasks, with the deadline you actually have to hit."
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button type="submit" form="assignment-form" loading={busy}>
            {editing ? "Save changes" : "Add assignment"}
          </Button>
        </>
      }
    >
      <form id="assignment-form" className="space-y-4" onSubmit={submit}>
        <Field
          label="Application"
          htmlFor="assignment-application"
          error={fieldErrors.applicationId}
          hint="Leave unlinked if this arrived outside an application you are tracking."
        >
          <ApplicationSelect
            id="assignment-application"
            value={form.applicationId}
            onChange={(applicationId) => set("applicationId", applicationId)}
          />
        </Field>

        <StandaloneCompanyField
          applicationId={form.applicationId}
          id="assignment-company"
          value={form.companyName}
          error={fieldErrors.companyName}
          hint="Who sent the task. Needed because there is no application to take it from."
          onChange={(value) => set("companyName", value)}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Assigned on" htmlFor="assignment-assigned" error={fieldErrors.dateAssigned}>
            <Input
              id="assignment-assigned"
              type="date"
              value={form.dateAssigned}
              onChange={(event) => set("dateAssigned", event.target.value)}
            />
          </Field>

          <Field
            label="Submit before"
            htmlFor="assignment-deadline"
            error={fieldErrors.submissionBefore}
          >
            <Input
              id="assignment-deadline"
              type="date"
              value={form.submissionBefore}
              onChange={(event) => set("submissionBefore", event.target.value)}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Submission" htmlFor="assignment-submission" required error={fieldErrors.submission}>
            <EnumSelect
              id="assignment-submission"
              table={SUBMISSION}
              value={form.submission}
              placeholder="Choose one"
              onChange={(value) => set("submission", value ?? NEW_ASSIGNMENT.submission)}
            />
          </Field>

          <Field
            label="Outcome"
            htmlFor="assignment-outcome"
            required
            error={fieldErrors.assignmentOutcome}
          >
            <EnumSelect
              id="assignment-outcome"
              table={ASSIGNMENT_OUTCOME}
              value={form.assignmentOutcome}
              placeholder="Choose one"
              onChange={(value) =>
                set("assignmentOutcome", value ?? NEW_ASSIGNMENT.assignmentOutcome)
              }
            />
          </Field>

          <Field label="Difficulty" htmlFor="assignment-difficulty" error={fieldErrors.difficultyLevel}>
            <EnumSelect
              id="assignment-difficulty"
              table={DIFFICULTY}
              value={form.difficultyLevel}
              placeholder="Choose one"
              onChange={(value) => set("difficultyLevel", value ?? NEW_ASSIGNMENT.difficultyLevel)}
            />
          </Field>
        </div>

        <Field
          label="Notes"
          htmlFor="assignment-remarks"
          error={fieldErrors.remarks}
          hint="What it asked for, how it went, anything to remember next time."
        >
          <Textarea
            id="assignment-remarks"
            rows={4}
            maxLength={2000}
            value={form.remarks}
            placeholder="Build a rate limiter with a sliding window. Took about five hours."
            onChange={(event) => set("remarks", event.target.value)}
          />
        </Field>

        {error && <ErrorNote>{error}</ErrorNote>}
      </form>
    </Modal>
  );
}
