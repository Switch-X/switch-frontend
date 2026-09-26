import type { SampleDataProgress } from "@/lib/sampleData";

export function SampleDataProgressBar({ progress }: { progress: SampleDataProgress }) {
  const percent = progress.total > 0 ? (progress.done / progress.total) * 100 : 0;

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs text-ink-muted">
        <span>{progress.step}</span>
        <span className="tabular-nums">
          {progress.done} / {progress.total}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-sunken">
        <div
          className="h-full rounded-full bg-brand transition-[width] duration-200"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
