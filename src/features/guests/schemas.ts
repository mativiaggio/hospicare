import { z } from "zod";

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
  name: z
    .string()
    .min(1, "Este campo es obligatorio")
    .max(100, "Máximo de caracteres excedido (100)"),
  lastname: z
    .string()
    .min(1, "Este campo es obligatorio")
    .max(100, "Máximo de caracteres excedido (100)"),
  dni: z.coerce.number().max(99999999, "El DNI es inválido"),
  street_name: z
    .string()
    .max(100, "La dirección es demasiado larga")
    .optional(),
  street_number: z.coerce
    .number()
    .max(99999999, "El número es inválido")
    .optional(),
  province: z.string().max(100, "La provioncia es demasiado larga").optional(),
  city: z.string().max(100, "La cuidad es demasiado larga").optional(),
  zip_code: z.coerce.number().max(100000, "El DNI es inválido").optional(),
  contact_name: z
    .string()
    .min(1, "Este campo es obligatorio")
    .max(100, "Máximo de caracteres excedido (100)"),
  contact_phone: z.string().min(1, "Este campo es obligatorio").optional(),
  contact_email: z.string().optional().nullable(),
  relation_with_guest: z
    .string()
    .max(512, "Máximo de caracteres excedido (512)")
    .optional(),
  referring_person: z
    .string()
    .max(100, "Máximo de caracteres excedido (100)")
    .optional(),
  information_level: z.enum(["total", "partial", "none"]),
  religion: z.enum([
    "none",
    "catholic",
    "jewish",
    "evangelical",
    "mormon",
    "jehovahs_witness",
    "other",
  ]),
  funeral_service: z.boolean(),
  tumor: z.string().max(128, "Máximo de caracteres excedido (128)").optional(),
  metastasis: z.boolean(),
  metastasis_location: z
    .string()
    .max(128, "Máximo de caracteres excedido (128)")
    .optional(),
  personal_history: z
    .string()
    .max(512, "Máximo de caracteres excedido (512)")
    .optional(),
  ecog: z.enum(["0", "1", "2", "3", "4", "5"]),
  specific_oncological_treatment: z.enum([
    "none",
    "definitive_suspension",
    "non_conventional",
  ]),
  surgery: z
    .string()
    .max(128, "Máximo de caracteres excedido (128)")
    .optional(),
  radiotherapy: z
    .string()
    .max(128, "Máximo de caracteres excedido (128)")
    .optional(),
  chemotherapy: z
    .string()
    .max(128, "Máximo de caracteres excedido (128)")
    .optional(),
  hemotherapy: z
    .string()
    .max(128, "Máximo de caracteres excedido (128)")
    .optional(),
  opioid_treatment: z.boolean(),
  opioid_name: z
    .string()
    .max(32, "Máximo de caracteres excedido (32)")
    .optional(),
  other_medications: z
    .string()
    .max(128, "Máximo de caracteres excedido (128)")
    .optional(),
  status: z.enum(["alive", "pending", "dead"]),
  social_security: z.string().optional(),
  social_security_number: z
    .string()
    .max(50, "Máximo de caracteres excedido (50)")
    .optional(),
  doctors: z.string().optional(),
  fluctuating_course: z.boolean().optional(),
  attention_disturbance: z.boolean().optional(),
  disorganized_thinking: z.boolean().optional(),
  altered_consciousness_level: z.boolean().optional(),
  physical_evaluation: z.string().optional(),
  medications: z.string().optional(),
  heart_rate: z.coerce.number().optional().nullable(),
  blood_pressure_systolic: z.coerce.number().optional().nullable(),
  blood_pressure_diastolic: z.coerce.number().optional().nullable(),
  respiratory_rate: z.coerce.number().optional().nullable(),
  temperature: z.coerce.number().optional().nullable(),
  pain: z.coerce.number().optional().default(0),
  tiredness: z.coerce.number().optional().default(0),
  nausea: z.coerce.number().optional().default(0),
  depression: z.coerce.number().optional().default(0),
  anxiety: z.coerce.number().optional().default(0),
  sleepiness: z.coerce.number().optional().default(0),
  appetite: z.coerce.number().optional().default(0),
  dyspnoea: z.coerce.number().optional().default(0),
  difficulty_sleeping: z.coerce.number().optional().default(0),
  well_being: z.coerce.number().optional().default(0),
  mobility: z
    .enum(["normal", "w_assistance", "wheelchair", "non_ambulatory", ""])
    .optional(),
  mobility_cause: z
    .enum(["disease_progression", "neurological_lesion", ""])
    .optional(),
  hygiene: z
    .enum(["independent", "bed_dependent", "bath_dependent", ""])
    .optional(),
  bath_transfer: z.enum(["yes", "w_assistance", "no", ""]).optional(),
  oral_health: z
    .enum([
      "healthy",
      "dry",
      "painful",
      "bleeding",
      "mucositis",
      "mycosis",
      "prosthesis",
      "",
    ])
    .optional(),
  swallowing: z
    .enum([
      "normal",
      "mild_disorder",
      "moderate_disorder",
      "severe_disorder",
      "",
    ])
    .optional(),
  nutrition: z
    .enum(["eats_alone", "w_assistance", "no_intake", "ng_tube", ""])
    .optional(),
  hydration: z.enum(["normal", "dehydrated", ""]).optional(),
  hydration_method: z.enum(["oral", "sc", "iv", ""]).optional(),
  abdominal_status: z.enum(["normal", "distended", "painful", ""]).optional(),
  urinary_functions: z
    .enum(["normal", "diaper", "incontinence", "urinary_catheter", ""])
    .optional(),
  urine_characteristics: z
    .enum(["hematuric", "coluric", "w_sediment", ""])
    .optional(),
  bowel_function: z
    .enum(["normal", "diaper", "incontinence", "constipation", "diarrhea", ""])
    .optional(),
  stool_consistency: z
    .enum(["normal", "hard", "w_blood", ""])

    .optional(),
  respiratory_system: z
    .enum(["normal", "respiratory_difficulty", "dyspnea", "cough", ""])
    .optional(),
  sputum_type: z
    .string()
    .max(32, "Máximo de caracteres excedido (32)")
    .optional(),
  pressure_ulcers: z.enum(["none", "1", "2", "3", "4", ""]).optional(),
  pressure_ulcers_location: z
    .string()
    .max(64, "Máximo de caracteres excedido (64)")
    .optional(),
  skin_lesions: z
    .string()
    .max(64, "Máximo de caracteres excedido (64)")
    .optional(),
  edema: z.boolean().optional(),
  edema_location: z
    .string()
    .max(64, "Máximo de caracteres excedido (64)")
    .optional(),
  ostomies: z.boolean().optional(),
  ostomy_type: z
    .string()
    .max(32, "Máximo de caracteres excedido (32)")
    .optional(),
  other_disorders: z
    .string()
    .max(64, "Máximo de caracteres excedido (64)")
    .optional(),
  care_plan: z
    .string()
    .max(512, "Máximo de caracteres excedido (512)")
    .optional(),
  hospitalization_date: z.preprocess(
    (val) => {
      if (val === null || val === undefined) return null;
      return val instanceof Date ? val : new Date(val as string);
    },
    z
      .date()
      .nullable()
      .refine((val) => val === null || !isNaN(val.getTime()), {
        message: "La fecha de hospitalización debe ser una fecha válida o null",
      })
  ),
  date_of_death: z.preprocess(
    (val) => {
      if (val === null || val === undefined) return null;
      return val instanceof Date ? val : new Date(val as string);
    },
    z
      .date()
      .nullable()
      .refine((val) => val === null || !isNaN(val.getTime()), {
        message: "La fecha de fallecimiento debe ser una fecha válida o null",
      })
  ),
});
