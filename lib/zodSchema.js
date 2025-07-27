import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  handle: z.string().min(3, "Handle must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .refine((val) => /[A-Z]/.test(val), {
      message: "Must include at least one uppercase letter",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Must include at least one lowercase letter",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Must include at least one number",
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: "Must include at least one special character",
    }),
});
