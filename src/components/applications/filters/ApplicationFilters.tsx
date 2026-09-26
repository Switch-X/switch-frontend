"use client";

import { APPLICATION_SORT, APPLICATION_STATUS, REFERRAL, SOURCE } from "@/lib/enums";
import { Button } from "@/components/ui/Button";
import { EnumSelect } from "@/components/ui/form/EnumSelect";
import { FilterBar } from "@/components/shared/filters/FilterBar";
import { FilterField } from "@/components/shared/filters/FilterField";
import { ResultCount } from "@/components/shared/filters/ResultCount";
import { DEFAULT_SORT } from "@/components/applications/constants/applicationList";
import { useApplications } from "@/components/applications/context/ApplicationsProvider";

export function ApplicationFilters() {
  const { filters, setFilter, clearFilters, filtered, sort, setSort, applications } =
    useApplications();

  return (
    <FilterBar>
      <FilterField label="Status">
        <EnumSelect
          table={APPLICATION_STATUS}
          value={filters.applicationStatus}
          placeholder="Any status"
          onChange={(value) => setFilter("applicationStatus", value)}
        />
      </FilterField>

      <FilterField label="Source">
        <EnumSelect
          table={SOURCE}
          value={filters.source}
          placeholder="Any source"
          onChange={(value) => setFilter("source", value)}
        />
      </FilterField>

      <FilterField label="Referral">
        <EnumSelect
          table={REFERRAL}
          value={filters.referral}
          placeholder="Any referral"
          onChange={(value) => setFilter("referral", value)}
        />
      </FilterField>

      <FilterField label="Sort by">
        <EnumSelect
          table={APPLICATION_SORT}
          value={sort}
          placeholder="Nearest deadline"
          onChange={(value) => setSort(value ?? DEFAULT_SORT)}
        />
      </FilterField>

      {filtered && (
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear filters
        </Button>
      )}

      <ResultCount
        loading={applications.loading}
        count={applications.data?.totalElements ?? 0}
        noun="application"
      />
    </FilterBar>
  );
}
