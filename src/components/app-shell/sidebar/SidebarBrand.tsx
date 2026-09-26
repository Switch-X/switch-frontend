import Link from "next/link";
import { Icon } from "@/components/ui/icons";
import { CloseDrawerButton } from "@/components/app-shell/drawer/CloseDrawerButton";

export function SidebarBrand() {
  return (
    <div className="flex items-center justify-between px-5 py-5">
      <Link href="/dashboard" className="flex items-center gap-2.5">
        <span className="flex size-9 items-center justify-center rounded-xl bg-brand text-white shadow-sm">
          <Icon.Sparkle className="size-5" />
        </span>
        <span className="text-lg font-semibold tracking-tight text-ink">SWITCH</span>
      </Link>
      <CloseDrawerButton />
    </div>
  );
}
