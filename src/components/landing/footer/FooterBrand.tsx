import { Icon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/brand/Logo";
import { AuthDialogTrigger } from "@/components/landing/auth/AuthDialogTrigger";

/** What this is, in two sentences, and a second chance to start. */
export function FooterBrand() {
  return (
    <div className="max-w-sm">
      <Logo />

      <p className="mt-4 text-sm leading-relaxed text-ink-muted">
        A job search has too many moving parts to keep in your head. SWITCH keeps the
        applications, the calls, the take-homes and every interview round in one place — and
        tells you what needs you today.
      </p>

      <AuthDialogTrigger
        mode="signup"
        className="group mt-5 inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-surface transition hover:-translate-y-0.5 hover:shadow-md"
      >
        Create your account
        <Icon.ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
      </AuthDialogTrigger>
    </div>
  );
}
