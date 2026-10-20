"use client";

/**
 * Add or edit one round inside an interview.
 *
 * <p>Questions asked and rejection reasons are lists on the backend. They are edited here as a
 * textarea, one entry per line, rather than as a row of inputs with an "add another" button -
 * pasting six questions out of a notes app should be one paste, not six clicks.
 *
 * <p>The round endpoints answer with no interview, so the caller reloads the list on `onSaved`.
 */

import { useEffect, useRef } from "react";
import { interviewsApi } from "@/components/interviews/interviews.api";
import { DIFFICULTY, INTERVIEW_OUTCOME, INTERVIEW_TYPE } from "@/lib/enums";
import { useFormFields } from "@/lib/hooks/useFormFields";
import { changedFields } from "@/lib/patch";
import { prefersReducedMotion } from "@/lib/motion";
import type { InterviewRoundView, InterviewView } from "@/components/interviews/interviews.types";
import { Button } from "@/components/ui/button/Button";
import { ErrorNote } from "@/components/ui/feedback/ErrorNote";
import { Modal } from "@/components/ui/overlay/Modal";
import { useSaveForm } from "@/components/shared/hooks/useSaveForm";
import { EnumSelect } from "@/components/ui/form/EnumSelect";
import { Field } from "@/components/ui/form/Field";
import { Input } from "@/components/ui/form/Input";
import { Textarea } from "@/components/ui/form/Textarea";
import { NEW_ROUND } from "@/components/interviews/form/interviewForm.constants";
import { initialRoundForm, toRoundPayload } from "@/components/interviews/round-form/roundForm.utils";

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
  onSaved: (message: string) => void;
}) {
  const [form, set] = useFormFields(() => initialRoundForm(editing));

  // Picking "Rejected" reveals a field that is usually below the fold, so the form was quietly
  // asking a question nobody saw. Bringing it to the reader is the fix - telling them to scroll
  // would be the form explaining its own layout problem.
  const reasonsRef = useRef<HTMLDivElement>(null);
  const previousOutcome = useRef(form.interviewOutcome);

  useEffect(() => {
    const wasRejected = previousOutcome.current === "REJECTED";
    previousOutcome.current = form.interviewOutcome;

    // Only on the change into it. Opening a round that is already rejected should leave the
    // reader where they are rather than throwing them down the form.
    if (wasRejected || form.interviewOutcome !== "REJECTED") return;

    const field = reasonsRef.current;
    if (!field) return;

    field.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "center",
    });
    // `preventScroll`, or the browser jumps to the field and cancels the glide it is mid-way
    // through - the reader sees the end of the journey without the journey.
    field.querySelector("textarea")?.focus({ preventScroll: true });
  }, [form.interviewOutcome]);

  const { busy, error, fieldErrors, submit } = useSaveForm({
    save: () => {
      const payload = toRoundPayload(form);
      if (!editing) return interviewsApi.addRound(interview.id, payload);
      return interviewsApi.updateRound(
        interview.id,
        editing.roundId,
        changedFields(toRoundPayload(initialRoundForm(editing)), payload),
      );
    },
    saved: editing ? "Round updated" : "Round added",
    offline: "Could not reach SWITCH. This round was not saved.",
    onSaved,
    onClose,
  });

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
          <div ref={reasonsRef} className="animate-attention rounded-lg">
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
          </div>
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
