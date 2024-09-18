import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

/**
 * Returns the current user if they are authenticated.
 * Otherwise, redirects to the sign-in page.
 */
export async function mustsGetAuth() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return redirect("/auth/sign-in");
  }

  return user;
}

/**
 * Returns the authentication state.
 */
export async function getAuth() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return { user, error };
}
