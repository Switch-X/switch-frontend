"use client";

/**
 * Name, stage, skills and employment history - everything `PATCH /v1/users/me` changes.
 *
 * <p>Saved on its own, apart from the reminders, because the backend splits them: this endpoint
 * changes the profile and refuses to carry preferences, while the preferences endpoint has its own.
 * One form with one button would mean firing two requests and having to explain a half-failure.
 */

import { usersApi } from "@/components/profile/user.api";
import { useState, type FormEvent } from "react";
import { ApiError } from "@/lib/api";
import { WORKING_PROFILE } from "@/lib/enums";
import { useFormFields } from "@/lib/hooks/useFormFields";
import { changedFields } from "@/lib/patch";
import { useSession } from "@/lib/session";
import type { ExperiencedProfileDto, UserView } from "@/components/profile/user.types";
import { Button } from "@/components/ui/button/Button";
import { ErrorNote } from "@/components/ui/feedback/ErrorNote";
import { useToast } from "@/components/ui/feedback/Toast";
import { EnumSelect } from "@/components/ui/form/EnumSelect";
import { Field } from "@/components/ui/form/Field";
import { Input } from "@/components/ui/form/Input";
import { DEFAULT_WORKING_PROFILE } from "@/components/shared/constants/profileDefaults";
import { EMPTY_ROLE } from "@/components/profile/details/employment.constants";
import { initialDetailsForm, toProfileUpdate } from "@/components/profile/details/detailsForm.utils";
import { EmploymentHistory } from "./EmploymentHistory";

export function ProfileDetailsForm() {
  const { user } = useSession();
  if (!user) return null;

  // Keyed on `updatedAt` so a successful save rebuilds the form from the server's answer rather
  // than leaving it holding what was typed.
  return <DetailsForm key={user.updatedAt} user={user} />;
}

function DetailsForm({ user }: { user: UserView }) {
  const { refresh } = useSession();
  const toast = useToast();

  const [form, set] = useFormFields(() => initialDetailsForm(user));
  const [history, setHistory] = useState<ExperiencedProfileDto[]>(user.experiencedProfile ?? []);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setFieldErrors({});
    setBusy(true);

    try {
      await usersApi.update(
        changedFields(
          toProfileUpdate(initialDetailsForm(user), user.experiencedProfile ?? []),
          toProfileUpdate(form, history),
        ),
      );
      await refresh();
      toast("Profile saved");
    } catch (failure) {
      if (failure instanceof ApiError) {
        setFieldErrors(failure.fieldErrors);
        setError(failure.message);
      } else {
        setError("Could not reach SWITCH. Your changes were not saved.");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="space-y-4 p-5" onSubmit={submit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" htmlFor="profile-name" required error={fieldErrors.fullName}>
          <Input
            id="profile-name"
            required
            maxLength={120}
            value={form.fullName}
            onChange={(event) => set("fullName", event.target.value)}
          />
        </Field>

        <Field label="Username" htmlFor="profile-username" error={fieldErrors.username}>
          <Input
            id="profile-username"
            maxLength={60}
            value={form.username}
            onChange={(event) => set("username", event.target.value)}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Years of experience"
          htmlFor="profile-years"
          error={fieldErrors.yearsOfExperience}
        >
          <Input
            id="profile-years"
            type="number"
            min={0}
            max={60}
            value={form.yearsOfExperience}
            onChange={(event) => set("yearsOfExperience", event.target.value)}
          />
        </Field>

        <Field label="Stage" htmlFor="profile-stage" error={fieldErrors.workingProfile}>
          <EnumSelect
            id="profile-stage"
            table={WORKING_PROFILE}
            value={form.workingProfile}
            placeholder="Choose one"
            onChange={(value) => set("workingProfile", value ?? DEFAULT_WORKING_PROFILE)}
          />
        </Field>
      </div>

      <Field label="Skills" htmlFor="profile-skills" hint="Comma separated.">
        <Input
          id="profile-skills"
          value={form.skills}
          placeholder="java, spring, postgresql"
          onChange={(event) => set("skills", event.target.value)}
        />
      </Field>

      <Field label="Roles you are targeting" htmlFor="profile-roles" hint="Comma separated.">
        <Input
          id="profile-roles"
          value={form.targetedRoles}
          placeholder="Backend Engineer, Platform Engineer"
          onChange={(event) => set("targetedRoles", event.target.value)}
        />
      </Field>

      <EmploymentHistory
        rows={history}
        onAdd={() => setHistory((current) => [...current, { ...EMPTY_ROLE }])}
        onChange={(index, patch) =>
          setHistory((current) =>
            current.map((row, position) => (position === index ? { ...row, ...patch } : row)),
          )
        }
        onRemove={(index) =>
          setHistory((current) => current.filter((_, position) => position !== index))
        }
      />

      {error && <ErrorNote>{error}</ErrorNote>}

      <div className="flex justify-end">
        <Button type="submit" loading={busy}>
          Save profile
        </Button>
      </div>
    </form>
  );
}
