"use client";

/**
 * Who is signed in, for the whole app.
 *
 * <p>"Signed in" here means one thing: the browser is holding an `iamUserId` that the backend
 * recognises. There is no password step because there is nothing to check it against - the
 * backend's `HeaderCurrentUser` trusts the `X-User-Id` header outright, so this screen is a
 * chooser, not an authenticator. That is worth being blunt about rather than dressing a fake
 * password field over it: when Keycloak is wired in, `signIn` becomes a redirect and everything
 * downstream of this file keeps working unchanged.
 *
 * <p>The distinction the rest of the app cares about is `no-profile`: an id that is remembered
 * but has no row behind it. That happens after the account is deleted, or when someone types an
 * id that was never created, and it needs a different screen from "signed out" - one that offers
 * to create the profile rather than asking who you are again.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ApiError, api, readSession, writeSession } from "./api";
import type { CreateUserProfileRequest, UserView } from "./types";

export type SessionStatus = "loading" | "signed-out" | "signed-in" | "no-profile";

type SessionValue = {
  status: SessionStatus;
  user: UserView | null;
  iamUserId: string | null;
  signIn: (iamUserId: string) => Promise<void>;
  signUp: (iamUserId: string, profile: CreateUserProfileRequest) => Promise<void>;
  signOut: () => void;
  /** Re-reads the profile after an edit, so the header and profile page stay in step. */
  refresh: () => Promise<void>;
};

const SessionContext = createContext<SessionValue | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<SessionStatus>("loading");
  const [user, setUser] = useState<UserView | null>(null);
  const [iamUserId, setIamUserId] = useState<string | null>(null);

  const load = useCallback(async (id: string | null) => {
    if (!id) {
      setUser(null);
      setIamUserId(null);
      setStatus("signed-out");
      return;
    }
    setIamUserId(id);
    try {
      const profile = await api.users.me();
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
    void load(readSession()).catch(() => setStatus("signed-out"));
  }, [load]);

  const signIn = useCallback(
    async (id: string) => {
      const trimmed = id.trim();
      writeSession(trimmed);
      // Deliberately not caught: the sign-in form shows whatever this throws, which is how a
      // typo'd id ends up saying "No profile for account ..." instead of failing silently.
      await load(trimmed);
    },
    [load],
  );

  const signUp = useCallback(
    async (id: string, profile: CreateUserProfileRequest) => {
      const trimmed = id.trim();
      // The header has to be in place before the call: the backend takes the owner from it, so
      // the id is decided here rather than returned by the create.
      writeSession(trimmed);
      try {
        const created = await api.users.create(profile);
        setIamUserId(trimmed);
        setUser(created);
        setStatus("signed-in");
      } catch (failure) {
        // Roll the session back so a rejected sign-up does not leave the browser holding an id
        // with nothing behind it.
        writeSession(null);
        setIamUserId(null);
        setStatus("signed-out");
        throw failure;
      }
    },
    [],
  );

  const signOut = useCallback(() => {
    writeSession(null);
    setUser(null);
    setIamUserId(null);
    setStatus("signed-out");
  }, []);

  const refresh = useCallback(async () => {
    if (!readSession()) return;
    await load(readSession());
  }, [load]);

  const value = useMemo<SessionValue>(
    () => ({ status, user, iamUserId, signIn, signUp, signOut, refresh }),
    [status, user, iamUserId, signIn, signUp, signOut, refresh],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionValue {
  const value = useContext(SessionContext);
  if (!value) throw new Error("useSession must be used inside <SessionProvider>");
  return value;
}
