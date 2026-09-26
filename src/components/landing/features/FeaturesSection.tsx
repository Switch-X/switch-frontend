import { Section } from "@/components/landing/shared/Section";
import { Bento } from "./Bento";

export function FeaturesSection() {
  return (
    <Section id="features" eyebrow="Features" title="Built for the messy parts">
      <div className="mb-10" />
      <Bento />
    </Section>
  );
}
