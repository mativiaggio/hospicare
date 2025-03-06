"use server";
import { v4 } from "uuid";
import { db } from "@/database";
import { currentUser } from "@clerk/nextjs/server";
import { HealthInsurances } from "../types";
import { healthInsurances } from "@/database/schema";
import { create as createNotifications } from "@/modules/notifications/backend/queries";

export const getAll = async () => {
  try {
    return await db.select().from(healthInsurances);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const create = async (data: HealthInsurances) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("El usuario no existe");

    const record = await db.insert(healthInsurances).values({ ...data });

    if (!record) throw new Error("Ocurrió un error al cargar el seguro social");

    await createNotifications({
      id: v4(),
      notification: "Cargó un nuevo seguro social",
      clerkId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { status: 200, message: "Registro creado con éxito" };
  } catch (error) {
    console.log(error);
    return null;
  }
};
