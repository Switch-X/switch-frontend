import type { ScreeningCallFilterState } from "@/components/screening-calls/screeningCallList.types";

export const INITIAL_FILTERS: ScreeningCallFilterState = {
  proceeding: null,
  callReceivedVia: null,
  standalone: false,
};

export const SCREENING_CALL_COLUMNS = [
  "Company",
  "Who called",
  "Where it stands",
  "Route",
  "When",
  "Length",
] as const;
