"use client";

/**
 * Create an account, three steps at a time.
 *
 * <p>Nobody is asked for an account id. Creating the account is two calls - Keycloak makes the
 * login and decides that id, then the profile is created under it - and `signUp` makes both in
 * that order.
 *
 * <p>The whole form lives here and the steps only render slices of it, so moving between them
 * keeps everything typed so far and the final submit sends one request rather than three.
 */

import { authApi } from "@/components/landing/auth/auth.api";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api";
import { ERROR_MESSAGES } from "@/lib/errorMessages";
import { useFormFields } from "@/lib/hooks/useFormFields";
import { useSession } from "@/lib/session";
import { detectTimeZone } from "@/lib/timezone";
import { Button } from "@/components/ui/button/Button";
import { ErrorNote } from "@/components/ui/feedback/ErrorNote";
import { Icon } from "@/components/ui/icons";
import { DEFAULT_TIMEZONE } from "@/components/shared/constants/profileDefaults";
import { INITIAL_SIGN_UP_FORM } from "@/components/landing/auth/sign-up/signUp.constants";
import { SIGN_UP_STEPS } from "@/components/landing/auth/sign-up/signUp.constants";
import { splitName, toCreateProfileRequest } from "@/components/landing/auth/sign-up/signUp.utils";
import { WizardProgress } from "./WizardProgress";
import { AccountInfoStep } from "./steps/AccountInfoStep";
import { ExperienceStep } from "./steps/ExperienceStep";
import { RemindersStep } from "./steps/RemindersStep";

const LAST = SIGN_UP_STEPS.length - 1;

export function SignUpPanel() {
  const { signUp } = useSession();
  const router = useRouter();

  const [form, set] = useFormFields(INITIAL_SIGN_UP_FORM);
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // `Intl` is only available in the browser, so this waits for the effect rather than running
  // during the server render and mismatching on hydration.
  useEffect(() => {
    set("timezone", detectTimeZone() ?? DEFAULT_TIMEZONE);
  }, [set]);

  /** Blocks **Next** on anything this step insists on, naming each gap under its own field. */
  function missingOnThisStep(): Record<string, string> {
    const gaps: Record<string, string> = {};
    for (const field of SIGN_UP_STEPS[step].requires) {
      if (!String(form[field]).trim()) gaps[field] = "This one is needed to carry on.";
    }
    return gaps;
  }

  /**
   * False only when the backend says the address already has an account.
   *
   * <p>A check that could not be made is not a reason to stop. Registering refuses a taken
   * address on its own, so an unreachable backend here costs a later error rather than a
   * sign-up nobody can finish.
   */
  async function emailIsFree(): Promise<boolean> {
    setChecking(true);
    try {
      const free = await authApi.isEmailAvailable({ email: form.email.trim() });
      if (!free) setFieldErrors({ email: "This email already has an account. Sign in instead." });
      return free;
    } catch {
      return true;
    } finally {
      setChecking(false);
    }
  }

  async function next() {
    const gaps = missingOnThisStep();
    setFieldErrors(gaps);
    if (Object.keys(gaps).length > 0) return;
    setError(null);

    // Leaving the first step is where the email is known and nothing has been built on it yet.
    // Checking here rather than at the end means nobody fills in two more screens to be told
    // the address was taken all along.
    if (step === 0 && !(await emailIsFree())) return;

    setStep((current) => Math.min(current + 1, LAST));
  }

  function back() {
    setError(null);
    setFieldErrors({});
    setStep((current) => Math.max(current - 1, 0));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    // Enter on an earlier step should advance, not create the account half-filled.
    if (step < LAST) {
      await next();
      return;
    }

    setError(null);
    setFieldErrors({});
    setBusy(true);
    try {
      const { firstName, lastName } = splitName(form.fullName);
      await signUp(
        { email: form.email.trim(), password: form.password, firstName, lastName },
        toCreateProfileRequest(form),
      );
      router.push("/dashboard");
    } catch (failure) {
      if (failure instanceof ApiError) {
        setFieldErrors(failure.fieldErrors);
        setError(failure.message);
        // A rejected field almost always belongs to step one, which is the only step the
        // backend validates strictly. Send them back to it rather than to a dead Create button.
        if (Object.keys(failure.fieldErrors).length > 0) setStep(0);
      } else {
        setError(ERROR_MESSAGES.offline);
      }
      setBusy(false);
    }
  }

  return (
    <form className="flex min-h-[26rem] flex-col" onSubmit={submit}>
      <WizardProgress current={step} />

      <div className="mt-7 flex-1">
        {step === 0 && <AccountInfoStep form={form} set={set} fieldErrors={fieldErrors} />}
        {step === 1 && <ExperienceStep form={form} set={set} fieldErrors={fieldErrors} />}
        {step === 2 && <RemindersStep form={form} set={set} fieldErrors={fieldErrors} />}
      </div>

      {error && (
        <div className="mt-5">
          <ErrorNote>{error}</ErrorNote>
        </div>
      )}

      <div className="mt-7 flex items-center justify-between gap-3 border-t border-border pt-5">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={back}>
            <Icon.ChevronLeft className="size-4" />
            Back
          </Button>
        ) : (
          <span />
        )}

        {step < LAST ? (
          <Button type="button" onClick={() => void next()} className="px-6" loading={checking}>
            Continue
            <Icon.ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button type="submit" className="px-6" loading={busy}>
            Create account
            <Icon.Check className="size-4" />
          </Button>
        )}
      </div>
    </form>
  );
}
