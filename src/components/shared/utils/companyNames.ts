import type { ApplicationView } from "@/lib/types";

/**
 * `applicationId` to something a reader recognises.
 *
 * <p>Interviews, assignments and screening calls carry only the id, and "Application #1" tells the
 * reader nothing. `withRole` adds the role after a dash - worth it on the interview cards, where one
 * company can have more than one loop open, and noise in a table column.
 */
export function companyNameMap(
  applications: ApplicationView[],
  { withRole = false }: { withRole?: boolean } = {},
): Map<number, string> {
  return new Map(
    applications.map((application) => [
      application.id,
      withRole && application.jobProfile
        ? `${application.companyName} — ${application.jobProfile}`
        : application.companyName,
    ]),
  );
}

/**
 * The name to show for a record's linked application, or `unlinked` when it has none.
 *
 * <p>A link to an application outside the loaded page still gets a label rather than a blank.
 */
export function linkedCompanyName(
  companyOf: Map<number, string>,
  applicationId: number | null,
  unlinked: string,
): string {
  if (applicationId === null) return unlinked;
  return companyOf.get(applicationId) ?? `Application #${applicationId}`;
}
