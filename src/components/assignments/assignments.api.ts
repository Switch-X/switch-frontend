/** Take-home assignments. */

import { request } from "@/lib/api";
import type { NewId, PagedResult } from "@/lib/types";
import type {
  AssignmentListQuery,
  AssignmentPayload,
  AssignmentView,
} from "./assignments.types";

export const assignmentsApi = {
  list: (query: AssignmentListQuery = {}) =>
    request<PagedResult<AssignmentView>>("GET", "/v1/assignments", { query }),
  byId: (id: number) => request<AssignmentView>("GET", `/v1/assignments/${id}`),
  create: (body: AssignmentPayload) => request<NewId>("POST", "/v1/assignments", { body }),
  /**
   * A PATCH: send only the fields that changed. A field left out keeps its stored value, and one
   * sent as `null` is cleared - so `Partial`, not the whole payload `create` takes.
   */
  update: (id: number, body: Partial<AssignmentPayload>) =>
    request<void>("PATCH", `/v1/assignments/${id}`, { body }),
  remove: (id: number) => request<void>("DELETE", `/v1/assignments/${id}`),
};
