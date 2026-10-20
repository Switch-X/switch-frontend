import { cx } from "@/lib/cx";
import { HEADER_LINKS } from "@/components/landing/header/header.constants";

export function HeaderNav({ scrolled }: { scrolled: boolean }) {
  return (
    <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
      {HEADER_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={cx(
            "rounded-lg px-3 py-2 text-sm font-medium transition",
            scrolled
              ? "text-ink-muted hover:bg-surface-sunken hover:text-ink"
              : "text-white/65 hover:bg-white/10 hover:text-white",
          )}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
