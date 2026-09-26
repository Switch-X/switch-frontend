import { blankToNull } from "@/lib/format";
import type {
  CreateInterviewPayload,
  InterviewView,
  UpdateInterviewPayload,
} from "@/lib/types";
import { NEW_INTERVIEW_VIA } from "@/components/interviews/constants/interviewForm";
import type { InterviewFormState } from "@/components/interviews/types/interviewForm";

export function initialInterviewForm(record: InterviewView | null): InterviewFormState {
  return {
    applicationId: record?.applicationId ?? null,
    interviewDate: record?.interviewDate ?? "",
    interviewProceedingVia: record?.interviewProceedingVia ?? NEW_INTERVIEW_VIA,
  };
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
    interviewDate: blankToNull(form.interviewDate),
    interviewProceedingVia: form.interviewProceedingVia,
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
    interviewDate: blankToNull(form.interviewDate),
    interviewProceedingVia: form.interviewProceedingVia,
  };
}
