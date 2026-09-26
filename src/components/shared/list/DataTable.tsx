import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/**
 * A list page's table: column headings, then rows, then a blank column for each row's actions.
 *
 * <p>A table is the right shape for this data, and a table cannot reflow. Rather than collapse it
 * into cards at narrow widths, it scrolls sideways inside this box while the page itself never
 * does. `className` carries the minimum width, which depends on how many columns there are.
 */
export function DataTable({
  columns,
  className,
  children,
}: {
  columns: readonly string[];
  className: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-x-auto">
      <table className={cx("w-full border-collapse text-sm", className)}>
        <thead>
          <tr className="border-b border-border text-left text-xs tracking-wide text-ink-subtle uppercase">
            {columns.map((column, index) => (
              <th key={column} className={cx(index === 0 ? "px-5" : "px-3", "py-3 font-semibold")}>
                {column}
              </th>
            ))}
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function DataTableRow({ children }: { children: ReactNode }) {
  return (
    <tr className="border-b border-border last:border-0 transition hover:bg-surface-muted">
      {children}
    </tr>
  );
}
