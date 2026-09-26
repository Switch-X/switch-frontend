import { Icon } from "@/components/ui/icons";

/** Shown when the browser's zone and the profile's disagree, with a one-click way to fix it. */
export function TimezoneMismatchNotice({
  detected,
  onUse,
}: {
  detected: string;
  onUse: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-info/25 bg-info-soft px-3 py-2.5 text-sm text-info">
      <Icon.Globe className="size-4 shrink-0" />
      <span className="min-w-0 flex-1">
        This browser reports <strong>{detected}</strong>, which does not match your profile.
      </span>
      <button type="button" onClick={onUse} className="font-medium underline">
        Use it
      </button>
    </div>
  );
}
