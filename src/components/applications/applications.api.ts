/**
 * Applications. The only list the backend pages, hence `PagedResult` rather than a bare array.
 */

import { request } from "@/lib/api";
import type { NewId, PagedResult } from "@/lib/types";
import type {
  ApplicationListQuery,
  TimelineEntry,
  ApplicationOption,
  ApplicationPayload,
  ApplicationView,
} from "./applications.types";

export const applicationsApi = {
  list: (query: ApplicationListQuery = {}) =>
    request<PagedResult<ApplicationView>>("GET", "/v1/applications", { query }),

  /**
   * Every application, as an id and a label, for the dropdowns that link to one.
   *
   * Not paged: a dropdown that only offers the first page silently cannot link to anything
   * older, which is worse than a long list.
   */
  options: () => request<ApplicationOption[]>("GET", "/v1/applications/options"),

  /**
   * What has happened to one application, oldest first.
   *
   * The backend writes this as things happen rather than working it out on read, so the order
   * is the order they occurred in - not an order guessed from dates that are sometimes empty.
   */
  timeline: (id: number) => request<TimelineEntry[]>("GET", `/v1/applications/${id}/timeline`),
  byId: (id: number) => request<ApplicationView>("GET", `/v1/applications/${id}`),
  create: (body: ApplicationPayload) => request<NewId>("POST", "/v1/applications", { body }),
  /**
   * A PATCH: send only the fields that changed. A field left out keeps its stored value, and one
   * sent as `null` is cleared - so `Partial`, not the whole payload `create` takes.
   */
  update: (id: number, body: Partial<ApplicationPayload>) =>
    request<void>("PATCH", `/v1/applications/${id}`, { body }),
  remove: (id: number) => request<void>("DELETE", `/v1/applications/${id}`),
};
