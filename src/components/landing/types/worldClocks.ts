/** One of the live clocks. */
export type ClockPlace = {
  zone: string;
  person: string;
  city: string;
  /** Wall-clock quiet window in that person's own zone, exactly as the app stores it. */
  quiet: { start: string; end: string };
};
