import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// GUESTS
export const mobilityEnum = pgEnum("mobility", [
  "NORMAL",
  "W_ASSISTANCE",
  "WHEELCHAIR",
  "NON_AMBULATORY",
]);
export const mobilityCauseEnum = pgEnum("mobility_cause", [
  "DISEASE_PROGRESSION",
  "NEUROLOGICAL_LESION",
]);
export const hygieneEnum = pgEnum("hygiene", [
  "INDEPENDENT",
  "BED_DEPENDENT",
  "BATH_DEPENDENT",
]);
export const bathTransferEnum = pgEnum("bath_transfer", [
  "YES",
  "W_ASSISTANCE",
  "NO",
]);
export const oralHealthEnum = pgEnum("oral_health", [
  "HEALTHY",
  "DRY",
  "PAINFUL",
  "BLEEDING",
  "MUCOSITIS",
  "MYCOSIS",
  "PROSTHESIS",
]);
export const swallowingEnum = pgEnum("swallowing", [
  "NORMAL",
  "MILD_DISORDER",
  "MODERATE_DISORDER",
  "SEVERE_DISORDER",
]);
export const nutritionEnum = pgEnum("nutrition", [
  "EATS_ALONE",
  "W_ASSISTANCE",
  "NO_INTAKE",
  "NG_TUBE",
]);
export const hydrationEnum = pgEnum("hydration", ["NORMAL", "DEHYDRATED"]);
export const hydrationMethodEnum = pgEnum("hydration_method", [
  "ORAL",
  "SC",
  "IV",
]);
export const abdominalStatusEnum = pgEnum("abdominal_status", [
  "NORMAL",
  "DISTENDED",
  "PAINFUL",
]);
export const urinaryFunctionsEnum = pgEnum("urinary_functions", [
  "NORMAL",
  "DIAPER",
  "INCONTINENCE",
  "URINARY_CATHETER",
]);
export const urineCharacteristicsEnum = pgEnum("urine_characteristics", [
  "HEMATURIC",
  "COLURIC",
  "W_SEDIMENT",
]);
export const bowelFunctionEnum = pgEnum("bowel_function", [
  "NORMAL",
  "DIAPER",
  "INCONTINENCE",
  "CONSTIPATION",
  "DIARRHEA",
]);
export const stoolConsistencyEnum = pgEnum("stool_consistency", [
  "NORMAL",
  "HARD",
  "W_BLOOD",
]);
export const respiratorySystemEnum = pgEnum("respiratory_system", [
  "NORMAL",
  "RESPIRATORY_DIFFICULTY",
  "DYSPNEA",
  "COUGH",
]);
export const pressureUlcersEnum = pgEnum("pressure_ulcers", [
  "NONE",
  "ONE",
  "TWO",
  "THREE",
  "FOUR",
]);
export const religionEnum = pgEnum("religion", [
  "NONE",
  "CATHOLIC",
  "JEWISH",
  "EVANGELICAL",
  "MORMON",
  "JEHOVAHS_WITNESS",
  "OTHER",
]);
export const informationLevelEnum = pgEnum("information_level", [
  "TOTAL",
  "PARTIAL",
  "NONE",
]);
export const ecogEnum = pgEnum("ecog", [
  "ZERO",
  "ONE",
  "TWO",
  "THREE",
  "FOUR",
  "FIVE",
]);
export const specificOncologicalTreatmentEnum = pgEnum(
  "specific_oncological_treatment",
  ["NONE", "DEFINITIVE_SUSPENSION", "NON_CONVENTIONAL"]
);
export const statusEnum = pgEnum("status", ["ALIVE", "PENDING", "DEAD"]);
export const opioidMethodEnum = pgEnum("opioid_method", ["ORAL", "SC", "IV"]);
export const roleEnum = pgEnum("role", [
  "VOLUNTEER",
  "ADMINISTRATIVE",
  "NURSE",
  "PSYCHOLOGIST",
  "DOCTOR",
]);
export const ticketStatusEnum = pgEnum("ticket_status", [
  "OPEN",
  "IN_PROGRESS",
  "SOLVED",
  "CLOSED",
  "UNDER_REVIEW",
]);
export const yesNoEnum = pgEnum("yes_no", ["YES", "NO"]);
export const routeOfAdministrationEnum = pgEnum("route_of_administration", [
  "ORAL",
  "INTRAVENOUS",
]);
export const hospitalizationReasonEnum = pgEnum("hospitalization_reason", [
  "NO_CAREGIVERS",
  "FAMILY_CLAUDICATION",
  "HIGH_DEMAND_FOR_NURSING_CARE",
]);
export const uncontrolledSymptomsEnum = pgEnum("uncontrolled_symptoms", [
  "PAIN",
  "DYSPNOEA",
  "DELIRIUM",
]);
export const spiritualAssistanceTypeEnum = pgEnum("spiritual_assistance_type", [
  "PRIEST",
  "DEACON",
  "MINISTER_OF_FAITH",
  "VOLUNTEER",
  "THERAPEUTIC_TEAM",
]);
export const previousPsychopathologicalHistoryEnum = pgEnum(
  "previous_psychopathological_history",
  ["NO", "YES", "UNKNOWN"]
);

