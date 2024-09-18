"use server";

import { signInSchema } from "@/lib/schemas/auth";
import { createClient } from "@/lib/supabase/server";
import { actionClient } from "@/lib/type-safe-action";
import { returnValidationErrors } from "next-safe-action";

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
