"use client";

/**
 * Who is signed in, for the whole app.
 *
 * <p>One way in. The gateway runs the authorization-code flow, keeps the tokens, and leaves this
 * browser an HttpOnly cookie - so there is nothing here to read, and the gateway is asked who it
 * belongs to. Registering is not a second way in: it creates the login and then sends the
 * browser down the same road as everybody else.
 *
 * <p>Either way the backend reads the account from the token's `sub` claim, so nothing here
 * knows or stores an account id.
 *
 * <p>The distinction the rest of the app cares about is `no-profile`: a good session whose
 * account has no profile row behind it. That is where every new account starts - Keycloak made
 * the login, nothing has made the profile - and where an account lands again after its profile
 * is deleted. It needs a different screen from "signed out": one that finishes the job rather
 * than asking who you are again.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ApiError } from "./api";
import { gatewayApi } from "@/components/landing/auth/gateway.api";
import { usersApi } from "@/components/profile/user.api";
import type { UserView } from "@/components/profile/user.types";

type SessionStatus = "loading" | "signed-out" | "signed-in" | "no-profile";

type SessionValue = {
  status: SessionStatus;
  user: UserView | null;
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
  const load = useCallback(async (hasSession: boolean) => {
    if (!hasSession) {
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
        // Every new account passes through here: Keycloak has made the login and sent them
        // back, and the profile is the half it did not ask for. `NoProfileScreen` collects it.
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
    void gatewayApi
      .session()
      .then((session) => load(session.authenticated))
      .catch(() => setStatus("signed-out"));
  }, [load]);

  /**
   * The gateway has to be told.
   *
   * <p>The cookie is HttpOnly, so this code cannot clear it, and the session lives in Redis
   * where only the gateway can drop it. Forgetting the local state alone would leave the next
   * page load signed straight back in.
   */
  const signOut = useCallback(async () => {
    await gatewayApi.logout();
    setUser(null);
    setStatus("signed-out");
  }, []);


  const refresh = useCallback(async () => {
    await load(true);
  }, [load]);

  const value = useMemo<SessionValue>(
    () => ({ status, user, signOut, refresh }),
    [status, user, signOut, refresh],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionValue {
  const value = useContext(SessionContext);
  if (!value) throw new Error("useSession must be used inside <SessionProvider>");
  return value;
}
