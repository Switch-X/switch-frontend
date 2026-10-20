import { FAQ_ITEMS } from "@/components/landing/faq/faq.constants";
import { FaqItem } from "./FaqItem";

/**
 * The questions, all independently open or closed.
 *
 * <p>Not mutually exclusive on purpose - no shared `name` attribute. Comparing two answers is a
 * normal thing to want, and an accordion that slams the previous one shut prevents it.
 */
export function FaqList() {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-border rounded-card border border-border bg-surface">
      {FAQ_ITEMS.map((item) => (
        <FaqItem key={item.question} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}
