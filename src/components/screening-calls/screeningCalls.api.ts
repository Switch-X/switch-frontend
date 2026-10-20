/** Recruiter screening calls. */

import { request } from "@/lib/api";
import type { NewId, PagedResult } from "@/lib/types";
import type {
  ScreeningCallListQuery,
  ScreeningCallPayload,
  ScreeningCallView,
} from "./screeningCalls.types";

export const screeningCallsApi = {
  list: (query: ScreeningCallListQuery = {}) =>
    request<PagedResult<ScreeningCallView>>("GET", "/v1/screening-calls", { query }),
  byId: (id: number) => request<ScreeningCallView>("GET", `/v1/screening-calls/${id}`),
  create: (body: ScreeningCallPayload) => request<NewId>("POST", "/v1/screening-calls", { body }),
  /**
   * A PATCH: send only the fields that changed. A field left out keeps its stored value, and one
   * sent as `null` is cleared - so `Partial`, not the whole payload `create` takes.
   */
  update: (id: number, body: Partial<ScreeningCallPayload>) =>
    request<void>("PATCH", `/v1/screening-calls/${id}`, { body }),
  remove: (id: number) => request<void>("DELETE", `/v1/screening-calls/${id}`),
};
