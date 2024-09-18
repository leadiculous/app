"use server";

import {
  forgotPasswordSchema,
  signInSchema,
  signUpSchema,
} from "@/lib/schemas/auth";
import { createClient } from "@/lib/supabase/server";
import { actionClient, PublicError } from "@/lib/type-safe-action";
import { returnValidationErrors } from "next-safe-action";
import { headers } from "next/headers";

export const signInAction = actionClient
  .schema(signInSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      returnValidationErrors(signInSchema, {
        email: {
          _errors: [error.message],
        },
      });
    }
  });

export const signUpAction = actionClient
  .schema(signUpSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = createClient();
    const origin = headers().get("origin");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin ?? ""}/auth/callback`,
      },
    });

    if (error) {
      throw new PublicError(`[${error.code}] ${error.message}`);
    }
  });

export const forgotPasswordAction = actionClient
  .schema(forgotPasswordSchema)
  .action(async ({ parsedInput: { email } }) => {
    const supabase = createClient();
    const origin = headers().get("origin");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/callback?redirect_to=/auth/reset-password`,
    });

    if (error) {
      throw new PublicError(`[${error.code}] ${error.message}`);
    }
  });
