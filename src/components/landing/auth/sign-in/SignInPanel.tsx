"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ErrorNote } from "@/components/ui/ErrorNote";
import { Field } from "@/components/ui/form/Field";
import { Input } from "@/components/ui/form/Input";
import { DEMO_ACCOUNTS } from "@/components/landing/constants/demoAccounts";
import { useSignInAs } from "@/components/landing/hooks/useSignInAs";
import { DemoAccountOption } from "./DemoAccountOption";

/** Pick a demo account, or type your own account id. */
export function SignInPanel({ onSwitch }: { onSwitch: () => void }) {
  const [customId, setCustomId] = useState("");
  const { busyId, error, signInAs } = useSignInAs(
    (id) => `No profile exists for "${id}". Create an account instead, or check the id.`,
  );

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-ink">Pick up where you left off</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Choose a demo account to see SWITCH with real data in it.
        </p>
      </div>

      <div className="space-y-2">
        {DEMO_ACCOUNTS.map((account) => (
          <DemoAccountOption
            key={account.id}
            account={account}
            busy={busyId === account.id}
            disabled={busyId !== null}
            onSelect={() => signInAs(account.id)}
          />
        ))}
      </div>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium text-ink-subtle">or use your own account id</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <form
        className="space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          void signInAs(customId);
        }}
      >
        <Field
          label="Account ID"
          htmlFor="account-id"
          hint="The ID you chose when you created your profile."
        >
          <Input
            id="account-id"
            value={customId}
            placeholder="e.g. demo-mohit"
            autoComplete="username"
            onChange={(event) => setCustomId(event.target.value)}
          />
        </Field>

        {error && <ErrorNote>{error}</ErrorNote>}

        <Button type="submit" className="w-full" loading={busyId === customId && busyId !== null}>
          Sign in
        </Button>
      </form>

      <p className="text-center text-sm text-ink-muted">
        No account yet?{" "}
        <button type="button" onClick={onSwitch} className="font-medium text-brand hover:underline">
          Create one
        </button>
      </p>
    </div>
  );
}
