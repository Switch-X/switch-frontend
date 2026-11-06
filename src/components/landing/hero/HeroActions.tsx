import { buttonClass } from "@/components/ui/button/Button";
import { Icon } from "@/components/ui/icons";
import { StartAuthButton } from "@/components/landing/auth/StartAuthButton";

export function HeroActions() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <StartAuthButton
        mode="signup"
        className={buttonClass({ variant: "inverse", className: "px-6 py-3.5 text-[15px]" })}
      >
        Create account
        <Icon.ArrowRight className="size-4" />
      </StartAuthButton>
      <a
        href="#how"
        className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3.5 text-[15px] font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
      >
        See how it works
      </a>
    </div>
  );
}
