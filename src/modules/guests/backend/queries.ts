"use server";
import { db } from "@/database";
import { guests } from "@/database/schema";
import { Guests } from "../types";
import { create as createNotifications } from "@/modules/notifications/backend/queries";
import { v4 } from "uuid";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const getAll = async () => {
  try {
    return await db.select().from(guests);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const findById = async (guestId: string) => {
  try {
    return (
      await db.select().from(guests).where(eq(guests.id, guestId)).limit(1)
    )[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const create = async (data: Guests) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("El usuario no existe");

    const record = await db.insert(guests).values({ ...data });

    if (!record) throw new Error("Ocurrió un error al cargar el huésped");

    await createNotifications({
      id: v4(),
      notification: "Cargó un nuevo huésped",
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

export const update = async (data: Guests) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("El usuario no existe");

    const record = await db
      .update(guests)
      .set(data)
      .where(eq(guests.id, data.id));

    if (!record) throw new Error("Ocurrió un error al actualizar el huésped");

    await createNotifications({
      id: v4(),
      notification: `Actualizó el huésped ${data.firstName} ${data.lastName}`,
      clerkId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { status: 200, message: "Registro actualizado con éxito" };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteGuest = async (guest : Guests) => {
  try {
    const user = await currentUser()

    if (!user) throw new Error("El usuario no existe");

    await db.delete(guests).where(eq(guests.id, guest.id));

    await createNotifications({
      id: v4(),
      notification: `Eliminó el huésped ${guest.firstName} ${guest.lastName}`,
      clerkId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { status: 200, message: "Registro eliminado con éxito" };

  } catch (error) {
    console.log(error);
    return null
  }
}