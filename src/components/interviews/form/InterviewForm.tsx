"use client";

/**
 * Create or edit the interview itself - the thread, not the rounds inside it.
 *
 * <p>Rounds are deliberately absent from the edit path, which mirrors the backend: its
 * `UpdateInterviewRequest` carries no rounds at all, and `InterviewServiceImpl.update` leaves the
 * collection untouched. Rounds are added, changed and removed through their own endpoints, so
 * offering them here would build a form whose round edits are silently discarded on save.
 */

import { useState, type FormEvent } from "react";
import { ApiError, api } from "@/lib/api";
import { PROCEEDING_VIA } from "@/lib/enums";
import { useFormFields } from "@/lib/hooks";
import type { InterviewView } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { ErrorNote } from "@/components/ui/ErrorNote";
import { Modal } from "@/components/ui/Modal";
import { EnumSelect } from "@/components/ui/form/EnumSelect";
import { Field } from "@/components/ui/form/Field";
import { Input } from "@/components/ui/form/Input";
import { ApplicationSelect } from "@/components/shared/application-select/ApplicationSelect";
import { NEW_INTERVIEW_VIA } from "@/components/interviews/constants/interviewForm";
import {
  initialInterviewForm,
  toCreateInterviewPayload,
  toUpdateInterviewPayload,
} from "@/components/interviews/utils/interviewForm";

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
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setFieldErrors({});
    setBusy(true);

    try {
      if (editing) {
        await api.interviews.update(editing.id, toUpdateInterviewPayload(form));
        onSaved("Interview updated");
      } else {
        await api.interviews.create(toCreateInterviewPayload(form));
        onSaved("Interview added");
      }
      onClose();
    } catch (failure) {
      if (failure instanceof ApiError) {
        setFieldErrors(failure.fieldErrors);
        setError(failure.message);
      } else {
        setError("Could not reach SWITCH. Your interview was not saved.");
      }
      setBusy(false);
    }
  }

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
        </div>

        {error && <ErrorNote>{error}</ErrorNote>}
      </form>
    </Modal>
  );
}
