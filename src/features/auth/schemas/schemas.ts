import { z } from "zod";

export const PasswordRecoverySchema = z.object({
  email: z.string().min(1, "Este campo es obligatorio"),
});

export const PasswordResetSchema = z.object({
  user_id: z.string().min(1, "Este campo es obligatorio"),
  secret: z.string().min(1, "Este campo es obligatorio"),
  password: z.string().min(1, "Este campo es obligatorio"),
  confirmPassword: z.string().min(1, "Este campo es obligatorio"),
});
