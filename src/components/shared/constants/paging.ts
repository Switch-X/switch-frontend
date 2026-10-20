/**
 * Rows per page, on every list screen.
 *
 * <p>One constant rather than one per feature. Four screens that each pick their own number look
 * like four screens that page differently, and the first thing anyone does after seeing that is
 * check whether it is a bug.
 *
 * <p>The backend has the same number as its own default, in `Paging.DEFAULT_PAGE_SIZE`, but it is
 * sent explicitly on every call: a default is what a caller gets when it has no opinion, and a
 * list screen built around a page size has one.
 */
export const PAGE_SIZE = 10;
