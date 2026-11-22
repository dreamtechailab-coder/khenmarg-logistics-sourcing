import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Public, browser-safe settings. Env vars override the defaults but are not required.
// The publishable key can only do what Row Level Security allows: the public may insert
// enquiries; only users listed in public.admin_users may read them or change their status.
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://uutzmfbdhkxmwisnkqhp.supabase.co";
export const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_IQhx_lEOWszUYmC2Aai11g_frCWCuKj";

let client: SupabaseClient | null = null;

/** Lazily created browser client (with auth session persistence) for the admin dashboard. */
export function getSupabase(): SupabaseClient {
  if (!client) client = createClient(SUPABASE_URL, SUPABASE_KEY);
  return client;
}

export type Submission = {
  id: string;
  created_at: string;
  name: string;
  company: string | null;
  email: string;
  phone: string;
  country: string | null;
  enquiry_type: string;
  service: string | null;
  products: string | null;
  quantity: string | null;
  message: string | null;
  page_url: string | null;
  email_notified: boolean | null;
  status: "new" | "contacted" | "closed";
};
