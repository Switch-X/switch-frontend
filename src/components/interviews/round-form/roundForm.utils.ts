import { blankToNull } from "@/lib/format";
import type { InterviewRoundPayload, InterviewRoundView } from "@/components/interviews/interviews.types";
import { NEW_ROUND } from "@/components/interviews/form/interviewForm.constants";
import type { RoundFormState } from "@/components/interviews/round-form/roundForm.types";

/** One entry per line, blank lines dropped. */
function toLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function initialRoundForm(record: InterviewRoundView | null): RoundFormState {
  return {
    interviewerName: record?.interviewerName ?? "",
    interviewerEmail: record?.interviewerEmail ?? "",
    scheduledAt: record?.scheduledAt ?? "",
    durationInMinutes: String(record?.durationInMinutes ?? NEW_ROUND.durationInMinutes),
    difficultyLevel: record?.difficultyLevel ?? NEW_ROUND.difficultyLevel,
    interviewType: record?.interviewType ?? NEW_ROUND.interviewType,
    interviewOutcome: record?.interviewOutcome ?? NEW_ROUND.interviewOutcome,
    questionsAsked: (record?.questionsAsked ?? []).join("\n"),
    rejectionReasons: (record?.rejectionReasons ?? []).join("\n"),
    feedbackFromInterviewer: record?.feedbackFromInterviewer ?? "",
    remarks: record?.remarks ?? "",
  };
}

/** The fields as the round endpoints' body - the same shape for adding and for editing. */
export function toRoundPayload(form: RoundFormState): InterviewRoundPayload {
  const minutes = Number.parseInt(form.durationInMinutes, 10);

  return {
    interviewerName: blankToNull(form.interviewerName),
    interviewerEmail: blankToNull(form.interviewerEmail),
    feedbackFromInterviewer: blankToNull(form.feedbackFromInterviewer),
    remarks: blankToNull(form.remarks),
    scheduledAt: blankToNull(form.scheduledAt),
    durationInMinutes: Number.isFinite(minutes) && minutes >= 0 ? minutes : 0,
    difficultyLevel: form.difficultyLevel,
    interviewType: form.interviewType,
    interviewOutcome: form.interviewOutcome,
    rejectionReasons: toLines(form.rejectionReasons),
    questionsAsked: toLines(form.questionsAsked),
  };
}
