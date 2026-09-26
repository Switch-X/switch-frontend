import { Icon } from "@/components/ui/icons";
import { SAMPLE_DATA_CHECKLIST } from "@/components/shared/constants/sampleData";

/** Exactly what the button is about to create, said before it creates any of it. */
export function SampleDataChecklist() {
  return (
    <>
      <ul className="space-y-1.5 text-sm text-ink-muted">
        {SAMPLE_DATA_CHECKLIST.map(({ count, noun }) => (
          <li key={noun} className="flex items-center gap-2">
            <Icon.Check className="size-4 shrink-0 text-good" />
            <span>
              <strong className="font-semibold text-ink">{count}</strong> {noun}
            </span>
          </li>
        ))}
      </ul>

      <p className="rounded-lg bg-surface-sunken px-3 py-2.5 text-xs text-ink-muted">
        Dates are set relative to today, so deadlines and upcoming interviews land where you
        would expect. This <strong className="text-ink">adds</strong> records rather than
        replacing anything — run it twice and you get two of everything.
      </p>
    </>
  );
}
