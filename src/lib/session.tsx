"use client";

/**
 * Who is signed in, for the whole app.
 *
 * <p>Two ways a browser ends up signed in, and this holds both. Registering answers with an
 * access token, because the profile has to be created under one before any cookie exists.
 * Signing in goes to the gateway instead, which keeps the tokens and leaves this browser an
 * HttpOnly cookie - so there is nothing here to read, and the gateway is asked who it belongs to.
 *
 * <p>Either way the backend reads the account from the token's `sub` claim, so nothing here
 * knows or stores an account id.
 *
 * <p>The distinction the rest of the app cares about is `no-profile`: a valid token whose
 * account has no profile row behind it. That happens between registering and creating the
 * profile, and after an account is deleted, and it needs a different screen from "signed out" -
 * one that offers to create the profile rather than asking who you are again.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ApiError, readToken, writeToken } from "./api";
import { isSessionMode, writeAuthMode } from "./authMode";
import { authApi } from "@/components/landing/auth/auth.api";
import { gatewayApi } from "@/components/landing/auth/gateway.api";
import { usersApi } from "@/components/profile/user.api";
import type { RegisterRequest } from "@/components/landing/auth/auth.types";
import type { CreateUserProfileRequest, UserView } from "@/components/profile/user.types";

type SessionStatus = "loading" | "signed-out" | "signed-in" | "no-profile";

type SessionValue = {
  status: SessionStatus;
  user: UserView | null;
  signUp: (credentials: RegisterRequest, profile: CreateUserProfileRequest) => Promise<void>;
  signOut: () => Promise<void>;
  /** Re-reads the profile after an edit, so the header and profile page stay in step. */
  refresh: () => Promise<void>;
};

const SessionContext = createContext<SessionValue | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<SessionStatus>("loading");
  const [user, setUser] = useState<UserView | null>(null);

  /**
   * Reads the profile, which is also how the session is tested.
   *
   * <p>`hasCredential` is asked rather than a token being passed in, because a signed-in browser has
   * nothing to pass: the credential is a cookie this code cannot read. All it can do is ask the
   * gateway, and a 401 from `/me` is the answer either way.
   */
  const load = useCallback(async (hasCredential: boolean) => {
    if (!hasCredential) {
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

  // Neither localStorage nor the cookie is readable while rendering on the server, so the first
  // paint is always "loading" and the real answer arrives on the client.
  //
  // The gateway is asked first when this browser is on the cookie path. Trying `/me` straight
  // out visitor would then get a 401 on every page load, and `request` treats a 401 as a session
  // ending - which would clear the mode and undo the choice before it was ever used.
  useEffect(() => {
    if (isSessionMode()) {
      void gatewayApi
        .session()
        .then((session) => load(session.authenticated))
        .catch(() => setStatus("signed-out"));
      return;
    }
    void load(readToken() !== null).catch(() => setStatus("signed-out"));
  }, [load]);

  const signUp = useCallback(
    async (credentials: RegisterRequest, profile: CreateUserProfileRequest) => {
      // Two steps, in this order. The login is created in Keycloak first and signed in, and
      // only then can the profile be created - the backend takes the owner from the token, so
      // there has to be a token before there can be a profile.
      const session = await authApi.register(credentials);
      writeAuthMode("token");
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

  /**
   * Whichever way they came in.
   *
   * <p>On the cookie path the gateway has to be told: the cookie is HttpOnly, so this code cannot clear
   * it, and the session lives in Redis where only the gateway can drop it. Forgetting the local
   * state alone would leave the next page load signed straight back in.
   */
  const signOut = useCallback(async () => {
    if (isSessionMode()) {
      await gatewayApi.logout();
      writeAuthMode("token");
    }
    writeToken(null);
    setUser(null);
    setStatus("signed-out");
  }, []);


  const refresh = useCallback(async () => {
    await load(isSessionMode() || readToken() !== null);
  }, [load]);

  const value = useMemo<SessionValue>(
    () => ({ status, user, signUp, signOut, refresh }),
    [status, user, signUp, signOut, refresh],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionValue {
  const value = useContext(SessionContext);
  if (!value) throw new Error("useSession must be used inside <SessionProvider>");
  return value;
}
