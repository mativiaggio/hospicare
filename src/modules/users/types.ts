import { users } from "@/database/schema";
import { InferSelectModel } from "drizzle-orm";

export type Users = InferSelectModel<typeof users>;
