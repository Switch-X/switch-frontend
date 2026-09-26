import { cx } from "@/lib/cx";
import { Icon } from "@/components/ui/icons";
import { FOOTER_STAGES } from "@/components/landing/constants/footer";

/** One application, all the way through - "How it works" compressed to a line. */
export function FooterPipeline() {
  return (
    <div className="border-t border-border py-7">
      <p className="text-xs font-semibold tracking-wider text-ink-subtle uppercase">
        One application, all the way through
      </p>
      <ol className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-2.5">
        {FOOTER_STAGES.map((stage, index) => (
          <li key={stage} className="flex items-center gap-1.5">
            <span
              className={cx(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                index === FOOTER_STAGES.length - 1
                  ? "border-good/30 bg-good-soft text-good"
                  : "border-border bg-surface-muted text-ink-muted hover:border-brand hover:text-brand",
              )}
            >
              {stage}
            </span>
            {index < FOOTER_STAGES.length - 1 && (
              <Icon.ChevronRight aria-hidden="true" className="size-3.5 shrink-0 text-ink-subtle" />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
