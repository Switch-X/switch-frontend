"use client";

import Link from "next/link";
import { buttonClass } from "@/components/ui/button/Button";
import { Card } from "@/components/ui/layout/Card";
import { Icon } from "@/components/ui/icons";
import { useDashboardData } from "@/components/dashboard/context/DashboardDataProvider";
import { isAccountEmpty } from "@/components/dashboard/summary.utils";

/** The fresh-start block, shown only while the whole account is empty. */
export function GettingStarted() {
  const account = useDashboardData();
  if (account.loading || !isAccountEmpty(account)) return null;

  return (
    <Card className="border-brand/25 bg-brand-soft/40 p-6 text-center sm:p-8">
      <span className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-brand text-white">
        <Icon.Sparkle />
      </span>
      <h2 className="text-lg font-semibold text-ink">Nothing tracked yet</h2>
      <p className="mx-auto mt-1.5 max-w-md text-sm text-ink-muted">
        Start with the application you most recently sent. Everything else hangs off it — the
        screening call, the take-home, the interview rounds — and this page fills in from there.
      </p>
      <div className="mt-5 flex justify-center">
        <Link href="/applications" className={buttonClass()}>
          <Icon.Plus className="size-4" />
          Add your first application
        </Link>
      </div>
    </Card>
  );
}
