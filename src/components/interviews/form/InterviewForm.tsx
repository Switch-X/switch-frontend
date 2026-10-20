"use client";

/**
 * Create or edit the interview itself - the thread, not the rounds inside it.
 *
 * <p>Rounds are deliberately absent from the edit path, which mirrors the backend: its
 * `UpdateInterviewRequest` carries no rounds at all, and `InterviewServiceImpl.update` leaves the
 * collection untouched. Rounds are added, changed and removed through their own endpoints, so
 * offering them here would build a form whose round edits are silently discarded on save.
 */

import { interviewsApi } from "@/components/interviews/interviews.api";
import { PROCEEDING_VIA } from "@/lib/enums";
import { useFormFields } from "@/lib/hooks/useFormFields";
import { changedFields } from "@/lib/patch";
import type { InterviewView } from "@/components/interviews/interviews.types";
import { Button } from "@/components/ui/button/Button";
import { ErrorNote } from "@/components/ui/feedback/ErrorNote";
import { Modal } from "@/components/ui/overlay/Modal";
import { EnumSelect } from "@/components/ui/form/EnumSelect";
import { Field } from "@/components/ui/form/Field";
import { Input } from "@/components/ui/form/Input";
import { ApplicationSelect } from "@/components/shared/application-select/ApplicationSelect";
import { StandaloneCompanyField } from "@/components/shared/application-select/StandaloneCompanyField";
import { useSaveForm } from "@/components/shared/hooks/useSaveForm";
import {
  EXPECTED_ROUNDS_RANGE,
  NEW_INTERVIEW_VIA,
} from "@/components/interviews/form/interviewForm.constants";
import {
  initialInterviewForm,
  toCreateInterviewPayload,
  toUpdateInterviewPayload,
} from "@/components/interviews/form/interviewForm.utils";

export function InterviewForm({
  open,
  editing,
  onClose,
  onSaved,
}: {
  open: boolean;
  editing: InterviewView | null;
  onClose: () => void;
  onSaved: (message: string) => void;
}) {
  const [form, set] = useFormFields(() => initialInterviewForm(editing));

  const { busy, error, fieldErrors, submit } = useSaveForm({
    // Create and update take different payloads: rounds are added separately, so only the
    // update carries them.
    save: () => {
      if (!editing) return interviewsApi.create(toCreateInterviewPayload(form));
      return interviewsApi.update(
        editing.id,
        changedFields(
          toUpdateInterviewPayload(initialInterviewForm(editing)),
          toUpdateInterviewPayload(form),
        ),
      );
    },
    saved: editing ? "Interview updated" : "Interview added",
    offline: "Could not reach SWITCH. Your interview was not saved.",
    onSaved,
    onClose,
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editing ? "Edit interview" : "New interview"}
      description={
        editing
          ? "Rounds are edited on the card itself."
          : "Create the thread first, then add rounds to it as they are scheduled."
      }
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button type="submit" form="interview-form" loading={busy}>
            {editing ? "Save changes" : "Add interview"}
          </Button>
        </>
      }
    >
      <form id="interview-form" className="space-y-4" onSubmit={submit}>
        <Field
          label="Application"
          htmlFor="interview-application"
          error={fieldErrors.applicationId}
          hint="Leave unlinked for a process that never had a formal application."
        >
          <ApplicationSelect
            id="interview-application"
            value={form.applicationId}
            onChange={(applicationId) => set("applicationId", applicationId)}
          />
        </Field>

        <StandaloneCompanyField
          applicationId={form.applicationId}
          id="interview-company"
          value={form.companyName}
          error={fieldErrors.companyName}
          hint="Who the interview is with. Needed because there is no application to take it from."
          onChange={(value) => set("companyName", value)}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Interview date"
            htmlFor="interview-date"
            error={fieldErrors.interviewDate}
            hint="Decides whether this shows under upcoming or past."
          >
            <Input
              id="interview-date"
              type="date"
              value={form.interviewDate}
              onChange={(event) => set("interviewDate", event.target.value)}
            />
          </Field>

          <Field
            label="Rounds expected"
            htmlFor="interview-expected-rounds"
            error={fieldErrors.expectedTotalRounds}
            hint="How many rounds the company said there will be."
          >
            <Input
              id="interview-expected-rounds"
              type="number"
              min={EXPECTED_ROUNDS_RANGE.min}
              max={EXPECTED_ROUNDS_RANGE.max}
              value={form.expectedTotalRounds}
              onChange={(event) => set("expectedTotalRounds", event.target.value)}
            />
          </Field>
        </div>

        <Field
          label="How it came about"
          htmlFor="interview-via"
          required
          error={fieldErrors.interviewProceedingVia}
        >
          <EnumSelect
            id="interview-via"
            table={PROCEEDING_VIA}
            value={form.interviewProceedingVia}
            placeholder="Choose one"
            onChange={(value) => set("interviewProceedingVia", value ?? NEW_INTERVIEW_VIA)}
          />
        </Field>

        {error && <ErrorNote>{error}</ErrorNote>}
      </form>
    </Modal>
  );
}
