"use client";

/**
 * The second half of signing up: everything Keycloak did not ask for.
 *
 * <p>Reached only with a session already in hand. Keycloak took the name, the email and the
 * password on its own page, so this asks about experience and reminders and nothing else - and
 * the profile is created under the session, which is what tells the backend whose it is.
 *
 * <p>The whole form lives here and the steps render slices of it, so moving between them keeps
 * everything typed so far and the final submit sends one request rather than two.
 */

import { useEffect, useState, type FormEvent } from "react";

import { ApiError } from "@/lib/api";
import { ERROR_MESSAGES } from "@/lib/errorMessages";
import { useFormFields } from "@/lib/hooks/useFormFields";
import { useSession } from "@/lib/session";
import { detectTimeZone } from "@/lib/timezone";
import { gatewayApi } from "@/components/landing/auth/gateway.api";
import { usersApi } from "@/components/profile/user.api";
import { Button } from "@/components/ui/button/Button";
import { ErrorNote } from "@/components/ui/feedback/ErrorNote";
import { Icon } from "@/components/ui/icons";
import { DEFAULT_TIMEZONE } from "@/components/shared/constants/profileDefaults";
import { INITIAL_SIGN_UP_FORM, SIGN_UP_STEPS } from "./signUp.constants";
import { toCreateProfileRequest } from "./signUp.utils";
import { WizardProgress } from "./WizardProgress";
import { ExperienceStep } from "./steps/ExperienceStep";
import { RemindersStep } from "./steps/RemindersStep";

const LAST = SIGN_UP_STEPS.length - 1;

export function ProfileSetupPanel() {
  const { refresh } = useSession();

  const [form, set] = useFormFields(INITIAL_SIGN_UP_FORM);
  const [email, setEmail] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // `Intl` is only available in the browser, so this waits for the effect rather than running
  // during the server render and mismatching on hydration.
  useEffect(() => {
    set("timezone", detectTimeZone() ?? DEFAULT_TIMEZONE);
  }, [set]);

  // The address is the session's, never typed here. The name comes with it when Keycloak
  // collected one, and is asked for below when it did not.
  useEffect(() => {
    void gatewayApi
      .session()
      .then((session) => {
        setEmail(session.email ?? "");
        if (session.name) set("fullName", session.name);
      })
      .catch(() => setEmail(""));
  }, [set]);

  function next() {
    const gaps: Record<string, string> = {};
    for (const field of SIGN_UP_STEPS[step].requires) {
      if (!String(form[field]).trim()) gaps[field] = "This one is needed to carry on.";
    }
    setFieldErrors(gaps);
    if (Object.keys(gaps).length > 0) return;
    setError(null);
    setStep((current) => Math.min(current + 1, LAST));
  }

  function back() {
    setError(null);
    setFieldErrors({});
    setStep((current) => Math.max(current - 1, 0));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    // Enter on an earlier step should advance, not save the profile half-filled.
    if (step < LAST) {
      next();
      return;
    }
    if (email === null) return;

    setError(null);
    setFieldErrors({});
    setBusy(true);
    try {
      await usersApi.create(toCreateProfileRequest(form, email));
      // No navigation. The session gate is what is rendering this screen, and re-reading the
      // profile turns its answer from `no-profile` into `signed-in` - so the app appears in
      // place, on the page they were already heading for.
      await refresh();
    } catch (failure) {
      if (failure instanceof ApiError) {
        setFieldErrors(failure.fieldErrors);
        setError(failure.message);
        if (Object.keys(failure.fieldErrors).length > 0) setStep(0);
      } else {
        setError(ERROR_MESSAGES.offline);
      }
      setBusy(false);
    }
  }

  return (
    <form className="flex min-h-[24rem] flex-col" onSubmit={submit}>
      <WizardProgress current={step} />

      <div className="mt-8 flex-1">
        {step === 0 && <ExperienceStep form={form} set={set} fieldErrors={fieldErrors} />}
        {step === 1 && <RemindersStep form={form} set={set} fieldErrors={fieldErrors} />}
      </div>

      {error && (
        <div className="mt-6">
          <ErrorNote>{error}</ErrorNote>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={back}>
            <Icon.ChevronLeft className="size-4" />
            Back
          </Button>
        ) : (
          <span />
        )}

        {step < LAST ? (
          <Button type="button" onClick={next} className="px-6">
            Continue
            <Icon.ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button type="submit" className="px-6" loading={busy}>
            Finish
            <Icon.Check className="size-4" />
          </Button>
        )}
      </div>
    </form>
  );
}
