import { FOOTER_COLUMNS } from "@/components/landing/constants/footer";

export function FooterLinkColumns() {
  return (
    <>
      {FOOTER_COLUMNS.map((column) => (
        <nav key={column.heading} aria-label={column.heading}>
          <h2 className="text-xs font-semibold tracking-wider text-ink-subtle uppercase">
            {column.heading}
          </h2>
          <ul className="mt-4 space-y-2.5">
            {column.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group inline-flex items-center gap-1.5 text-sm text-ink-muted transition hover:text-ink"
                >
                  <span className="h-px w-0 bg-brand transition-all duration-200 group-hover:w-3" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </>
  );
}
