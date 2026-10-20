"use client";

import Link from "next/link";
import { useSession } from "@/lib/session";
import { buttonClass } from "@/components/ui/button/Button";
import { PageHeader } from "@/components/ui/layout/PageHeader";
import { Icon } from "@/components/ui/icons";
import { useDashboardData } from "@/components/dashboard/context/DashboardDataProvider";
import { useGreeting } from "@/components/dashboard/header/useGreeting";
import { firstNameOf } from "@/components/dashboard/summary.utils";

/** A client component because the greeting depends on who is signed in and their clock. */
export function DashboardHeader() {
  const { user } = useSession();
  const { error } = useDashboardData();
  const greeting = useGreeting(user?.notificationPreferences?.timezone ?? null);
  const title = `${greeting}, ${firstNameOf(user?.fullName)}`;

  // With the lists failing to load, only the greeting stays: the description and the button
  // describe a page that is not there.
  if (error) return <PageHeader title={title} />;

  return (
    <PageHeader
      title={title}
      description="Here is where your search stands today."
      actions={
        <Link href="/applications" className={buttonClass()}>
          <Icon.Plus className="size-4" />
          New application
        </Link>
      }
    />
  );
}
