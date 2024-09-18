import { z } from "zod";
import { checkPasswordComplexity } from "check-password-complexity";

const baseSchema = z.object({
  email: z.string().trim().min(1).email(),
  password: z.string().trim().min(1),
  confirmPassword: z.string().trim().min(1),
});

export const signInSchema = baseSchema.pick({ email: true, password: true });
export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = baseSchema
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      const complexity = checkPasswordComplexity(data.password);
      return complexity.value === "strong" || complexity.value === "medium";
    },
    { message: "Password is not strong enough", path: ["password"] },
  );
export type SignUpSchema = z.infer<typeof signUpSchema>;

export const forgotPasswordSchema = signInSchema.pick({ email: true });
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = baseSchema
  .pick({
    password: true,
    confirmPassword: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      const complexity = checkPasswordComplexity(data.password);
      return complexity.value === "strong" || complexity.value === "medium";
    },
    { message: "Password is not strong enough", path: ["password"] },
  );
