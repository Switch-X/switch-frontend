/**
 * Interviews, and the rounds inside them.
 *
 * <p>Rounds have endpoints of their own rather than riding along on the interview: the update
 * payload deliberately leaves them out, so a round is added, changed and removed on its own.
 */

import { request } from "@/lib/api";
import type { NewId, PagedResult } from "@/lib/types";
import type {
  CreateInterviewPayload,
  InterviewListQuery,
  InterviewRoundPayload,
  InterviewView,
  UpdateInterviewPayload,
} from "./interviews.types";

export const interviewsApi = {
  list: (query: InterviewListQuery = {}) =>
    request<PagedResult<InterviewView>>("GET", "/v1/interviews", { query }),
  byId: (id: number) => request<InterviewView>("GET", `/v1/interviews/${id}`),
  create: (body: CreateInterviewPayload) => request<NewId>("POST", "/v1/interviews", { body }),
  /**
   * A PATCH: send only the fields that changed. A field left out keeps its stored value, and one
   * sent as `null` is cleared - so `Partial`, not the whole payload `create` takes.
   */
  update: (id: number, body: Partial<UpdateInterviewPayload>) =>
    request<void>("PATCH", `/v1/interviews/${id}`, { body }),
  remove: (id: number) => request<void>("DELETE", `/v1/interviews/${id}`),

  addRound: (interviewId: number, body: InterviewRoundPayload) =>
    request<NewId>("POST", `/v1/interviews/${interviewId}/rounds`, { body }),
  /**
   * A PATCH: send only the fields that changed. A field left out keeps its stored value, and one
   * sent as `null` is cleared - so `Partial`, not the whole payload `create` takes.
   */
  updateRound: (interviewId: number, roundId: number, body: Partial<InterviewRoundPayload>) =>
    request<void>("PATCH", `/v1/interviews/${interviewId}/rounds/${roundId}`, { body }),
  removeRound: (interviewId: number, roundId: number) =>
    request<void>("DELETE", `/v1/interviews/${interviewId}/rounds/${roundId}`),
};
