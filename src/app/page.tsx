import { UserButton } from "@/components/ui/supabase";
import { mustsGetAuth } from "@/server/auth";

export default async function Home() {
  const user = await mustsGetAuth();

  return (
    <div>
      <UserButton user={user}></UserButton>
    </div>
  );
}
