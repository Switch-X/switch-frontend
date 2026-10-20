"use client";

/** Create or edit a screening call. Building the body from the fields is `toScreeningCallPayload`. */

import { screeningCallsApi } from "@/components/screening-calls/screeningCalls.api";
import { PROCEEDING_VIA, SCREENING_OUTCOME } from "@/lib/enums";
import { useFormFields } from "@/lib/hooks/useFormFields";
import { changedFields } from "@/lib/patch";
import type { ScreeningCallView } from "@/components/screening-calls/screeningCalls.types";
import { Button } from "@/components/ui/button/Button";
import { ErrorNote } from "@/components/ui/feedback/ErrorNote";
import { Modal } from "@/components/ui/overlay/Modal";
import { EnumSelect } from "@/components/ui/form/EnumSelect";
import { Field } from "@/components/ui/form/Field";
import { Input } from "@/components/ui/form/Input";
import { ApplicationSelect } from "@/components/shared/application-select/ApplicationSelect";
import { StandaloneCompanyField } from "@/components/shared/application-select/StandaloneCompanyField";
import { useSaveForm } from "@/components/shared/hooks/useSaveForm";
import { savedMessage } from "@/components/shared/utils/interviewNudge";
import { NEW_SCREENING_CALL } from "@/components/screening-calls/form/screeningCallForm.constants";
import {
  initialScreeningCallForm,
  toScreeningCallPayload,
} from "@/components/screening-calls/form/screeningCallForm.utils";

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

  const { busy, error, fieldErrors, submit } = useSaveForm({
    save: () => {
      const payload = toScreeningCallPayload(form);
      if (!editing) return screeningCallsApi.create(payload);
      return screeningCallsApi.update(
        editing.id,
        changedFields(toScreeningCallPayload(initialScreeningCallForm(editing)), payload),
      );
    },
    saved: savedMessage(
      form.proceeding === "INTERVIEWING",
      editing?.proceeding === "INTERVIEWING",
      editing ? "Screening call updated" : "Screening call added",
    ),
    offline: "Could not reach SWITCH. Your screening call was not saved.",
    onSaved,
    onClose,
  });

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

        <StandaloneCompanyField
          applicationId={form.applicationId}
          id="screening-company"
          value={form.companyName}
          error={fieldErrors.companyName}
          hint="Who rang. Needed because there is no application to take it from."
          onChange={(value) => set("companyName", value)}
        />

        <Field label="Who called" htmlFor="screening-hr" error={fieldErrors.hrName}>
          <Input
            id="screening-hr"
            maxLength={200}
            value={form.hrName}
            placeholder="Priya Raman"
            onChange={(event) => set("hrName", event.target.value)}
          />
        </Field>

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
