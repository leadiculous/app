import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

/**
 * Returns the current user if they are authenticated.
 * Otherwise, redirects to the sign-in page. 
 * This is a server-side function.
 */
export async function getAuth() {
  const supabase = createClient();
  const {data: {user}, error} = await supabase.auth.getUser();
  
  if (error || !user) {
    return redirect("/auth/sign-in");
  }

  return user;
}
