import { z } from "zod";

// export const loginSchema = z.object({
//   email: z.string().email(),
//   password: z.string(),
// });

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Campo obligatorio").email(),
  password: z.string().min(1, "Ingresa la contraseña"),
});

export const registerSchema = z.object({
  email: z.string().trim().min(1, "Campo obligatorio").email(),
  password: z.string().min(1, "Ingresa la contraseña"),
  name: z.string().trim().min(1, "Campo obligatorio"),
});

export const userSchema = z.object({
  email: z.string().trim().min(1, "Campo obligatorio").email(),
  password: z.string().min(1, "Ingresa la contraseña"),
  name: z.string().trim().min(1, "Campo obligatorio"),
  birthdate: z.date().nullable().optional(),
});

export const userUpdatePassword = z.object({
  currentPassword: z.string().min(1, "Ingresa la contraseña actual"),
  newPassword: z.string().min(1, "Ingresa la nueva contraseña"),
  confirmPassword: z.string().min(1, "Ingresa la nueva contraseña nuevamente"),
});
