import { medications } from "@/database/schema";
import { InferSelectModel } from "drizzle-orm";

export type Medications = InferSelectModel<typeof medications>;

export interface MedicationFormValues {
  name: string;
  manufacterer: string;
  routeOfAdministration: "ORAL" | "INTRAVENOUS";
}
