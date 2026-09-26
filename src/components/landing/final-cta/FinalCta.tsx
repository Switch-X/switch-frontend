import { buttonClass } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { AuthDialogTrigger } from "@/components/landing/auth/AuthDialogTrigger";
import { Reveal } from "@/components/landing/shared/Reveal";

/** The last push before the footer. */
export function FinalCta() {
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12">
      <Reveal>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-night px-6 py-20 text-center sm:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(60% 70% at 20% 10%, rgba(91,47,232,0.60), transparent 60%), radial-gradient(50% 60% at 85% 90%, rgba(192,38,211,0.45), transparent 60%)",
            }}
          />
          <div className="relative">
            <h2 className="font-display text-3xl leading-tight font-extrabold tracking-tight text-balance text-white sm:text-4xl">
              Stop losing track of your own job search.
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/70">
              Create an account and fill it with a worked example in one click — or open a demo
              account and have a look around first.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <AuthDialogTrigger
                mode="signup"
                className={buttonClass({ variant: "inverse", className: "px-6 py-3 text-[15px]" })}
              >
                Create account
                <Icon.ArrowRight className="size-4" />
              </AuthDialogTrigger>
              <a
                href="#top"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-[15px] font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                Back to the demo accounts
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
