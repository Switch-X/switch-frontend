import { cx } from "@/lib/cx";

/** A grey block standing in for a row while it loads, so the layout does not jump. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cx("animate-pulse rounded-md bg-surface-sunken", className)} />;
}

/** A stack of skeletons standing in for a whole list. `itemClassName` sizes each one. */
export function SkeletonList({
  count,
  itemClassName,
  className = "space-y-3 p-5",
}: {
  count: number;
  itemClassName: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className={itemClassName} />
      ))}
    </div>
  );
}
