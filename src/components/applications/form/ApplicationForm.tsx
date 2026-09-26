"use client";

/**
 * Create or edit an application.
 *
 * <p>One component for both, because the two differ by exactly one rule - the update record
 * requires a status and the create record does not - and the form settles that by always sending
 * one (see `NEW_APPLICATION_STATUS`). Building the body from the fields is `toApplicationPayload`.
 */

import { useState, type FormEvent } from "react";
import { ApiError, api } from "@/lib/api";
import { APPLICATION_STATUS, REFERRAL, SOURCE } from "@/lib/enums";
import { useFormFields } from "@/lib/hooks";
import type { ApplicationView } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { ErrorNote } from "@/components/ui/ErrorNote";
import { Modal } from "@/components/ui/Modal";
import { EnumSelect } from "@/components/ui/form/EnumSelect";
import { Field } from "@/components/ui/form/Field";
import { Input } from "@/components/ui/form/Input";
import { NEW_APPLICATION_STATUS } from "@/components/applications/constants/applicationForm";
import {
  initialApplicationForm,
  toApplicationPayload,
} from "@/components/applications/utils/applicationForm";

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
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setFieldErrors({});
    setBusy(true);

    const payload = toApplicationPayload(form);

    try {
      if (editing) {
        await api.applications.update(editing.id, payload);
        onSaved("Application updated");
      } else {
        await api.applications.create(payload);
        onSaved("Application added");
      }
      onClose();
    } catch (failure) {
      if (failure instanceof ApiError) {
        setFieldErrors(failure.fieldErrors);
        setError(failure.message);
      } else {
        setError("Could not reach SWITCH. Your application was not saved.");
      }
      setBusy(false);
    }
  }

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

          <Field label="Source" htmlFor="app-source" error={fieldErrors.source}>
            <EnumSelect
              id="app-source"
              table={SOURCE}
              value={form.source}
              placeholder="Not set"
              onChange={(value) => set("source", value)}
            />
          </Field>

          <Field label="Referral" htmlFor="app-referral" error={fieldErrors.referral}>
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
