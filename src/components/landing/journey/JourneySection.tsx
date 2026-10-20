import { Section } from "@/components/landing/shared/Section";
import { Journey } from "./Journey";

export function JourneySection() {
  return (
    <Section
      id="how"
      eyebrow="How it works"
      title="Follow one application the whole way through"
      intro="Five stages, five kinds of record. Click through them, or let it run."
    >
      <Journey />
    </Section>
  );
}
