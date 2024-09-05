import { z } from "zod";

/**
 * A string that can be optional and completely empty OR required and have an length of at least 1 real character.
 */
export const optionalString = () =>
  z
    .union([z.string().trim().min(1), z.string().length(0)])
    .optional()
    .transform((v) => (v === "" ? undefined : v));
