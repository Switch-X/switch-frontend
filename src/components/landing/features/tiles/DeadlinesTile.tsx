import { cx } from "@/lib/cx";
import { Icon } from "@/components/ui/icons";
import { BENTO_DEADLINES } from "@/components/landing/features/features.constants";
import { TileHeading } from "../TileHeading";

export function DeadlinesTile() {
  return (
    <>
      <TileHeading icon={Icon.Clock} title="What needs you today">
        Deadlines inside the week are pulled to the top of the dashboard and coloured by how
        close they are. Overdue turns red only while the work is still outstanding.
      </TileHeading>

      <div className="mt-5 space-y-2">
        {BENTO_DEADLINES.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-2 rounded-lg bg-surface-muted px-3 py-2 text-xs"
          >
            <span className="min-w-0 truncate text-ink-muted">{row.label}</span>
            <span className={cx("shrink-0 font-semibold", row.tone)}>{row.when}</span>
          </div>
        ))}
      </div>
    </>
  );
}
