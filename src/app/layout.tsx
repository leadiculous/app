import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Dashboard } from "@/components/dashboard";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider, SignedIn, SignedOut } from "@/components/ui/supabase";
import { getAuth } from "@/server/auth";
import { env } from "@/env";

export const metadata: Metadata = {
  title: env.NEXT_PUBLIC_APP_NAME,
  description: "Stupid simple lead finder for your business.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = await getAuth();

  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      {/* Regarding 'suppressHydrationWarning', see: https://github.com/pacocoursey/next-themes/issues/169 */}
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider user={user}>
            <SignedIn>
              <Dashboard>{children}</Dashboard>
            </SignedIn>
            <SignedOut>{children}</SignedOut>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
