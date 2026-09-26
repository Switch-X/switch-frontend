/** One of the seeded accounts, with the two ways the page introduces it. */
export type DemoAccount = {
  /** The `iamUserId` - must match the seed exactly. */
  id: string;
  /** For the hero's chips, where there is room for one word. */
  firstName: string;
  /** For the sign-in dialog. */
  fullName: string;
  city: string;
  /** Experience and zone, for the sign-in dialog. */
  summary: string;
  /** Avatar colours. */
  tint: string;
};
