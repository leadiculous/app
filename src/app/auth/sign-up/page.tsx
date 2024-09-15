import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FormMessage, type Message } from "@/components/ui/form-message";
import { encodedRedirect } from "@/lib/encode-redirect";
import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";

async function signUpAction(formData: FormData) {
  "use server";

  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
}

export default function SignUp({ searchParams }: { searchParams: Message }) {
  if ("message" in searchParams) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center gap-2 p-4 sm:max-w-md">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <form className="mx-auto flex min-w-64 max-w-64 flex-col">
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text text-sm text-foreground">
          Already have an account?{" "}
          <Link
            className="font-medium text-primary underline"
            href="/auth/sign-in"
          >
            Sign in
          </Link>
        </p>
        <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
          />
          <Button formAction={signUpAction}>Sign up</Button>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  );
}
