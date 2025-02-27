import { healthInsurances } from "@/database/schema";
import { InferSelectModel } from "drizzle-orm";

export type HealthInsurances = InferSelectModel<typeof healthInsurances>;

export interface HealthInsuranceFormValues {
  name: string;
  private: boolean;
}
