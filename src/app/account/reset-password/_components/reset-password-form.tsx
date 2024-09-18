"use client";

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
import { resetPasswordAction } from "../../../auth/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/lib/schemas/auth";
import { Alert } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordComplexityMeter } from "../../../auth/_components/password-complexity-meter";

export function ResetPasswordForm() {
  const router = useRouter();
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    resetPasswordAction,
    zodResolver(resetPasswordSchema),
    {
      actionProps: {
        onSuccess: () => router.replace("/auth/sign-in?reset=true"),
      },
      formProps: {
        defaultValues: {
          password: "",
          confirmPassword: "",
        },
      },
    },
  );
  const password = form.watch("password");

  return (
    <div className="grid h-screen place-items-center p-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Reset password</CardTitle>
          <CardDescription>
            Please enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmitWithAction}>
              <div className="grid gap-4">
                {action.result.serverError && (
                  <Alert variant="destructive">
                    {action.result.serverError}
                  </Alert>
                )}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
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
                  <PasswordComplexityMeter password={password} />
                )}
                <Button
                  type="submit"
                  className="w-full"
                  isLoading={action.isExecuting}
                >
                  Reset password
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
