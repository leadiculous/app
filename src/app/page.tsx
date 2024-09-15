import { UserButton } from "@/components/ui/supabase";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  // TODO: create a custom server function to fetch the user data.
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  // TODO: handle the case where the user is not logged in (avoid using `!`)?
  return (
    <div>
      <UserButton user={user.data.user!}></UserButton>
    </div>
  );
}
