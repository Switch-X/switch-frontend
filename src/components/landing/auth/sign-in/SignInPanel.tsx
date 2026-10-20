"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/session";
import { Button } from "@/components/ui/button/Button";
import { ErrorNote } from "@/components/ui/feedback/ErrorNote";
import { Field } from "@/components/ui/form/Field";
import { Input } from "@/components/ui/form/Input";
import { signInErrorMessage } from "@/components/landing/auth/sign-in/signIn.utils";

/**
 * Sign in with the email and password the account was registered with.
 *
 * <p>Both halves of a failed sign-in get the same message, because that is all the backend will
 * say: telling somebody whether the email exists is how an account list gets enumerated one
 * guess at a time.
 */
export function SignInPanel({ onSwitch }: { onSwitch: () => void }) {
  const { signIn } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError("Enter your email and password to sign in.");
      return;
    }

    setBusy(true);
    setError(null);
    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (failure) {
      setError(signInErrorMessage(failure, "That email and password do not match an account."));
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-ink">Pick up where you left off</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Sign in with the email and password you registered with.
        </p>
      </div>

      <form className="space-y-4" onSubmit={submit}>
        <Field label="Email" htmlFor="signin-email" required>
          <Input
            id="signin-email"
            type="email"
            value={email}
            placeholder="ada@example.com"
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Field>

        <Field label="Password" htmlFor="signin-password" required>
          <Input
            id="signin-password"
            type="password"
            value={password}
            placeholder="••••••••••"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Field>

        {error && <ErrorNote>{error}</ErrorNote>}

        <Button type="submit" className="w-full" loading={busy}>
          Sign in
        </Button>
      </form>

      <p className="text-center text-sm text-ink-muted">
        No account yet?{" "}
        <button type="button" onClick={onSwitch} className="font-medium text-brand hover:underline">
          Create one
        </button>
      </p>
    </div>
  );
}
