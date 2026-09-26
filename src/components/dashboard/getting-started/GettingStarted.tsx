"use client";

import Link from "next/link";
import { SAMPLE_DATA_COUNTS } from "@/lib/sampleData";
import { buttonClass } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/icons";
import { SampleDataButton } from "@/components/shared/sample-data/SampleDataButton";
import { useDashboardData } from "@/components/dashboard/context/DashboardDataProvider";
import { isAccountEmpty } from "@/components/dashboard/utils/summary";

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
        Add your first application, or load a worked example — {SAMPLE_DATA_COUNTS.applications}{" "}
        applications covering every status, interviews with their rounds, assignments and
        screening calls, all dated around today so the deadlines mean something.
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <SampleDataButton onLoaded={account.reloadAll} />
        <Link href="/applications" className={buttonClass({ variant: "secondary" })}>
          <Icon.Plus className="size-4" />
          Add one myself
        </Link>
      </div>
    </Card>
  );
}
