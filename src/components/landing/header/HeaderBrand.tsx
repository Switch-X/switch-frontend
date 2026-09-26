import { cx } from "@/lib/cx";
import { Icon } from "@/components/ui/icons";

export function HeaderBrand({ scrolled }: { scrolled: boolean }) {
  return (
    <a href="#top" className="flex shrink-0 items-center gap-2.5">
      <span className="flex size-9 items-center justify-center rounded-xl bg-brand text-white shadow-sm">
        <Icon.Sparkle className="size-5" />
      </span>
      <span
        className={cx(
          "font-display text-lg font-bold tracking-tight transition-colors",
          scrolled ? "text-ink" : "text-white",
        )}
      >
        SWITCH
      </span>
    </a>
  );
}
