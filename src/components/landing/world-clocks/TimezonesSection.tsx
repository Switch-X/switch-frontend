import { Section } from "@/components/landing/shared/Section";
import { WorldClocks } from "./WorldClocks";

export function TimezonesSection() {
  return (
    <Section
      id="zones"
      eyebrow="Timezones"
      title="22:00 means 22:00 where you are"
      intro="Your quiet hours are tied to the time of day in your own city, so they hold even when the clocks change. These clocks are live — the dark ones are places where it is night."
      tinted
    >
      <WorldClocks />
    </Section>
  );
}
