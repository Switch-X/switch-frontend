import { cx } from "@/lib/cx";
import { Icon } from "@/components/ui/icons";
import { SIGN_UP_STEPS } from "@/components/landing/auth/sign-up/signUp.constants";

/**
 * Where you are in sign-up, and how much is left.
 *
 * <p>A segmented bar rather than a percentage: three segments say "three steps" at a glance,
 * where "33%" has to be worked out. Finished steps carry a tick, so going back feels like
 * revisiting something done rather than losing progress.
 */
export function WizardProgress({ current }: { current: number }) {
  const step = SIGN_UP_STEPS[current];

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
          {step.title}
        </h3>
        <span className="shrink-0 text-xs font-semibold tracking-wider text-ink-subtle tabular-nums">
          {current + 1} / {SIGN_UP_STEPS.length}
        </span>
      </div>

      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{step.blurb}</p>

      <ol className="mt-5 flex items-center gap-2">
        {SIGN_UP_STEPS.map((item, index) => {
          const done = index < current;
          const active = index === current;

          return (
            <li key={item.title} className="flex flex-1 items-center gap-2">
              <span
                className={cx(
                  "flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition",
                  done && "bg-brand text-white",
                  active && "bg-brand-soft text-brand ring-2 ring-brand/30",
                  !done && !active && "bg-surface-sunken text-ink-subtle",
                )}
              >
                {done ? <Icon.Check className="size-3" /> : index + 1}
              </span>
              <span
                className={cx(
                  "h-1 flex-1 rounded-full transition-colors duration-300",
                  done || active ? "bg-brand" : "bg-surface-sunken",
                )}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
