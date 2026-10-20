"use client";

/**
 * Create or edit an application.
 *
 * <p>One component for both, because the two differ by exactly one rule - the update record
 * requires a status and the create record does not - and the form settles that by always sending
 * one (see `NEW_APPLICATION_STATUS`). Building the body from the fields is `toApplicationPayload`.
 */

import { applicationsApi } from "@/components/applications/applications.api";
import { APPLICATION_STATUS, REFERRAL, SOURCE } from "@/lib/enums";
import { useFormFields } from "@/lib/hooks/useFormFields";
import { changedFields } from "@/lib/patch";
import type { ApplicationView } from "@/components/applications/applications.types";
import { savedMessage } from "@/components/shared/utils/interviewNudge";
import { Button } from "@/components/ui/button/Button";
import { ErrorNote } from "@/components/ui/feedback/ErrorNote";
import { Modal } from "@/components/ui/overlay/Modal";
import { useSaveForm } from "@/components/shared/hooks/useSaveForm";
import { EnumSelect } from "@/components/ui/form/EnumSelect";
import { Field } from "@/components/ui/form/Field";
import { Input } from "@/components/ui/form/Input";
import { NEW_APPLICATION_STATUS } from "@/components/applications/form/applicationForm.constants";
import {
  initialApplicationForm,
  toApplicationPayload,
} from "@/components/applications/form/applicationForm.utils";

export function ApplicationForm({
  open,
  editing,
  onClose,
  onSaved,
}: {
  open: boolean;
  editing: ApplicationView | null;
  onClose: () => void;
  onSaved: (message: string) => void;
}) {
  // Keyed on the record id by the caller, so opening the dialog for a different row remounts
  // this component and resets the fields rather than showing the previous row's values.
  const [form, set] = useFormFields(() => initialApplicationForm(editing));

  const { busy, error, fieldErrors, submit } = useSaveForm({
    save: () => {
      const payload = toApplicationPayload(form);
      if (!editing) return applicationsApi.create(payload);
      // Only what was edited. Sending the rest would write fields this form never touched back
      // to the values they had when it opened - see `changedFields`.
      return applicationsApi.update(
        editing.id,
        changedFields(toApplicationPayload(initialApplicationForm(editing)), payload),
      );
    },
    saved: savedMessage(
      form.applicationStatus === "INTERVIEWING",
      editing?.applicationStatus === "INTERVIEWING",
      editing ? "Application updated" : "Application added",
    ),
    offline: "Could not reach SWITCH. Your application was not saved.",
    onSaved,
    onClose,
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editing ? "Edit application" : "New application"}
      description={
        editing
          ? `${editing.companyName}${editing.jobProfile ? ` · ${editing.jobProfile}` : ""}`
          : "Only the company is required — fill in the rest as you learn it."
      }
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button type="submit" form="application-form" loading={busy}>
            {editing ? "Save changes" : "Add application"}
          </Button>
        </>
      }
    >
      <form id="application-form" className="space-y-4" onSubmit={submit}>
        <Field label="Company" htmlFor="app-company" required error={fieldErrors.companyName}>
          <Input
            id="app-company"
            required
            maxLength={150}
            value={form.companyName}
            placeholder="Stripe"
            onChange={(event) => set("companyName", event.target.value)}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Role" htmlFor="app-role" error={fieldErrors.jobProfile}>
            <Input
              id="app-role"
              maxLength={150}
              value={form.jobProfile}
              placeholder="Backend Engineer"
              onChange={(event) => set("jobProfile", event.target.value)}
            />
          </Field>

          <Field
            label="Job ID"
            htmlFor="app-jobid"
            error={fieldErrors.jobId}
            hint="The reference on the posting, if it has one."
          >
            <Input
              id="app-jobid"
              maxLength={100}
              value={form.jobId}
              placeholder="REQ-4821"
              onChange={(event) => set("jobId", event.target.value)}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Applied on" htmlFor="app-applied" error={fieldErrors.appliedOn}>
            <Input
              id="app-applied"
              type="date"
              value={form.appliedOn}
              onChange={(event) => set("appliedOn", event.target.value)}
            />
          </Field>

          <Field
            label="Apply before"
            htmlFor="app-deadline"
            error={fieldErrors.applyBefore}
            hint="Used to sort your list by whichever deadline is closest."
          >
            <Input
              id="app-deadline"
              type="date"
              value={form.applyBefore}
              onChange={(event) => set("applyBefore", event.target.value)}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Status" htmlFor="app-status" required error={fieldErrors.applicationStatus}>
            <EnumSelect
              id="app-status"
              table={APPLICATION_STATUS}
              value={form.applicationStatus}
              placeholder="Choose one"
              onChange={(value) => set("applicationStatus", value ?? NEW_APPLICATION_STATUS)}
            />
          </Field>

          <Field
            label="Source"
            htmlFor="app-source"
            error={fieldErrors.source}
            hint="Where you found the job."
          >
            <EnumSelect
              id="app-source"
              table={SOURCE}
              value={form.source}
              placeholder="Not set"
              onChange={(value) => set("source", value)}
            />
          </Field>

          <Field
            label="Referral"
            htmlFor="app-referral"
            error={fieldErrors.referral}
            hint="Did you ask someone there to refer you?"
          >
            <EnumSelect
              id="app-referral"
              table={REFERRAL}
              value={form.referral}
              placeholder="Not set"
              onChange={(value) => set("referral", value)}
            />
          </Field>
        </div>

        {error && <ErrorNote>{error}</ErrorNote>}
      </form>
    </Modal>
  );
}
