"use client";

import { PROCEEDING_VIA, SCREENING_OUTCOME } from "@/lib/enums";
import { Button } from "@/components/ui/button/Button";
import { EnumSelect } from "@/components/ui/form/EnumSelect";
import { CheckboxFilter } from "@/components/shared/filters/CheckboxFilter";
import { FilterBar } from "@/components/shared/filters/FilterBar";
import { FilterField } from "@/components/shared/filters/FilterField";
import { ResultCount } from "@/components/shared/filters/ResultCount";
import { useScreeningCalls } from "@/components/screening-calls/context/ScreeningCallsProvider";

export function ScreeningCallFilters() {
  const { filters, setFilter, clearFilters, filtered, calls } = useScreeningCalls();

  return (
    <FilterBar>
      <FilterField label="Where it stands" className="min-w-[170px]">
        <EnumSelect
          table={SCREENING_OUTCOME}
          value={filters.proceeding}
          placeholder="Any outcome"
          onChange={(value) => setFilter("proceeding", value)}
        />
      </FilterField>

      <FilterField label="How it came in" className="min-w-[170px]">
        <EnumSelect
          table={PROCEEDING_VIA}
          value={filters.callReceivedVia}
          placeholder="Any route"
          onChange={(value) => setFilter("callReceivedVia", value)}
        />
      </FilterField>

      <CheckboxFilter
        label="Not linked"
        checked={filters.standalone}
        onChange={(checked) => setFilter("standalone", checked)}
      />

      {filtered && (
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear filters
        </Button>
      )}

      <ResultCount loading={calls.loading} count={calls.data?.totalElements ?? 0} noun="call" />
    </FilterBar>
  );
}
