import type { ApplicationSort } from "@/components/applications/applications.types";
import type { ApplicationFilterState } from "@/components/applications/applicationList.types";

/** Where the list starts: the deadline closest to lapsing, which is what people open it for. */
export const DEFAULT_SORT: ApplicationSort = "NEAREST_DEADLINE";

/** Nothing filtered. The sort is kept apart from these, so clearing filters leaves it alone. */
export const INITIAL_FILTERS: ApplicationFilterState = {
  applicationStatus: null,
  source: null,
  referral: null,
};

export const APPLICATION_COLUMNS = [
  "Company / role",
  "Status",
  "Source",
  "Referral",
  "Applied",
  "Deadline",
  "Last activity",
] as const;

/** A deadline this many days out, or closer, reads as urgent. */
export const DEADLINE_URGENT_DAYS = 3;

/** ...and this many as one to keep an eye on. */
export const DEADLINE_SOON_DAYS = 7;
