/** One of the live clocks. */
export type ClockPlace = {
  zone: string;
  city: string;
  /** Quiet window as a time of day in that city, exactly as the app stores it. */
  quiet: { start: string; end: string };
};
