import { Icon } from "@/components/ui/icons";

/**
 * One question, built on `<details>` rather than a div with an onClick.
 *
 * <p>It is open/closed state the browser already models: keyboard operable, announced correctly,
 * findable by in-page search even while collapsed, and it works with no JavaScript at all - which
 * is why the whole FAQ renders on the server. The only custom part is rotating the chevron.
 */
export function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-medium transition hover:bg-surface-muted sm:px-6 [&::-webkit-details-marker]:hidden">
        <span>{question}</span>
        <Icon.ChevronDown className="size-4 shrink-0 text-ink-subtle transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="px-5 pb-5 text-sm leading-relaxed text-ink-muted sm:px-6">{answer}</div>
    </details>
  );
}
