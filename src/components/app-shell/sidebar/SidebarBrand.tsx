import Link from "next/link";
import { Logo } from "@/components/ui/brand/Logo";
import { CloseDrawerButton } from "@/components/app-shell/drawer/CloseDrawerButton";

export function SidebarBrand() {
  return (
    <div className="flex items-center justify-between px-5 py-5">
      <Link href="/dashboard">
        <Logo />
      </Link>
      <CloseDrawerButton />
    </div>
  );
}
