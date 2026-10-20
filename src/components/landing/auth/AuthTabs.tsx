import { cx } from "@/lib/cx";
import { AUTH_TABS } from "@/components/landing/auth/authDialog.constants";
import type { AuthMode } from "@/components/landing/auth/authDialog.types";

export function AuthTabs({
  active,
  onSelect,
}: {
  active: AuthMode;
  onSelect: (mode: AuthMode) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-xl border border-border bg-surface-muted p-1.5">
      {AUTH_TABS.map(({ mode, label }) => (
        <button
          key={mode}
          type="button"
          onClick={() => onSelect(mode)}
          className={cx(
            "rounded-lg px-3 py-2 text-sm font-medium transition",
            active === mode ? "bg-surface text-ink shadow-sm" : "text-ink-muted hover:text-ink",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
