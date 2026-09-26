"use client";

import { ErrorNote } from "@/components/ui/ErrorNote";
import { SkeletonList } from "@/components/ui/Skeleton";
import { Icon } from "@/components/ui/icons";
import { DataTable } from "@/components/shared/list/DataTable";
import { FilterableEmptyState } from "@/components/shared/list/FilterableEmptyState";
import { APPLICATION_COLUMNS } from "@/components/applications/constants/applicationList";
import { useApplications } from "@/components/applications/context/ApplicationsProvider";
import { ApplicationRow } from "./ApplicationRow";

export function ApplicationsTable() {
  const { applications, filtered, clearFilters, editor, deletion } = useApplications();
  const rows = applications.data?.content ?? [];

  if (applications.error) {
    return (
      <div className="p-5">
        <ErrorNote>{applications.error}</ErrorNote>
      </div>
    );
  }

  if (applications.loading && rows.length === 0) {
    return <SkeletonList count={5} itemClassName="h-14 w-full" />;
  }

  if (rows.length === 0) {
    return (
      <FilterableEmptyState
        filtered={filtered}
        icon={<Icon.Applications />}
        title="No applications yet"
        description="Add the first one and it will show up here, sorted by whichever deadline is closest."
        createLabel="New application"
        onCreate={editor.create}
        onClearFilters={clearFilters}
        onSampleDataLoaded={applications.reload}
      />
    );
  }

  return (
    <DataTable columns={APPLICATION_COLUMNS} className="min-w-[820px]">
      {rows.map((application) => (
        <ApplicationRow
          key={application.id}
          application={application}
          onEdit={editor.edit}
          onDelete={deletion.request}
        />
      ))}
    </DataTable>
  );
}
