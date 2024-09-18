import { z } from "zod";
import { checkPasswordComplexity } from "check-password-complexity";

export const signInSchema = z.object({
  email: z.string().trim().min(1).email(),
  password: z.string().trim().min(1),
});
export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = signInSchema
  .extend({
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"], // path of error
  })
  .refine(
    (data) => {
      const complexity = checkPasswordComplexity(data.password);
      return complexity.value === "strong" || complexity.value === "medium";
    },
    { message: "Password is not strong enough", path: ["password"] },
  );
export type SignUpSchema = z.infer<typeof signUpSchema>;
