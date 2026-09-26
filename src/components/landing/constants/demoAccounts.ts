import type { DemoAccount } from "@/components/landing/types/demoAccounts";

/**
 * The accounts `V900__demo_data.sql` seeds, so one click lands on a populated dashboard.
 *
 * <p>Shared by the hero's chips and the sign-in dialog, which introduce the same three people in
 * more or fewer words. The ids are what the backend is asked for, so they have to match the seed.
 */
export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: "demo-mohit",
    firstName: "Mohit",
    fullName: "Mohit Soni",
    city: "Bengaluru",
    summary: "4 yrs · Asia/Kolkata",
    tint: "bg-brand-soft text-brand",
  },
  {
    id: "demo-sara",
    firstName: "Sara",
    fullName: "Sara Whitfield",
    city: "New York",
    summary: "7 yrs · America/New_York",
    tint: "bg-accent-soft text-accent",
  },
  {
    id: "demo-kenji",
    firstName: "Kenji",
    fullName: "Kenji Arai",
    city: "Sydney",
    summary: "Fresher · Australia/Sydney",
    tint: "bg-info-soft text-info",
  },
];
