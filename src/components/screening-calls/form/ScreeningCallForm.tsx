"use client";

/** Create or edit a screening call. Building the body from the fields is `toScreeningCallPayload`. */

import { useState, type FormEvent } from "react";
import { ApiError, api } from "@/lib/api";
import { PROCEEDING_VIA, SCREENING_OUTCOME } from "@/lib/enums";
import { useFormFields } from "@/lib/hooks";
import type { ScreeningCallView } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { ErrorNote } from "@/components/ui/ErrorNote";
import { Modal } from "@/components/ui/Modal";
import { EnumSelect } from "@/components/ui/form/EnumSelect";
import { Field } from "@/components/ui/form/Field";
import { Input } from "@/components/ui/form/Input";
import { ApplicationSelect } from "@/components/shared/application-select/ApplicationSelect";
import { NEW_SCREENING_CALL } from "@/components/screening-calls/constants/screeningCallForm";
import {
  initialScreeningCallForm,
  toScreeningCallPayload,
} from "@/components/screening-calls/utils/screeningCallForm";

export function ScreeningCallForm({
  open,
  editing,
  onClose,
  onSaved,
}: {
  open: boolean;
  editing: ScreeningCallView | null;
  onClose: () => void;
  onSaved: (message: string) => void;
}) {
  const [form, set] = useFormFields(() => initialScreeningCallForm(editing));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setFieldErrors({});
    setBusy(true);

    const payload = toScreeningCallPayload(form);

    try {
      if (editing) {
        await api.screeningCalls.update(editing.id, payload);
        onSaved("Screening call updated");
      } else {
        await api.screeningCalls.create(payload);
        onSaved("Screening call added");
      }
      onClose();
    } catch (failure) {
      if (failure instanceof ApiError) {
        setFieldErrors(failure.fieldErrors);
        setError(failure.message);
      } else {
        setError("Could not reach SWITCH. Your screening call was not saved.");
      }
      setBusy(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editing ? "Edit screening call" : "Log a screening call"}
      description="The first conversation — usually a recruiter, usually short."
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button type="submit" form="screening-form" loading={busy}>
            {editing ? "Save changes" : "Log call"}
          </Button>
        </>
      }
    >
      <form id="screening-form" className="space-y-4" onSubmit={submit}>
        <Field
          label="Application"
          htmlFor="screening-application"
          error={fieldErrors.applicationId}
          hint="A cold recruiter call has no application behind it yet — leave it unlinked."
        >
          <ApplicationSelect
            id="screening-application"
            value={form.applicationId}
            onChange={(applicationId) => set("applicationId", applicationId)}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Company" htmlFor="screening-company" error={fieldErrors.companyName}>
            <Input
              id="screening-company"
              maxLength={200}
              value={form.companyName}
              placeholder="Datadog"
              onChange={(event) => set("companyName", event.target.value)}
            />
          </Field>

          <Field label="Who called" htmlFor="screening-hr" error={fieldErrors.hrName}>
            <Input
              id="screening-hr"
              maxLength={200}
              value={form.hrName}
              placeholder="Priya Raman"
              onChange={(event) => set("hrName", event.target.value)}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Contacted on" htmlFor="screening-date" error={fieldErrors.contactedOn}>
            <Input
              id="screening-date"
              type="date"
              value={form.contactedOn}
              onChange={(event) => set("contactedOn", event.target.value)}
            />
          </Field>

          <Field
            label="How long (minutes)"
            htmlFor="screening-duration"
            error={fieldErrors.discussionDuration}
          >
            <Input
              id="screening-duration"
              type="number"
              min={0}
              value={form.discussionDuration}
              onChange={(event) => set("discussionDuration", event.target.value)}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Where it stands" htmlFor="screening-proceeding" required error={fieldErrors.proceeding}>
            <EnumSelect
              id="screening-proceeding"
              table={SCREENING_OUTCOME}
              value={form.proceeding}
              placeholder="Choose one"
              onChange={(value) => set("proceeding", value ?? NEW_SCREENING_CALL.proceeding)}
            />
          </Field>

          <Field label="How it came in" htmlFor="screening-via" required error={fieldErrors.callReceivedVia}>
            <EnumSelect
              id="screening-via"
              table={PROCEEDING_VIA}
              value={form.callReceivedVia}
              placeholder="Choose one"
              onChange={(value) =>
                set("callReceivedVia", value ?? NEW_SCREENING_CALL.callReceivedVia)
              }
            />
          </Field>
        </div>

        {error && <ErrorNote>{error}</ErrorNote>}
      </form>
    </Modal>
  );
}
