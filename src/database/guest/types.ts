import { z } from "zod";

export const guestSchema = z.object({
  admissionDate: z.preprocess(
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
  streetName: z
    .string()
    .max(100, "La dirección es demasiado larga")
    .optional()
    .nullable(),
  streetNumber: z.coerce
    .number()
    .max(99999999, "El número es inválido")
    .optional()
    .nullable(),
  province: z
    .string()
    .max(100, "La provincia es demasiado larga")
    .optional()
    .nullable(),
  city: z
    .string()
    .max(100, "La ciudad es demasiado larga")
    .optional()
    .nullable(),
  zipCode: z.coerce
    .number()
    .max(100000, "El código postal es inválido")
    .optional()
    .nullable(),
  socialSecurityId: z.string().optional().nullable(),
  socialSecurityNumber: z
    .string()
    .max(50, "Máximo de caracteres excedido (50)")
    .optional()
    .nullable(),
  contactName: z
    .string()
    .min(1, "Este campo es obligatorio")
    .max(100, "Máximo de caracteres excedido (100)"),
  contactPhone: z.string().min(1, "Este campo es obligatorio"),
  contactEmail: z.string().optional().nullable(),
  relationWithGuest: z
    .string()
    .max(512, "Máximo de caracteres excedido (512)")
    .optional()
    .nullable(),
  referringPerson: z
    .string()
    .max(100, "Máximo de caracteres excedido (100)")
    .optional()
    .nullable(),
  informationLevel: z.enum(["TOTAL", "PARTIAL", "NONE"]).optional().nullable(),
  religion: z
    .enum([
      "NONE",
      "CATHOLIC",
      "JEWISH",
      "EVANGELICAL",
      "MORMON",
      "JEHOVAHS_WITNESS",
      "OTHER",
    ])
    .optional()
    .nullable(),
  funeralService: z.boolean(),
  tumor: z
    .string()
    .max(128, "Máximo de caracteres excedido (128)")
    .optional()
    .nullable(),
  metastasis: z.boolean(),
  metastasisLocation: z
    .string()
    .max(128, "Máximo de caracteres excedido (128)")
    .optional()
    .nullable(),
  personalHistory: z
    .string()
    .max(512, "Máximo de caracteres excedido (512)")
    .optional()
    .nullable(),
  ecog: z
    .enum(["ZERO", "ONE", "TWO", "THREE", "FOUR", "FIVE"])
    .optional()
    .nullable(),
  specificOncologicalTreatment: z
    .enum(["NONE", "DEFINITIVE_SUSPENSION", "NON_CONVENTIONAL"])
    .optional()
    .nullable(),
  surgery: z
    .string()
    .max(128, "Máximo de caracteres excedido (128)")
    .optional()
    .nullable(),
  radiotherapy: z
    .string()
    .max(128, "Máximo de caracteres excedido (128)")
    .optional()
    .nullable(),
  chemotherapy: z
    .string()
    .max(128, "Máximo de caracteres excedido (128)")
    .optional()
    .nullable(),
  hormonetherapy: z
    .string()
    .max(128, "Máximo de caracteres excedido (128)")
    .optional()
    .nullable(),
  opioidTreatment: z.boolean(),
  opioidName: z
    .string()
    .max(32, "Máximo de caracteres excedido (32)")
    .optional()
    .nullable(),
  otherMedications: z
    .string()
    .max(128, "Máximo de caracteres excedido (128)")
    .optional()
    .nullable(),
  fluctuatingCourse: z.boolean().optional().nullable().default(false),
  attentionDisturbance: z.boolean().optional().nullable().default(false),
  disorganizedThinking: z.boolean().optional().nullable().default(false),
  alteredConsciousnessLevel: z.boolean().optional().nullable().default(false),
  heartRate: z.coerce.number().optional().nullable(),
  bloodPressureSystolic: z.coerce.number().optional().nullable(),
  bloodPressureDiastolic: z.coerce.number().optional().nullable(),
  respiratoryRate: z.coerce.number().optional().nullable(),
  temperature: z.coerce.number().optional().nullable(),
  pain: z.coerce.number().optional().nullable().default(0),
  tiredness: z.coerce.number().optional().nullable().default(0),
  nausea: z.coerce.number().optional().nullable().default(0),
  depression: z.coerce.number().optional().nullable().default(0),
  anxiety: z.coerce.number().optional().nullable().default(0),
  sleepiness: z.coerce.number().optional().nullable().default(0),
  appetite: z.coerce.number().optional().nullable().default(0),
  dyspnoea: z.coerce.number().optional().nullable().default(0),
  difficultySleeping: z.coerce.number().optional().nullable().default(0),
  wellBeing: z.coerce.number().optional().nullable().default(0),
  mobility: z
    .enum(["NORMAL", "W_ASSISTANCE", "WHEELCHAIR", "NON_AMBULATORY"])
    .optional()
    .nullable(),
  mobilityCause: z
    .enum(["DISEASE_PROGRESSION", "NEUROLOGICAL_LESION"])
    .optional()
    .nullable(),
  hygiene: z
    .enum(["INDEPENDENT", "BED_DEPENDENT", "BATH_DEPENDENT"])
    .optional()
    .nullable(),
  bathTransfer: z.enum(["YES", "W_ASSISTANCE", "NO"]).optional().nullable(),
  oralHealth: z
    .enum([
      "HEALTHY",
      "DRY",
      "PAINFUL",
      "BLEEDING",
      "MUCOSITIS",
      "MYCOSIS",
      "PROSTHESIS",
    ])
    .optional()
    .nullable(),
  swallowing: z
    .enum(["NORMAL", "MILD_DISORDER", "MODERATE_DISORDER", "SEVERE_DISORDER"])
    .optional()
    .nullable(),
  nutrition: z
    .enum(["EATS_ALONE", "W_ASSISTANCE", "NO_INTAKE", "NG_TUBE"])
    .optional()
    .nullable(),
  hydration: z.enum(["NORMAL", "DEHYDRATED"]).optional().nullable(),
  hydrationMethod: z.enum(["ORAL", "SC", "IV"]).optional().nullable(),
  abdominalStatus: z
    .enum(["NORMAL", "DISTENDED", "PAINFUL"])
    .optional()
    .nullable(),
  urinaryFunctions: z
    .enum(["NORMAL", "DIAPER", "INCONTINENCE", "URINARY_CATHETER"])
    .optional()
    .nullable(),
  urineCharacteristics: z
    .enum(["HEMATURIC", "COLURIC", "W_SEDIMENT"])
    .optional()
    .nullable(),
  bowelFunction: z
    .enum(["NORMAL", "DIAPER", "INCONTINENCE", "CONSTIPATION", "DIARRHEA"])
    .optional()
    .nullable(),
  stoolConsistency: z.enum(["NORMAL", "HARD", "W_BLOOD"]).optional().nullable(),
  respiratorySystem: z
    .enum(["NORMAL", "RESPIRATORY_DIFFICULTY", "DYSPNEA", "COUGH"])
    .optional()
    .nullable(),
  sputumType: z.string().optional().nullable(),
  pressureUlcers: z
    .enum(["NONE", "ONE", "TWO", "THREE", "FOUR"])
    .optional()
    .nullable(),
  pressureUlcersLocation: z.string().optional().nullable(),
  skinLesions: z.string().optional().nullable(),
  edema: z.boolean().optional().nullable().default(false),
  edemaLocation: z.string().optional().nullable(),
  ostomies: z.boolean().optional().nullable().default(false),
  ostomyType: z.string().optional().nullable(),
  otherDisorders: z.string().optional().nullable(),
  carePlan: z.string().optional().nullable(),
  status: z.enum(["ALIVE", "PENDING", "DEAD"]),
  hospitalizationDate: z.preprocess(
    (val) => (val ? new Date(val as string) : null),
    z.date().optional().nullable().nullable()
  ),
  dateOfDeath: z.preprocess(
    (val) => (val ? new Date(val as string) : null),
    z.date().optional().nullable().nullable()
  ),
  createdAt: z.preprocess(
    (val) => (val ? new Date(val as string) : null),
    z.date()
  ),
  updatedAt: z.preprocess(
    (val) => (val ? new Date(val as string) : null),
    z.date()
  ),
});
