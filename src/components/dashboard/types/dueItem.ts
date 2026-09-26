/** One row of "Needs you this week" - an application deadline or an assignment's, flattened. */
export type DueItem = {
  key: string;
  kind: "Apply before" | "Submit before";
  title: string;
  subtitle: string;
  /** `yyyy-MM-dd`, never null in practice: an item without a date is not due. */
  date: string | null;
  href: string;
};
