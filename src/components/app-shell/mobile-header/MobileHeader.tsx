import { Icon } from "@/components/ui/icons";
import { OpenDrawerButton } from "@/components/app-shell/drawer/OpenDrawerButton";

/** The bar that stands in for the sidebar below `lg`. Sticky, so the menu stays in reach. */
export function MobileHeader() {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-canvas/85 px-4 py-3 backdrop-blur lg:hidden">
      <OpenDrawerButton />
      <span className="flex items-center gap-2 font-semibold text-ink">
        <Icon.Sparkle className="size-4 text-brand" />
        SWITCH
      </span>
    </header>
  );
}
