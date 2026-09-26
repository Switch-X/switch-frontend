import { cx } from "@/lib/cx";
import { initialsOf } from "@/lib/format";
import { Icon } from "@/components/ui/icons";
import type { DemoAccount } from "@/components/landing/types/demoAccounts";

/** One demo account in the sign-in dialog: full name, experience and zone, one click to enter. */
export function DemoAccountOption({
  account,
  busy,
  disabled,
  onSelect,
}: {
  account: DemoAccount;
  /** This account is the one being signed in as. */
  busy: boolean;
  disabled: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className="group flex w-full items-center gap-3 rounded-xl border border-border-strong bg-surface p-3 text-left transition hover:border-brand hover:bg-brand-soft/40 disabled:opacity-60"
    >
      <span
        className={cx(
          "flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
          account.tint,
        )}
      >
        {initialsOf(account.fullName)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-ink">{account.fullName}</span>
        <span className="block truncate text-xs text-ink-subtle">{account.summary}</span>
      </span>
      {busy ? (
        <span className="size-4 shrink-0 animate-spin rounded-full border-2 border-brand border-t-transparent" />
      ) : (
        <Icon.ArrowRight className="size-4 shrink-0 text-ink-subtle transition group-hover:translate-x-0.5 group-hover:text-brand" />
      )}
    </button>
  );
}
