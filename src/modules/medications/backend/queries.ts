"use server";
import { db } from "@/database";
import { medications } from "@/database/schema";
import { Medications } from "../types";
import { create as createNotifications } from "@/modules/notifications/backend/queries";
import { v4 } from "uuid";
import { auth } from "@clerk/nextjs/server";

export const getAll = async () => {
  try {
    return await db.select().from(medications);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const create = async (data: Medications) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("El usuario no existe");

    const record = await db.insert(medications).values({ ...data });

    if (!record) throw new Error("Ocurrió un error al cargar el medicamento");

    await createNotifications({
      id: v4(),
      notification: "Cargó un nuevo medicamento",
      clerkId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { status: 200, message: "Registro creado con éxito" };
  } catch (error) {
    console.log(error);
    return null;
  }
};
