/**
 * How many applications a lookup fetches: one page, sized to cover a realistic search.
 *
 * <p>Interviews, assignments and screening calls carry only an `applicationId`, so the screens
 * that list them load this page to put a company name on each row, and the application picker
 * offers it as its options. A record linked past this page still shows - as "Application #id".
 */
export const APPLICATION_LOOKUP_SIZE = 100;
