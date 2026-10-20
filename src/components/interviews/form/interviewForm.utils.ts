import { blankToNull } from "@/lib/format";
import type { CreateInterviewPayload, InterviewView, UpdateInterviewPayload } from "@/components/interviews/interviews.types";
import {
  EXPECTED_ROUNDS_RANGE,
  NEW_INTERVIEW_EXPECTED_ROUNDS,
  NEW_INTERVIEW_VIA,
} from "@/components/interviews/form/interviewForm.constants";
import type { InterviewFormState } from "@/components/interviews/form/interviewForm.types";

export function initialInterviewForm(record: InterviewView | null): InterviewFormState {
  return {
    applicationId: record?.applicationId ?? null,
    // A linked thread shows the application's company, which is not this field's to edit, so
    // the box starts empty for one. Unlinked, it starts from what was stored.
    companyName: record?.applicationId === null ? (record?.companyName ?? "") : "",
    interviewDate: record?.interviewDate ?? "",
    interviewProceedingVia: record?.interviewProceedingVia ?? NEW_INTERVIEW_VIA,
    expectedTotalRounds: String(record?.expectedTotalRounds ?? NEW_INTERVIEW_EXPECTED_ROUNDS),
  };
}

/**
 * The typed number of rounds, or null when it is blank or out of range - which the backend reads
 * as "use the default" on create and "keep what is there" on update, rather than as an error.
 */
function expectedRounds(value: string): number | null {
  const rounds = Number.parseInt(value, 10);
  return Number.isFinite(rounds) &&
    rounds >= EXPECTED_ROUNDS_RANGE.min &&
    rounds <= EXPECTED_ROUNDS_RANGE.max
    ? rounds
    : null;
}

/**
 * A new interview, created with no rounds.
 *
 * <p>`CreateInterviewRequest` does take a list, but filling in five rounds before the first has
 * happened is not how anyone uses this - rounds are added one at a time, as they are scheduled.
 */
export function toCreateInterviewPayload(form: InterviewFormState): CreateInterviewPayload {
  return {
    applicationId: form.applicationId,
    companyName: blankToNull(form.companyName),
    interviewDate: blankToNull(form.interviewDate),
    interviewProceedingVia: form.interviewProceedingVia,
    expectedTotalRounds: expectedRounds(form.expectedTotalRounds),
    rounds: [],
  };
}

/**
 * The edit body, with no rounds in it - mirroring the backend, whose `UpdateInterviewRequest`
 * carries none and whose update leaves the collection untouched. Rounds have their own endpoints.
 */
export function toUpdateInterviewPayload(form: InterviewFormState): UpdateInterviewPayload {
  return {
    applicationId: form.applicationId,
    companyName: blankToNull(form.companyName),
    interviewDate: blankToNull(form.interviewDate),
    interviewProceedingVia: form.interviewProceedingVia,
    expectedTotalRounds: expectedRounds(form.expectedTotalRounds),
  };
}
