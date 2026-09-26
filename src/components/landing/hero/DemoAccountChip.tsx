import { cx } from "@/lib/cx";
import { Icon } from "@/components/ui/icons";
import type { DemoAccount } from "@/components/landing/types/demoAccounts";

/** One demo account as a pill on the dark hero: initial, first name, city. */
export function DemoAccountChip({
  account,
  busy,
  disabled,
  onSelect,
}: {
  account: DemoAccount;
  busy: boolean;
  disabled: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className="group flex items-center gap-2.5 rounded-full border border-white/12 bg-white/8 py-1.5 pr-3 pl-1.5 text-left backdrop-blur transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/14 disabled:opacity-60"
    >
      <span
        className={cx(
          "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
          account.tint,
        )}
      >
        {account.firstName[0]}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm leading-tight font-semibold text-white">
          {account.firstName}
        </span>
        <span className="block truncate text-[11px] leading-tight text-white/50">{account.city}</span>
      </span>
      {busy ? (
        <span className="size-3.5 shrink-0 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        <Icon.ArrowRight className="size-3.5 shrink-0 text-white/40 transition group-hover:translate-x-0.5 group-hover:text-white" />
      )}
    </button>
  );
}
