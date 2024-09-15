import { Button } from "@/components/ui/button";
import { FormMessage, type Message } from "@/components/ui/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { encodedRedirect } from "@/lib/encode-redirect";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// TODO: create fully custom components for the auth pages (sign-in, sign-up, forgot-password, reset-password, etc.).
// TODO: move the custom auth pages outside of the dashboard layout (create 2 separate layouts: one for 'public' pages (auth) and one for 'protected' pages (dashboard)).

async function signInAction(formData: FormData) {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/");
}

export default function Login({ searchParams }: { searchParams: Message }) {
  return (
    <form className="flex min-w-64 flex-1 flex-col">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        No account?{" "}
        <Link
          className="font-medium text-foreground underline"
          href="/auth/sign-up"
        >
          Sign up
        </Link>
      </p>
      <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/auth/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <Button formAction={signInAction}>Sign in</Button>
        {/* TODO: the component is broken; fix retrieval of 'searchParams' or implement this differently */}
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
