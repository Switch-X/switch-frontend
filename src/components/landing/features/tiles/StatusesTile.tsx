import { cx } from "@/lib/cx";
import { Icon } from "@/components/ui/icons";
import { BENTO_STATUSES } from "@/components/landing/features/features.constants";
import { TileHeading } from "../TileHeading";

export function StatusesTile() {
  return (
    <>
      <TileHeading icon={Icon.Applications} title="Ten statuses, including the bad ones">
        On hold, withdrawn, missed, offer revoked. A tracker that only models success is no use
        on the week you actually need it.
      </TileHeading>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {BENTO_STATUSES.map(({ label, tone }) => (
          <span
            key={label}
            className={cx(
              "rounded-md px-2.5 py-1 text-xs font-medium transition-transform duration-200 hover:scale-105",
              tone,
            )}
          >
            {label}
          </span>
        ))}
      </div>
    </>
  );
}
