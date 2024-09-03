import { ThemedClerkComponent } from "@/components/ui/clerk";
import { UserProfile } from "@clerk/nextjs";

export default function MyUserProfile() {
  return (
    <ThemedClerkComponent>
      <UserProfile />
    </ThemedClerkComponent>
  );
}
