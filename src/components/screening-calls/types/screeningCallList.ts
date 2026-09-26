import type { ProceedingVia, ScreeningOutcome } from "@/lib/types";

/** The list's filters, keyed like `ScreeningCallListQuery` so they go to the API as they are. */
export type ScreeningCallFilterState = {
  proceeding: ScreeningOutcome | null;
  callReceivedVia: ProceedingVia | null;
  /** Only the calls with no application behind them. */
  standalone: boolean;
};
