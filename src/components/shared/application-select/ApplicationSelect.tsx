"use client";

/**
 * Picks the application an interview, assignment or screening call belongs to - or none.
 *
 * <p>"None" is a real choice, not an empty state. The backend lets all three exist unlinked,
 * which is what a recruiter cold-call is: a conversation that has not become an application yet.
 * So the placeholder reads "Not linked" rather than "Select one", and leaving it alone is valid.
 *
 * <p>It fetches one page of applications rather than all of them. A hundred-entry native select
 * is already past the point of being usable, and the label carries the company and role so the
 * right row is findable by typing in the open dropdown.
 */

import { api } from "@/lib/api";
import { useResource } from "@/lib/hooks";
import { Select } from "@/components/ui/form/Select";
import { APPLICATION_LOOKUP_SIZE } from "@/components/shared/constants/applications";

export function ApplicationSelect({
  value,
  onChange,
  id,
  error,
}: {
  value: number | null;
  onChange: (applicationId: number | null) => void;
  id?: string;
  error?: string;
}) {
  const applications = useResource(
    () => api.applications.list({ size: APPLICATION_LOOKUP_SIZE, sort: "RECENT_ACTIVITY" }),
    [],
  );

  const options = applications.data?.content ?? [];

  // An application that is linked but outside the fetched page would otherwise make the select
  // fall back to its first option and silently relink the record on the next save.
  const known = options.some((application) => application.id === value);

  return (
    <Select
      id={id}
      error={error}
      value={value ?? ""}
      disabled={applications.loading}
      onChange={(event) => onChange(event.target.value ? Number(event.target.value) : null)}
    >
      <option value="">{applications.loading ? "Loading applications…" : "Not linked"}</option>
      {value !== null && !known && !applications.loading && (
        <option value={value}>Application #{value}</option>
      )}
      {options.map((application) => (
        <option key={application.id} value={application.id}>
          {application.companyName}
          {application.jobProfile ? ` — ${application.jobProfile}` : ""}
        </option>
      ))}
    </Select>
  );
}
