"use client";

/**
 * Add or edit one round inside an interview.
 *
 * <p>Questions asked and rejection reasons are lists on the backend. They are edited here as a
 * textarea, one entry per line, rather than as a row of inputs with an "add another" button -
 * pasting six questions out of a notes app should be one paste, not six clicks.
 *
 * <p>Both round endpoints answer with the whole updated interview, so `onSaved` hands the caller
 * that object and the card it came from can be replaced without refetching the list.
 */

import { useState, type FormEvent } from "react";
import { ApiError, api } from "@/lib/api";
import { DIFFICULTY, INTERVIEW_OUTCOME, INTERVIEW_TYPE } from "@/lib/enums";
import { useFormFields } from "@/lib/hooks";
import type { InterviewRoundView, InterviewView } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { ErrorNote } from "@/components/ui/ErrorNote";
import { Modal } from "@/components/ui/Modal";
import { EnumSelect } from "@/components/ui/form/EnumSelect";
import { Field } from "@/components/ui/form/Field";
import { Input } from "@/components/ui/form/Input";
import { Textarea } from "@/components/ui/form/Textarea";
import { NEW_ROUND } from "@/components/interviews/constants/interviewForm";
import { initialRoundForm, toRoundPayload } from "@/components/interviews/utils/roundForm";

export function RoundForm({
  open,
  interview,
  editing,
  onClose,
  onSaved,
}: {
  open: boolean;
  interview: InterviewView;
  editing: InterviewRoundView | null;
  onClose: () => void;
  onSaved: (updated: InterviewView, message: string) => void;
}) {
  const [form, set] = useFormFields(() => initialRoundForm(editing));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setFieldErrors({});
    setBusy(true);

    const payload = toRoundPayload(form);

    try {
      const updated = editing
        ? await api.interviews.updateRound(interview.id, editing.roundId, payload)
        : await api.interviews.addRound(interview.id, payload);
      onSaved(updated, editing ? "Round updated" : "Round added");
      onClose();
    } catch (failure) {
      if (failure instanceof ApiError) {
        setFieldErrors(failure.fieldErrors);
        setError(failure.message);
      } else {
        setError("Could not reach SWITCH. This round was not saved.");
      }
      setBusy(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      title={editing ? "Edit round" : `Add round ${interview.rounds.length + 1}`}
      description="Everything asked, and how it went."
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button type="submit" form="round-form" loading={busy}>
            {editing ? "Save round" : "Add round"}
          </Button>
        </>
      }
    >
      <form id="round-form" className="space-y-4" onSubmit={submit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Interviewer" htmlFor="round-name" error={fieldErrors.interviewerName}>
            <Input
              id="round-name"
              maxLength={200}
              value={form.interviewerName}
              placeholder="Rohan Mehta"
              onChange={(event) => set("interviewerName", event.target.value)}
            />
          </Field>

          <Field
            label="Their email"
            htmlFor="round-email"
            error={fieldErrors.interviewerEmail}
            hint="Handy for the thank-you note."
          >
            <Input
              id="round-email"
              type="email"
              maxLength={320}
              value={form.interviewerEmail}
              placeholder="rohan@company.com"
              onChange={(event) => set("interviewerEmail", event.target.value)}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Scheduled for" htmlFor="round-date" error={fieldErrors.scheduledAt}>
            <Input
              id="round-date"
              type="date"
              value={form.scheduledAt}
              onChange={(event) => set("scheduledAt", event.target.value)}
            />
          </Field>

          <Field label="Length (minutes)" htmlFor="round-duration" error={fieldErrors.durationInMinutes}>
            <Input
              id="round-duration"
              type="number"
              min={0}
              value={form.durationInMinutes}
              onChange={(event) => set("durationInMinutes", event.target.value)}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Format" htmlFor="round-type" required error={fieldErrors.interviewType}>
            <EnumSelect
              id="round-type"
              table={INTERVIEW_TYPE}
              value={form.interviewType}
              placeholder="Choose one"
              onChange={(value) => set("interviewType", value ?? NEW_ROUND.interviewType)}
            />
          </Field>

          <Field label="Difficulty" htmlFor="round-difficulty" required error={fieldErrors.difficultyLevel}>
            <EnumSelect
              id="round-difficulty"
              table={DIFFICULTY}
              value={form.difficultyLevel}
              placeholder="Choose one"
              onChange={(value) => set("difficultyLevel", value ?? NEW_ROUND.difficultyLevel)}
            />
          </Field>

          <Field label="Outcome" htmlFor="round-outcome" required error={fieldErrors.interviewOutcome}>
            <EnumSelect
              id="round-outcome"
              table={INTERVIEW_OUTCOME}
              value={form.interviewOutcome}
              placeholder="Choose one"
              onChange={(value) => set("interviewOutcome", value ?? NEW_ROUND.interviewOutcome)}
            />
          </Field>
        </div>

        <Field
          label="Questions asked"
          htmlFor="round-questions"
          error={fieldErrors.questionsAsked}
          hint="One per line. These are the notes that pay off a few interviews later."
        >
          <Textarea
            id="round-questions"
            rows={4}
            value={form.questionsAsked}
            placeholder={"Design a URL shortener\nHow does a HashMap resize?\nWhy did you leave your last role?"}
            onChange={(event) => set("questionsAsked", event.target.value)}
          />
        </Field>

        <Field
          label="Feedback from the interviewer"
          htmlFor="round-feedback"
          error={fieldErrors.feedbackFromInterviewer}
        >
          <Textarea
            id="round-feedback"
            rows={3}
            maxLength={4000}
            value={form.feedbackFromInterviewer}
            placeholder="Strong on system design, wanted more depth on concurrency."
            onChange={(event) => set("feedbackFromInterviewer", event.target.value)}
          />
        </Field>

        {/* Only worth asking about once the answer is "rejected"; on every other round it is a
            box nobody fills in. Hiding it is safe because the text lives in this form's state,
            not the field's, so flipping the outcome away and back brings it back untouched. */}
        {form.interviewOutcome === "REJECTED" && (
          <Field
            label="Why it did not go through"
            htmlFor="round-reasons"
            error={fieldErrors.rejectionReasons}
            hint="One per line."
          >
            <Textarea
              id="round-reasons"
              rows={3}
              value={form.rejectionReasons}
              placeholder={"Wanted deeper Kubernetes experience\nLooking for someone more senior"}
              onChange={(event) => set("rejectionReasons", event.target.value)}
            />
          </Field>
        )}

        <Field label="Your own notes" htmlFor="round-remarks" error={fieldErrors.remarks}>
          <Textarea
            id="round-remarks"
            rows={3}
            maxLength={2000}
            value={form.remarks}
            placeholder="Interviewer was running late; call quality was poor."
            onChange={(event) => set("remarks", event.target.value)}
          />
        </Field>

        {error && <ErrorNote>{error}</ErrorNote>}
      </form>
    </Modal>
  );
}
