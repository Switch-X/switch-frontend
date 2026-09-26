import { Section } from "@/components/landing/shared/Section";
import { SectionIntro } from "@/components/landing/shared/SectionIntro";
import { Journey } from "./Journey";

export function JourneySection() {
  return (
    <Section id="how" eyebrow="How it works" title="Follow one application the whole way through">
      <SectionIntro>Five stages, five kinds of record. Click through them, or let it run.</SectionIntro>
      <Journey />
    </Section>
  );
}
