import { z } from "zod";

export const epicrisisSchema = z.object({
  $id: z.string().optional(),
  guest_id: z.string(),
  guests: z.string().optional(),
  medical_emergency: z.enum(["no", "yes"]).optional(),
  home_hospitalization: z.enum(["no", "yes"]).optional(),
  home_nursing: z.enum(["no", "yes"]).optional(),
  home_nursing_frequency: z.string().optional(),
  home_doctor: z.enum(["no", "yes"]).optional(),
  home_doctor_frequency: z.string().optional(),
  palliative_care_assistance: z.enum(["no", "yes"]).optional(),
  hospitalization_reason: z
    .enum([
      "no_caregivers",
      "family_claudication",
      "high_demand_for_nursing_care",
    ])
    .optional(),
  uncontrolled_symptoms: z
    .enum(["pain", "dyspnoea", "delirium"])
    .nullable()
    .optional(),
  other_uncontrolled_symptoms: z.string().optional(),
  interconsultations: z.enum(["no", "yes"]).optional(),
  interconsultation_specialist: z.string().optional(),
  opioid_demo: z.string().optional(),
  opioid_method: z.enum(["oral", "sc", "iv"]).optional(),
  sedation: z.enum(["no", "yes"]).optional(),
  sedation_medication: z.string().optional(),
  delirium: z.enum(["no", "yes"]).optional(),
  dyspnoea: z.enum(["no", "yes"]).optional(),
  pain: z.enum(["no", "yes"]).optional(),
  suffering: z.enum(["no", "yes"]).optional(),
  family_care: z.enum(["no", "yes"]).optional(),
  family_meeting: z.enum(["no", "yes"]).optional(),
  meeting_medic: z.enum(["no", "yes"]).optional(),
  meeting_psychologist: z.enum(["no", "yes"]).optional(),
  meeting_social_worker: z.enum(["no", "yes"]).optional(),
  meeting_nurse: z.enum(["no", "yes"]).optional(),
  meeting_other: z.string().optional(),
  multifamily_meetings: z.enum(["no", "yes"]).optional(),
  spiritual_assistance: z.enum(["no", "yes"]).optional(),
  spiritual_assistance_type: z
    .enum([
      "priest",
      "deacon",
      "minister_of_faith",
      "volunteer",
      "therapeutic_team",
    ])
    .nullable()
    .optional(),
  psychological_assistance: z.enum(["no", "yes"]).optional(),
  previous_psychopathological_history: z
    .enum(["no", "yes", "unknown"])
    .optional(),
  adaptation_difficulties: z.enum(["no", "yes"]).optional(),
  comments: z.string().optional(),
  medic_in_charge: z.string().optional(),
  psychologist_in_charge: z.string().optional(),
  communication: z.string().optional(),
  guest_name: z.string().optional(),
  guest_social_security_name: z.string().optional(),
  guest_address: z.string().optional(),
  guest_tumor: z.string().optional(),
  guest_metastasis_location: z.string().optional(),
  guest_hospitalization_date: z.preprocess(
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
  guest_date_of_death: z.preprocess(
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
  guest_hospitalization_days: z.coerce.number().optional().default(0),
  guest_hydration_method: z.enum(["oral", "sc", "iv", ""]).optional(),
  guest_opioid_name: z.string().optional(),
});
