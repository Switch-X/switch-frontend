/**
 * The signed-in account's own profile and reminder settings.
 *
 * <p>Every call here is about whoever the access token names - there is no endpoint for reading
 * somebody else, which is why none of them takes an id.
 */

import { request } from "@/lib/api";
import type { NewId } from "@/lib/types";
import type {
  CreateUserProfileRequest,
  DeleteAccountRequest,
  NotificationPreferencesDto,
  UpdateUserProfileRequest,
  UserView,
} from "./user.types";

export const usersApi = {
  /** Creates the profile for whoever the token names. Registering comes first - see `signUp`. */
  create: (body: CreateUserProfileRequest) => request<NewId>("POST", "/v1/users", { body }),
  me: () => request<UserView>("GET", "/v1/users/me"),
  /**
   * A PATCH: send only the fields that changed. A field left out keeps its stored value, and one
   * sent as `null` is cleared - so `Partial`, not the whole payload `create` takes.
   */
  update: (body: Partial<UpdateUserProfileRequest>) =>
    request<void>("PATCH", "/v1/users/me", { body }),
  /**
   * A PATCH: send only the fields that changed. A field left out keeps its stored value, and one
   * sent as `null` is cleared - so `Partial`, not the whole payload `create` takes.
   */
  updatePreferences: (body: Partial<NotificationPreferencesDto>) =>
    request<void>("PATCH", "/v1/users/me/notification-preferences", { body }),
  /**
   * Deletes the account, and records why if they said.
   *
   * The body is optional on the backend too - nobody is made to explain themselves before they
   * can leave.
   */
  remove: (body?: DeleteAccountRequest) => request<void>("DELETE", "/v1/users/me", { body }),
};
