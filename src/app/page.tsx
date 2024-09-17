import { UserButton } from "@/components/ui/supabase";
import { getAuth } from "@/server/auth";

export default async function Home() {
  const user = await getAuth();

  return (
    <div>
      <UserButton user={user}></UserButton>
    </div>
  );
}
