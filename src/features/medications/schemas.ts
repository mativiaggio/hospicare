import { z } from "zod";

export const medicationSchema = z.object({
  name: z
    .string()
    .min(1, "Este campo es obligatorio")
    .max(100, "Máximo de caracteres excedido (100)"),
  manufacturer: z
    .string()
    .min(1, "Este campo es obligatorio")
    .max(64, "Máximo de caracteres excedido (64)"),
  route_of_administration: z.enum(["oral", "intravenous"]),
});
