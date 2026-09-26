import { Icon, type IconComponent } from "@/components/ui/icons";

/** The sidebar, top to bottom. */
export const NAV_ITEMS: { href: string; label: string; icon: IconComponent }[] = [
  { href: "/dashboard", label: "Overview", icon: Icon.Dashboard },
  { href: "/applications", label: "Applications", icon: Icon.Applications },
  { href: "/interviews", label: "Interviews", icon: Icon.Interviews },
  { href: "/assignments", label: "Assignments", icon: Icon.Assignments },
  { href: "/screening-calls", label: "Screening calls", icon: Icon.Screening },
  { href: "/profile", label: "Profile", icon: Icon.Profile },
];
