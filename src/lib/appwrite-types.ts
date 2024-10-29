export interface SocialSecurity {
  name: string;
  private: boolean;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
}

export interface Doctor {
  name: string;
  phone_number: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
}

export interface CognitiveEvaluation {
  guest_id: string;
  fluctuating_course: boolean;
  attention_disturbance: boolean;
  disorganized_thinking: boolean;
  altered_consciousness_level: boolean;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
}

export interface PhysicalEvaluation {
  guest_id: string;
  heart_rate: number;
  blood_pressure: string;
  respiratory_rate: number;
  temperature: number;
  pain: number;
  tiredness: number;
  nausea: number;
  depression: number;
  anxiety: number;
  sleepiness: number;
  appetite: number;
  dyspnoea: number;
  difficulty_sleeping: number;
  well_being: number;
  mobility: "normal" | "w_assistance" | "wheelchair" | "non_ambulatory";
  mobility_cause: "disease_progression" | "neurological_lesion";
  hygiene: "independent" | "bed_dependent" | "bath_dependent";
  bath_transfer: "yes" | "w_assistance" | "no";
  oral_health:
    | "healthy"
    | "dry"
    | "painful"
    | "bleeding"
    | "mucositis"
    | "mycosis"
    | "prosthesis";
  swallowing:
    | "normal"
    | "mild_disorder"
    | "moderate_disorder"
    | "severe_disorder";
  nutrition: "eats_alone" | "w_assistance" | "no_intake" | "ng_tube";
  hydration: "normal" | "dehydrated";
  hydration_method: "oral" | "sc" | "iv";
  abdominal_status: "normal" | "distended" | "painful";
  urinary_functions: "normal" | "diaper" | "incontinence" | "urinary_catheter";
  urine_characteristics: "hematuric" | "coluric" | "w_sediment";
  bowel_function:
    | "normal"
    | "diaper"
    | "incontinence"
    | "constipation"
    | "diarrhea";
  stool_consistency: "normal" | "hard" | "w_blood";
  respiratory_system: "normal" | "respiratory_difficulty" | "dyspnea" | "cough";
  sputum_type: string;
  pressure_ulcers: "none" | "1" | "2" | "3" | "4";
  pressure_ulcers_location: string;
  skin_lesions: string;
  edema: boolean;
  edema_location: string;
  ostomies: boolean;
  ostomy_type: string;
  other_disorders: string;
  care_plan: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
}

export interface Guest {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];

  // Propiedades del huésped
  admission_date?: string;
  name?: string;
  age?: number;
  dni?: string;
  address?: string;
  phone?: string;
  contact_name?: string;
  contact_phone?: number;
  contact_email?: string;
  relation_with_guest?: string;
  referring_person?: string;
  information_level?: string;
  religion?: string;
  funeral_service?: boolean;
  tumor?: string;
  metastasis?: boolean;
  metastasis_location?: string;
  personal_history?: string;
  ecog?: string;
  specific_oncological_treatment?: string;
  surgery?: string;
  radiotherapy?: string;
  chemotherapy?: string;
  hemotherapy?: string;
  opioid_treatment?: boolean;
  opioid_name?: string | null;
  other_medications?: string;

  // Relaciones
  social_security?: SocialSecurity;
  doctors?: Doctor[]; // Asegúrate de que esto sea un array si la API lo devuelve así

  // Otros campos
  cognitive_evaluation?: CognitiveEvaluation;
  physical_evaluation?: PhysicalEvaluation[];
}

export interface GuestsApiResponse {
  guests: {
    documents: Guest[];
  };
}