export const guests = pgTable("guests", {
  id: uuid("id").primaryKey().defaultRandom(),
  admissionDate: timestamp("admission_date").notNull(),
  hospitalizationDate: timestamp("hospitalization_date"),
  firstNames: text("first_names").notNull(),
  lastNames: text("last_names").notNull(),
  birthdate: timestamp("birthdate").notNull(),
  dni: integer("dni").notNull().unique(),
  country: text("country"),
  state: text("state"),
  city: text("city"),
  zipCode: integer("zip_code"),
  neighborhood: text("neighborhood"),
  addressStreetName: text("address_street_name"),
  addressStreetNumber: integer("address_street_number"),
  referringPerson: text("referring_person"),
  informationLevel: informationLevelEnum("information_level").default("TOTAL"),
  religion: religionEnum("religion").default("CATHOLIC"),
  funeralService: boolean("funeral_service").default(false),
  oncologicalDisease: boolean("oncological_disease").default(false),
  tumor: text("disease"),
  metastasis: boolean("metastasis").default(false),
  metastasisLocation: text("metastasis_location"),
  personalHistory: text("personal_history"),
  ecog: ecogEnum("ecog").default("ONE"),
  specificOncologicalTreatment: specificOncologicalTreatmentEnum(
    "specific_oncological_treatment"
  ).default("NONE"),
  surgery: text("surgery"),
  radiotherapy: text("radiotherapy"),
  chemotherapy: text("chemotherapy"),
  hormonetherapy: text("hormonetherapy"),
  opioidTreatment: boolean("opioid_treatment").default(false),
  opioidName: text("opioid_name"),
  healthInsuranceNumber: text("health_insurance_number"),
  familyComposition: text("family_composition"),
  familyDoctor: text("family_doctor"),
  // otherMedications: text("other_medications"), // Para esto esta la tabla de medicamentos...
  complementaryStudies: text("complementary_studies"),
  status: statusEnum("status").default("ALIVE"),
  deathDate: timestamp("death_date"),

  diseaseId: uuid("disease_id").references(() => diseases.id, {
    onDelete: "cascade",
  }),
  healthInsuranceId: uuid("health_insurance_id").references(
    () => healthInsurances.id,
    {
      onDelete: "cascade",
    }
  ),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// GUESTS MEDICATIONS RELATION
export const guestsMedications = pgTable(
  "guests_medications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    guestId: uuid("guest_id")
      .references(() => guests.id, { onDelete: "cascade" })
      .notNull(),
    medicationId: uuid("medication_id")
      .references(() => medications.id, { onDelete: "cascade" })
      .notNull(),
    dosage: text("dosage"),
    frequency: text("frequency"),
    startDate: timestamp("start_date"),
    endDate: timestamp("end_date"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    index("guests_medications_guest_id_idx").on(t.guestId),
    index("guests_medications_medication_id_idx").on(t.medicationId),
  ]
);

// GUESTS CONTACTS RELATION
export const guestsContacts = pgTable(
  "guests_contacts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    guestId: uuid("guest_id")
      .references(() => guests.id, { onDelete: "cascade" })
      .notNull(),
    contactId: uuid("contact_id")
      .references(() => contacts.id, { onDelete: "cascade" })
      .notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    index("guests_contacts_guest_id_idx").on(t.guestId),
    index("guests_contacts_contact_id_idx").on(t.contactId),
  ]
);

// CONTACTS
export const contacts = pgTable("contacts", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstNames: text("first_names").notNull(),
  lastNames: text("last_names").notNull(),
  email: text("email"),
  phone: text("phone"),
  bondWithGuest: text("bond_with_guest"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// DISEASES
export const diseases = pgTable(
  "diseases",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [index("diseases_name_id_idx").on(t.name)]
);

// MEDICATIONS
export const routeOfAdministration = pgEnum("route_of_administration", [
  "ORAL",
  "INTRAVENOUS",
]);

export const medications = pgTable("medications", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  manufacterer: text("manufacterer"),
  routeOfAdministration: routeOfAdministration(
    "route_of_administration"
  ).default(sql`NULL`),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// HEALTH INSURANCE
export const healthInsurances = pgTable("health_insurances", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  private: boolean("private").default(false),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// COGNITIVE EVALUATION
export const cognitiveEvaluation = pgTable(
  "cognifive_evaluation",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    guestId: uuid("guest_id")
      .references(() => guests.id, { onDelete: "cascade" })
      .notNull(),
    fluctuatingCourse: boolean("fluctuating_course").default(false),
    attentionDisturbance: boolean("attention_disturbance").default(false),
    disorganizedThinking: boolean("disorganized_thinking").default(false),
    alteredConsciousnessLevel: boolean("altered_consciousness_level").default(
      false
    ),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [index("cognifive_evaluation_guest_id_idx").on(t.guestId)]
);

// PHYSICAL EVALUATION
export const physicalEvaluation = pgTable(
  "physical_evaluation",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    guestId: uuid("guest_id")
      .references(() => guests.id, { onDelete: "cascade" })
      .notNull(),
    heartRate: integer("heart_rate"),
    bloodPressureSystolic: integer("blood_pressure_systolic"),
    bloodPressureDiastolic: integer("blood_pressure_diastolic"),
    respiratoryRate: integer("respiratory_rate"),
    temperature: real("temperature"),
    pain: integer("pain"),
    tiredness: integer("tiredness"),
    nausea: integer("nausea"),
    depression: integer("depression"),
    anxiety: integer("anxiety"),
    sleepiness: integer("sleepiness"),
    appetite: integer("appetite"),
    dyspnoea: integer("dyspnoea"),
    difficultySleeping: integer("difficulty_sleeping"),
    wellBeing: integer("well_being"),
    mobility: mobilityEnum("mobility").default("NORMAL"),
    mobilityCause: mobilityCauseEnum("mobility_cause").default(sql`NULL`),
    hygiene: hygieneEnum("hygiene").default("INDEPENDENT"),
    bathTransfer: bathTransferEnum("bath_transfer").default("NO"),
    mouthHealthy: boolean("mouth_healthy").default(false),
    mouthDry: boolean("mouth_dry").default(false),
    mouthPainful: boolean("mouth_painful").default(false),
    mouthBleeding: boolean("mouth_bleeding").default(false),
    mouthMucositis: boolean("mouth_mucositis").default(false),
    mouthMycosis: boolean("mouth_mycosis").default(false),
    mouthProsthesis: boolean("mouth_prosthesis").default(false),
    swallowing: swallowingEnum("swallowing").default("NORMAL"),
    nutrition: nutritionEnum("nutrition").default("EATS_ALONE"),
    hydration: hydrationEnum("hydration").default("NORMAL"),
    hydrationMethod: hydrationMethodEnum("hydration_method").default("ORAL"),
    abdominalStatus: abdominalStatusEnum("abdominal_status").default("NORMAL"),
    urinaryFunctions:
      urinaryFunctionsEnum("urinary_functions").default("NORMAL"),
    urineHematuric: boolean("urine_hematuric").default(false),
    urineColuric: boolean("urine_coluric").default(false),
    urineWSediment: boolean("urine_w_sediment").default(false),
    bowelNormal: boolean("bowel_normal").default(false),
    bowelDiaper: boolean("bowel_diaper").default(false),
    bowelIncontinence: boolean("bowel_incontinence").default(false),
    bowelConstipation: boolean("bowel_constipation").default(false),
    bowelDiarrhea: boolean("bowel_diarrhea").default(false),
    stoolNormal: boolean("stool_normal").default(false),
    stoolHard: boolean("stool_hard").default(false),
    stoolWBlood: boolean("stool_w_blood").default(false),
    respiratorySystemNormal: boolean("respiratory_system_normal").default(
      false
    ),
    respiratorySystemDifficulty: boolean(
      "respiratory_system_difficulty"
    ).default(false),
    respiratorySystemDyspnea: boolean("respiratory_system_dyspnea").default(
      false
    ),
    respiratorySystemCough: boolean("respiratory_system_cough").default(false),
    expectorationType: text("expectoration_type"),
    pressureUlcers: pressureUlcersEnum("pressure_ulcers").default("NONE"),
    pressureUlcersLocation: text("pressure_ulcers_location"),
    skinLesions: text("skin_lesion"),
    edema: boolean("edema").default(false),
    edemaLocation: text("edema_location"),
    ostomies: boolean("ostomies").default(false),
    ostomyType: text("ostomy_type"),
    otherDisorders: text("other_disorders"),
    carePlan: text("care_plan"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [index("physical_evaluation_guest_id_idx").on(t.guestId)]
);

// USERS
export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkId: text("clerk_id"),
    firstNames: text("first_names").notNull(),
    lastNames: text("last_names").notNull(),
    email: text("email").unique(),
    imageUrl: text("image_url"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [index("users_clerk_id_idx").on(t.clerkId)]
);

// NOTIFICATIONS
export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    notification: text("notification").notNull(),
    clerkId: text("clerk_id").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [index("notification_clerk_id_idx").on(t.clerkId)]
);
