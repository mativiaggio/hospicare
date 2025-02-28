import { guests } from "@/database/schema";
import { InferSelectModel } from "drizzle-orm";

export type Guests = InferSelectModel<typeof guests>;

export interface GuestFormValues {
  admissionDate: Date;
  hospitalizationDate: Date | null;
  firstNames: string;
  lastNames: string;
  birthdate: Date;
  dni: number;
  country: string | null;
  state: string | null;
  city: string | null;
  zipCode: number | null;
  neighborhood: string | null;
  addressStreetName: string | null;
  addressStreetNumber: number | null;
  referringPerson: string | null;
  informationLevel: "TOTAL" | "PARTIAL" | "NONE" | null;
  religion:
    | "NONE"
    | "CATHOLIC"
    | "JEWISH"
    | "EVANGELICAL"
    | "MORMON"
    | "JEHOVAHS_WITNESS"
    | "OTHER"
    | null;
  funeralService: boolean | null;
  oncologicalDisease: boolean | null;
  tumor: string | null;
  metastasis: boolean | null;
  metastasisLocation: string | null;
  personalHistory: string | null;
  ecog: "ZERO" | "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE" | null;
  specificOncologicalTreatment:
    | "NONE"
    | "DEFINITIVE_SUSPENSION"
    | "NON_CONVENTIONAL"
    | null;
  surgery: string | null;
  radiotherapy: string | null;
  chemotherapy: string | null;
  hormonetherapy: string | null;
  opioidTreatment: boolean | null;
  opioidName: string | null;
  healthInsuranceNumber: string | null;
  familyComposition: string | null;
  familyDoctor: string | null;
  complementaryStudies: string | null;
  status: "ALIVE" | "PENDING" | "DEAD" | null;
  deathDate: Date | null;
  diseaseId: string | null;
  healthInsuranceId: string | null;
}
