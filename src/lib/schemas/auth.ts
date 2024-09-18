import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
  confirmPassword: z.string().min(1),
});
export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = signUpSchema.pick({
  email: true,
  password: true,
});
export type SignInSchema = z.infer<typeof signInSchema>;
