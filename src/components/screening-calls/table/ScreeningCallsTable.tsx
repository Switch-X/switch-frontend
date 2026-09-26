"use client";

import { ErrorNote } from "@/components/ui/ErrorNote";
import { SkeletonList } from "@/components/ui/Skeleton";
import { Icon } from "@/components/ui/icons";
import { DataTable } from "@/components/shared/list/DataTable";
import { FilterableEmptyState } from "@/components/shared/list/FilterableEmptyState";
import { SCREENING_CALL_COLUMNS } from "@/components/screening-calls/constants/screeningCallList";
import { useScreeningCalls } from "@/components/screening-calls/context/ScreeningCallsProvider";
import { sortByMostRecentContact } from "@/components/screening-calls/utils/screeningCallList";
import { ScreeningCallRow } from "./ScreeningCallRow";

export function ScreeningCallsTable() {
  const { calls, companyOf, filtered, clearFilters, editor, deletion } = useScreeningCalls();
  const rows = sortByMostRecentContact(calls.data ?? []);

  if (calls.error) {
    return (
      <div className="p-5">
        <ErrorNote>{calls.error}</ErrorNote>
      </div>
    );
  }

  if (calls.loading && rows.length === 0) {
    return <SkeletonList count={4} itemClassName="h-14 w-full" />;
  }

  if (rows.length === 0) {
    return (
      <FilterableEmptyState
        filtered={filtered}
        icon={<Icon.Screening />}
        title="No screening calls yet"
        description="Log the call while you still remember the recruiter's name."
        createLabel="Log a call"
        onCreate={editor.create}
        onClearFilters={clearFilters}
        onSampleDataLoaded={calls.reload}
      />
    );
  }

  return (
    <DataTable columns={SCREENING_CALL_COLUMNS} className="min-w-[820px]">
      {rows.map((call) => (
        <ScreeningCallRow
          key={call.id}
          call={call}
          linked={call.applicationId !== null ? (companyOf.get(call.applicationId) ?? null) : null}
          onEdit={editor.edit}
          onDelete={deletion.request}
        />
      ))}
    </DataTable>
  );
}
