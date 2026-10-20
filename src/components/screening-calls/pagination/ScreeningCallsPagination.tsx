"use client";

import { ListPagination } from "@/components/shared/list/ListPagination";
import { useScreeningCalls } from "@/components/screening-calls/context/ScreeningCallsProvider";

export function ScreeningCallsPagination() {
  const { calls, setPage } = useScreeningCalls();
  return <ListPagination data={calls.data} onPage={setPage} />;
}
