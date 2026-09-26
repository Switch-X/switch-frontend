"use client";

/**
 * Create the profile to sign in with.
 *
 * <p>The timezone is picked up from the browser rather than defaulted. The backend falls back to
 * `switch.default-timezone` (UTC out of the box) for a profile that arrives without one, and its
 * own comments are blunt that this is a guess that is wrong for most of the world. The client
 * knows the real answer for free, so it sends it.
 */

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api";
import { ERROR_MESSAGES } from "@/lib/errorMessages";
import { WORKING_PROFILE } from "@/lib/enums";
import { useFormFields } from "@/lib/hooks";
import { useSession } from "@/lib/session";
import { detectTimeZone } from "@/lib/timezone";
import { Button } from "@/components/ui/Button";
import { ErrorNote } from "@/components/ui/ErrorNote";
import { EnumSelect } from "@/components/ui/form/EnumSelect";
import { Field } from "@/components/ui/form/Field";
import { Input } from "@/components/ui/form/Input";
import {
  DEFAULT_TIMEZONE,
  DEFAULT_WORKING_PROFILE,
} from "@/components/shared/constants/profileDefaults";
import { INITIAL_SIGN_UP_FORM } from "@/components/landing/constants/auth";
import { suggestAccountId, toCreateProfileRequest } from "@/components/landing/utils/auth";
import { ReminderFields } from "./ReminderFields";

export function SignUpPanel() {
  const { signUp } = useSession();
  const router = useRouter();

  const [form, set] = useFormFields(INITIAL_SIGN_UP_FORM);
  const [touchedAccountId, setTouchedAccountId] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // `Intl` is only available in the browser, so this waits for the effect rather than running
  // during the server render and mismatching on hydration.
  useEffect(() => {
    set("timezone", detectTimeZone() ?? DEFAULT_TIMEZONE);
  }, [set]);

  // Follows the username until the person edits it themselves, then stops interfering.
  const accountId = touchedAccountId ? form.accountId : suggestAccountId(form.username);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setFieldErrors({});

    const id = accountId.trim();
    if (!id) {
      setFieldErrors({ accountId: "Pick an account id - it is what you will sign in with." });
      return;
    }

    setBusy(true);
    try {
      await signUp(id, toCreateProfileRequest(form));
      router.push("/dashboard");
    } catch (failure) {
      if (failure instanceof ApiError) {
        setFieldErrors(failure.fieldErrors);
        setError(failure.message);
      } else {
        setError(ERROR_MESSAGES.offline);
      }
      setBusy(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={submit}>
      <div>
        <h2 className="text-lg font-semibold text-ink">Create your profile</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Everything here can be changed later from the profile page.
        </p>
      </div>

      <Field label="Full name" htmlFor="signup-name" required error={fieldErrors.fullName}>
        <Input
          id="signup-name"
          required
          value={form.fullName}
          placeholder="Ada Lovelace"
          autoComplete="name"
          onChange={(event) => set("fullName", event.target.value)}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Username" htmlFor="signup-username" error={fieldErrors.username}>
          <Input
            id="signup-username"
            value={form.username}
            placeholder="ada"
            onChange={(event) => set("username", event.target.value)}
          />
        </Field>

        <Field
          label="Account ID"
          htmlFor="signup-account"
          required
          error={fieldErrors.accountId}
          hint="You will use this to sign in, so pick something you will remember."
        >
          <Input
            id="signup-account"
            value={accountId}
            placeholder="ada"
            onChange={(event) => {
              setTouchedAccountId(true);
              set("accountId", event.target.value);
            }}
          />
        </Field>
      </div>

      <Field label="Email" htmlFor="signup-email" required error={fieldErrors.email}>
        <Input
          id="signup-email"
          type="email"
          required
          value={form.email}
          placeholder="ada@example.com"
          autoComplete="email"
          onChange={(event) => set("email", event.target.value)}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Years of experience"
          htmlFor="signup-years"
          error={fieldErrors.yearsOfExperience}
        >
          <Input
            id="signup-years"
            type="number"
            min={0}
            max={60}
            value={form.yearsOfExperience}
            onChange={(event) => set("yearsOfExperience", event.target.value)}
          />
        </Field>

        <Field label="Stage" htmlFor="signup-stage" error={fieldErrors.workingProfile}>
          <EnumSelect
            id="signup-stage"
            table={WORKING_PROFILE}
            value={form.workingProfile}
            placeholder="Choose one"
            onChange={(value) => set("workingProfile", value ?? DEFAULT_WORKING_PROFILE)}
          />
        </Field>
      </div>

      <Field label="Skills" htmlFor="signup-skills" hint="Comma separated — java, spring, postgresql">
        <Input
          id="signup-skills"
          value={form.skills}
          placeholder="java, spring, postgresql"
          onChange={(event) => set("skills", event.target.value)}
        />
      </Field>

      <Field
        label="Roles you are targeting"
        htmlFor="signup-roles"
        hint="Comma separated — Backend Engineer, Platform Engineer"
      >
        <Input
          id="signup-roles"
          value={form.targetedRoles}
          placeholder="Backend Engineer, Platform Engineer"
          onChange={(event) => set("targetedRoles", event.target.value)}
        />
      </Field>

      <ReminderFields form={form} set={set} fieldErrors={fieldErrors} />

      {error && <ErrorNote>{error}</ErrorNote>}

      <Button type="submit" className="w-full" loading={busy}>
        Create account
      </Button>
    </form>
  );
}
