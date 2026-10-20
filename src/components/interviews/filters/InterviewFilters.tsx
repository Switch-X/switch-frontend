"use client";

import { INTERVIEW_OUTCOME, PROCEEDING_VIA } from "@/lib/enums";
import { Button } from "@/components/ui/button/Button";
import { Card } from "@/components/ui/layout/Card";
import { EnumSelect } from "@/components/ui/form/EnumSelect";
import { CheckboxFilter } from "@/components/shared/filters/CheckboxFilter";
import { FilterField } from "@/components/shared/filters/FilterField";
import { ResultCount } from "@/components/shared/filters/ResultCount";
import { useInterviews } from "@/components/interviews/context/InterviewsProvider";

/** A card of its own, since the interviews below are cards rather than rows of one table. */
export function InterviewFilters() {
  const { filters, setFilter, clearFilters, filtered, interviews } = useInterviews();

  return (
    <Card className="flex flex-wrap items-end gap-3 px-5 py-4">
      <FilterField label="How it came about" className="min-w-[170px]">
        <EnumSelect
          table={PROCEEDING_VIA}
          value={filters.interviewProceedingVia}
          placeholder="Any route"
          onChange={(value) => setFilter("interviewProceedingVia", value)}
        />
      </FilterField>

      <FilterField label="Has a round that is" className="min-w-[170px]">
        <EnumSelect
          table={INTERVIEW_OUTCOME}
          value={filters.roundOutcome}
          placeholder="Any outcome"
          onChange={(value) => setFilter("roundOutcome", value)}
        />
      </FilterField>

      <CheckboxFilter
        label="Not linked to an application"
        checked={filters.standalone}
        onChange={(checked) => setFilter("standalone", checked)}
      />

      {filtered && (
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear filters
        </Button>
      )}

      <ResultCount
        loading={interviews.loading}
        count={interviews.data?.totalElements ?? 0}
        noun="interview"
      />
    </Card>
  );
}
