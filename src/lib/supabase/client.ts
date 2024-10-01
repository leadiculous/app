import { env } from "@/env";
import { createBrowserClient } from "@supabase/ssr";
import { type Database } from "./types";

const browserClient = createBrowserClient<Database>(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export function createClient() {
  return browserClient;
}
