/**
 * What to call a record that links to an application.
 *
 * <p>Interviews, assignments and screening calls carry only an `applicationId` in the database,
 * and "Interview #14" tells the reader nothing. Their views now bring the company and role with
 * them - the backend joins it once per page - so naming one needs no second call and no lookup
 * map, which is all this file used to be.
 */
export function applicationLabel(
  record: { companyName: string | null; jobProfile: string | null },
  unlinked: string,
): string {
  if (!record.companyName) return unlinked;
  return record.jobProfile ? `${record.companyName} — ${record.jobProfile}` : record.companyName;
}
