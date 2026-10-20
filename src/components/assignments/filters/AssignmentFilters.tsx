"use client";

import { ASSIGNMENT_OUTCOME, DIFFICULTY, SUBMISSION } from "@/lib/enums";
import { Button } from "@/components/ui/button/Button";
import { EnumSelect } from "@/components/ui/form/EnumSelect";
import { CheckboxFilter } from "@/components/shared/filters/CheckboxFilter";
import { FilterBar } from "@/components/shared/filters/FilterBar";
import { FilterField } from "@/components/shared/filters/FilterField";
import { ResultCount } from "@/components/shared/filters/ResultCount";
import { useAssignments } from "@/components/assignments/context/AssignmentsProvider";

export function AssignmentFilters() {
  const { filters, setFilter, clearFilters, filtered, assignments } = useAssignments();

  return (
    <FilterBar>
      <FilterField label="Submission">
        <EnumSelect
          table={SUBMISSION}
          value={filters.submission}
          placeholder="Any state"
          onChange={(value) => setFilter("submission", value)}
        />
      </FilterField>

      <FilterField label="Outcome" className="min-w-[160px]">
        <EnumSelect
          table={ASSIGNMENT_OUTCOME}
          value={filters.assignmentOutcome}
          placeholder="Any outcome"
          onChange={(value) => setFilter("assignmentOutcome", value)}
        />
      </FilterField>

      <FilterField label="Difficulty" className="min-w-[140px]">
        <EnumSelect
          table={DIFFICULTY}
          value={filters.difficultyLevel}
          placeholder="Any level"
          onChange={(value) => setFilter("difficultyLevel", value)}
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

      <ResultCount
        loading={assignments.loading}
        count={assignments.data?.totalElements ?? 0}
        noun="assignment"
      />
    </FilterBar>
  );
}
