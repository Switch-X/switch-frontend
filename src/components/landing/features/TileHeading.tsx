import type { ReactNode } from "react";
import type { IconComponent } from "@/components/ui/icons";

/** A tile's icon, title and sentence - the part every tile shares. */
export function TileHeading({
  icon: IconGlyph,
  title,
  children,
}: {
  icon: IconComponent;
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand transition-transform duration-300 group-hover:scale-110">
        <IconGlyph className="size-5" />
      </span>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{children}</p>
    </>
  );
}
