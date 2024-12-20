import { z } from "zod";

export const staffSchema = z.object({
  name: z
    .string()
    .min(1, "Este campo es obligatorio")
    .max(100, "Máximo de caracteres excedido (100)"),
  email: z
    .string()
    .email({ message: "Es obligatorio ingresar un email válido" }),
  phone_number: z.string().min(1, "Este campo es obligatorio").optional(),
  role: z.enum([
    "volunteer",
    "administrative",
    "nurse",
    "psychologist",
    "doctor",
  ]),
  dni: z.coerce.number(),
});
