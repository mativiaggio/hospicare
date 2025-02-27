import { notifications } from "@/database/schema";
import { InferSelectModel } from "drizzle-orm";

export type Notifications = InferSelectModel<typeof notifications>;
