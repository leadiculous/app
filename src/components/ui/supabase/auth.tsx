import { type User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "../button";

export const signOutAction = async () => {
  "use server";
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export type UserButtonProps = { user: User };

// TODO: finish implementing this (make it similar to clerk's 'UserButton'; a profile icon that opens a dropdown with info and buttons on click) and add to header.
export function UserButton({ user }: UserButtonProps) {
  return (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"}>
          Sign out
        </Button>
      </form>
    </div>
  );
}
