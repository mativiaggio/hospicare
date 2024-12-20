import { z } from "zod";

export const socialSecuritySchema = z.object({
  name: z
    .string()
    .min(1, "Este campo es obligatorio")
    .max(100, "Máximo de caracteres excedido (100)"),
  private: z.boolean(),
});
