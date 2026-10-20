"use client";

import { ErrorNote } from "@/components/ui/feedback/ErrorNote";
import { SkeletonList } from "@/components/ui/feedback/Skeleton";
import { Icon } from "@/components/ui/icons";
import { DataTable } from "@/components/shared/list/DataTable";
import { FilterableEmptyState } from "@/components/shared/list/FilterableEmptyState";
import { SCREENING_CALL_COLUMNS } from "@/components/screening-calls/screeningCallList.constants";
import { useScreeningCalls } from "@/components/screening-calls/context/ScreeningCallsProvider";
import { ScreeningCallRow } from "./ScreeningCallRow";

/**
 * The rows as the server ordered them: most recent call first, the undated ones last.
 *
 * <p>This used to sort in the browser, which was fine while the endpoint returned everything.
 * Now that it returns one page, sorting here would only reorder the ten rows on this page while
 * the query decided which ten they were.
 */
export function ScreeningCallsTable() {
  const { calls, filtered, clearFilters, editor, deletion } = useScreeningCalls();
  const rows = calls.data?.content ?? [];

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
      />
    );
  }

  return (
    <DataTable columns={SCREENING_CALL_COLUMNS} className="min-w-[820px]">
      {rows.map((call) => (
        <ScreeningCallRow
          key={call.id}
          call={call}
          linked={call.linkedApplication}
          onEdit={editor.edit}
          onDelete={deletion.request}
        />
      ))}
    </DataTable>
  );
}
