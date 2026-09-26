import { Icon } from "@/components/ui/icons";
import { COPYRIGHT_YEAR } from "@/components/landing/constants/footer";
import { LocalClock } from "./LocalClock";

export function FooterBottomBar() {
  return (
    <div className="flex flex-col gap-4 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-subtle">
        <span>© {COPYRIGHT_YEAR} SWITCH</span>
        <span aria-hidden="true">·</span>
        <span>Built by one person, not a company</span>
        <span aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-warn" />
          No password yet — do not keep anything sensitive here
        </span>
      </div>

      <div className="flex items-center gap-4">
        <LocalClock />
        <a
          href="#top"
          className="group inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted transition hover:text-ink"
        >
          Back to top
          <span className="flex size-5 items-center justify-center rounded-full border border-border transition group-hover:border-brand group-hover:text-brand">
            <Icon.ChevronDown aria-hidden="true" className="size-3 rotate-180" />
          </span>
        </a>
      </div>
    </div>
  );
}
