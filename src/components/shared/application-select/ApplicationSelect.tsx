"use client";

/**
 * Picks the application an interview, assignment or screening call belongs to - or none.
 *
 * <p>"None" is a real choice, not an empty state. The backend lets all three exist unlinked,
 * which is what a recruiter cold-call is: a conversation that has not become an application yet.
 * So the placeholder reads "Not linked" rather than "Select one", and leaving it alone is valid.
 *
 * <p>It asks for `options` rather than the applications themselves: an id and a label are all a
 * dropdown can show, and the full record would mean the database reading eleven columns per row
 * so that two could be used. The label carries the company and role, so the right one is
 * findable by typing into the open dropdown.
 */

import { applicationsApi } from "@/components/applications/applications.api";
import { useResource } from "@/lib/hooks/useResource";
import { Select } from "@/components/ui/form/Select";

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
  const applications = useResource(() => applicationsApi.options(), []);

  const options = applications.data ?? [];

  // A linked application that is not in the list - deleted, say - would otherwise make the
  // select fall back to its first option and silently relink the record on the next save.
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
