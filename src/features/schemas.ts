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

export const guestSchema = z.object({
  admission_date: z.preprocess(
    (val) => (val instanceof Date ? val : new Date(val as string)),
    z.date().refine((val) => !isNaN(val.getTime()), {
      message: "La fecha de admisión es obligatoria",
    })
  ),
  birthdate: z.preprocess(
    (val) => (val instanceof Date ? val : new Date(val as string)),
    z.date().refine((val) => !isNaN(val.getTime()), {
      message: "La fecha de nacimiento es obligatoria",
    })
  ),
  name: z.string().min(1, "Name is required"),
  dni: z.string().min(1, "DNI is required"),
  address: z.string().optional(),
  contact_name: z.string().optional(),
  contact_phone: z.string().optional(),
  contact_email: z.string().email().optional(),
  relation_with_guest: z.string().optional(),
  referring_person: z.string().optional(),
  information_level: z.enum(["total", "partial", "none"]),
  religion: z.string().optional(),
  funeral_service: z.boolean(),
  tumor: z.string().optional(),
  metastasis: z.boolean(),
  metastasis_location: z.string().optional(),
  personal_history: z.string().optional(),
  ecog: z.enum(["0", "1", "2", "3", "4"]),
  specific_oncological_treatment: z.string().optional(),
  surgery: z.string().optional(),
  radiotherapy: z.string().optional(),
  chemotherapy: z.string().optional(),
  hemotherapy: z.string().optional(),
  opioid_treatment: z.boolean(),
  opioid_name: z.string().optional(),
  other_medications: z.string().optional(),
  status: z.string(),
  social_security: z.string().optional(), // Ajustar si es un objeto o referencia en el modelo de datos
  doctors: z.string().optional(), // Ajustar si es una lista o un tipo específico en el modelo
  cognitive_evaluation: z.string().optional(), // Ajustar según referencia o tipo de objeto
  physical_evaluation: z.string().optional(), // Ajustar según referencia o tipo de objeto
  medications: z.string().optional(), // Ajustar si es una referencia o tipo de objeto
});

export const ticketSchema = z.object({
  title: z.string().trim().min(1, "Campo obligatorio"),
  description: z.string().min(1, "Campo obligatorio"),
  solution: z.string().optional(),
  status: z.string().optional(),
});
