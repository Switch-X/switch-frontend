"use client";

/**
 * Who is signed in, for the whole app.
 *
 * <p>Signing in posts an email and password to the backend, which trades them with Keycloak and
 * answers with an access token. That token is the whole session: the backend verifies it and
 * reads the account from its `sub` claim, so nothing here knows or stores an account id.
 *
 * <p>The distinction the rest of the app cares about is `no-profile`: a valid token whose
 * account has no profile row behind it. That happens between registering and creating the
 * profile, and after an account is deleted, and it needs a different screen from "signed out" -
 * one that offers to create the profile rather than asking who you are again.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ApiError, readToken, writeToken } from "./api";
import { authApi } from "@/components/landing/auth/auth.api";
import { usersApi } from "@/components/profile/user.api";
import type { RegisterRequest } from "@/components/landing/auth/auth.types";
import type { CreateUserProfileRequest, UserView } from "@/components/profile/user.types";

type SessionStatus = "loading" | "signed-out" | "signed-in" | "no-profile";

type SessionValue = {
  status: SessionStatus;
  user: UserView | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (credentials: RegisterRequest, profile: CreateUserProfileRequest) => Promise<void>;
  signOut: () => void;
  /** Re-reads the profile after an edit, so the header and profile page stay in step. */
  refresh: () => Promise<void>;
};

const SessionContext = createContext<SessionValue | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<SessionStatus>("loading");
  const [user, setUser] = useState<UserView | null>(null);

  const load = useCallback(async (token: string | null) => {
    if (!token) {
      setUser(null);
      setStatus("signed-out");
      return;
    }
    try {
      const profile = await usersApi.me();
      setUser(profile);
      setStatus("signed-in");
    } catch (failure) {
      // A remembered id with no profile behind it is a real state, not an error to shout about.
      if (failure instanceof ApiError && failure.isMissingProfile) {
        setUser(null);
        setStatus("no-profile");
        return;
      }
      throw failure;
    }
  }, []);

  // localStorage is not readable while rendering on the server, so the first paint is always
  // "loading" and the real answer arrives on the client.
  useEffect(() => {
    void load(readToken()).catch(() => setStatus("signed-out"));
  }, [load]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const session = await authApi.login({ email: email.trim(), password });
      writeToken(session.accessToken);
      // Deliberately not caught - the form shows whatever this throws, which is how an account
      // with no profile yet reaches its own screen instead of failing silently.
      await load(session.accessToken);
    },
    [load],
  );

  const signUp = useCallback(
    async (credentials: RegisterRequest, profile: CreateUserProfileRequest) => {
      // Two steps, in this order. The login is created in Keycloak first and signed in, and
      // only then can the profile be created - the backend takes the owner from the token, so
      // there has to be a token before there can be a profile.
      const session = await authApi.register(credentials);
      writeToken(session.accessToken);
      try {
        await usersApi.create(profile);
        const created = await usersApi.me();
        setUser(created);
        setStatus("signed-in");
      } catch (failure) {
        // The Keycloak login survives this - it is only the profile that failed - so the token
        // is dropped here rather than kept, and the next sign-in lands on "no profile yet",
        // which is the screen that offers to finish the job.
        writeToken(null);
        setStatus("signed-out");
        throw failure;
      }
    },
    [],
  );

  const signOut = useCallback(() => {
    writeToken(null);
    setUser(null);
    setStatus("signed-out");
  }, []);

  const refresh = useCallback(async () => {
    await load(readToken());
  }, [load]);

  const value = useMemo<SessionValue>(
    () => ({ status, user, signIn, signUp, signOut, refresh }),
    [status, user, signIn, signUp, signOut, refresh],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionValue {
  const value = useContext(SessionContext);
  if (!value) throw new Error("useSession must be used inside <SessionProvider>");
  return value;
}
