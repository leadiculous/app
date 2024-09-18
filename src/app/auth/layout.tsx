import { Logo } from "@/components/ui/logo";
import { env } from "@/env";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-screen place-items-center p-4">
      <div>
        <Logo as="h2" className="mb-10 text-center text-4xl">
          {env.NEXT_PUBLIC_APP_NAME}
        </Logo>
        {children}
      </div>
    </div>
  );
}
  