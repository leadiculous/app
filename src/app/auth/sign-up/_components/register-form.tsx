"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { signUpAction } from "../../actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/lib/schemas/auth";
import { Alert } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { checkPasswordComplexity } from "check-password-complexity";

export function RegisterForm() {
  const router = useRouter();
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    signUpAction,
    zodResolver(signUpSchema),
    {
      actionProps: {
        onSuccess: () => router.replace("/auth/sign-up?complete=true"),
      },
      formProps: {
        defaultValues: {
          email: "",
          password: "",
          confirmPassword: "",
        },
      },
    },
  );
  const password = form.watch("password");
  const passwordComplexity = checkPasswordComplexity(password).value;

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmitWithAction}>
            <div className="grid gap-4">
              {action.result.serverError && (
                <Alert variant="destructive">{action.result.serverError}</Alert>
              )}
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="lead.finder@example.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {password.trim().length > 0 && (
                <div className="grid gap-2">
                  <div
                    className={cn("border-l-2 p-2", {
                      "border-red-500":
                        passwordComplexity === "tooWeak" ||
                        passwordComplexity === "weak",
                      "border-orange-500": passwordComplexity === "medium",
                      "border-green-500": passwordComplexity === "strong",
                    })}
                  >
                    <p className="font-semibold">Password Strength</p>
                    <span className="text-sm">
                      {passwordComplexity === "tooWeak" && "Too weak"}
                      {passwordComplexity === "weak" && "Weak"}
                      {passwordComplexity === "medium" && "Medium"}
                      {passwordComplexity === "strong" && "Strong"}
                    </span>
                  </div>
                </div>
              )}
              <Button
                type="submit"
                className="w-full"
                isLoading={action.isExecuting}
              >
                Create an account
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/sign-in" className="underline">
                Sign in
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
