import { Section } from "@/components/landing/shared/Section";
import { FaqList } from "./FaqList";

export function FaqSection() {
  return (
    <Section id="faq" eyebrow="Questions" title="The things you are probably wondering">
      <FaqList />
    </Section>
  );
}
