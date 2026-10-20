import { Logo } from "@/components/ui/brand/Logo";

/** The word changes colour as the page scrolls off the dark hero onto the light page. */
export function HeaderBrand({ scrolled }: { scrolled: boolean }) {
  return (
    <a href="#top" className="shrink-0">
      <Logo tone={scrolled ? "ink" : "white"} />
    </a>
  );
}
