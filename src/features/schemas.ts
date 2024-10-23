import { z } from "zod";

// export const loginSchema = z.object({
//   email: z.string().email(),
//   password: z.string(),
// });

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Campo obligatorio").email(),
  password: z.string().min(1, "Ingresa la contraseña"),
});
