/**
 * The five things SWITCH tracks, as one pipeline - the same spine as "How it works", compressed
 * to a line, so somebody who skipped the middle of the page still leaves knowing its shape.
 */
export const FOOTER_STAGES = ["Application", "Screening call", "Assignment", "Interview", "Offer"];

export const FOOTER_COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "The page",
    links: [
      { label: "How it works", href: "#how" },
      { label: "Timezones", href: "#zones" },
      { label: "Features", href: "#features" },
      { label: "Questions", href: "#faq" },
    ],
  },
  {
    heading: "What it tracks",
    links: [
      { label: "Applications", href: "#how" },
      { label: "Screening calls", href: "#how" },
      { label: "Assignments", href: "#how" },
      { label: "Interview rounds", href: "#how" },
    ],
  },
];

/** Fixed rather than read from the clock, so the prerendered page never disagrees with itself. */
export const COPYRIGHT_YEAR = 2026;
