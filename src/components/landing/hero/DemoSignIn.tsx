"use client";

import { ErrorNote } from "@/components/ui/ErrorNote";
import { DEMO_ACCOUNTS } from "@/components/landing/constants/demoAccounts";
import { useSignInAs } from "@/components/landing/hooks/useSignInAs";
import { DemoAccountChip } from "./DemoAccountChip";

/** The fast path. No form, no password, straight into a populated account. */
export function DemoSignIn() {
  const { busyId, error, signInAs } = useSignInAs(
    (id) =>
      `There is no profile set up for "${id}" yet, so the demo accounts may not have been added.`,
  );

  return (
    <>
      <div className="mt-10">
        <p className="text-xs font-semibold tracking-wider text-white/45 uppercase">
          Or jump straight in as
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {DEMO_ACCOUNTS.map((account) => (
            <DemoAccountChip
              key={account.id}
              account={account}
              busy={busyId === account.id}
              disabled={busyId !== null}
              onSelect={() => signInAs(account.id)}
            />
          ))}
        </div>
        <p className="mt-3 text-xs text-white/45">
          Real accounts, already filled with example data. There is no password — you just pick
          who to sign in as.
        </p>
      </div>

      {error && (
        <div className="mt-5 max-w-md">
          <ErrorNote>{error}</ErrorNote>
        </div>
      )}
    </>
  );
}
