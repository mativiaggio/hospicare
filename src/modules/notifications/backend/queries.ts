"use server";

import { db } from "@/database";
import { notifications } from "@/database/schema";
import { Notifications } from "../types";
import { desc } from "drizzle-orm";

export const getAll = async () => {
  try {
    return await db
      .select()
      .from(notifications)
      .orderBy(desc(notifications.createdAt))
      .limit(20);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const create = async (data: Notifications) => {
  try {
    const record = await db.insert(notifications).values({ ...data });

    if (!record) throw new Error("Ocurrió un error al cargar la notificación");

    return { status: 200, message: "Registro creado con éxito" };
  } catch (error) {
    console.log(error);
    return null;
  }
};
