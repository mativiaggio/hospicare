"use server";

import { db } from "@/database/db";
import { Guest } from "@prisma/client";

export const updateGuestDetails = async (
  guestId: string,
  guestDetails: Partial<Guest>
) => {
  const response = await db.guest.update({
    where: { id: guestId },
    data: {
      ...guestDetails,
    },
  });

  return response;
};

export const deleteGuest = async (guestId: string) => {
  const response = await db.$transaction(async (tx) => {
    return tx.guest.delete({
      where: { id: guestId },
    });
  });

  return response;
};

export const deleteGuests = async (guestId: string[]) => {
  try {
    Promise.all(
      guestId.map(async (id) => {
        const response = await db.$transaction(async (tx) => {
          return tx.guest.delete({
            where: { id: id },
          });
        });
        return response;
      })
    );
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error al eliminar huespedes.");
  }
};

export const upsertGuest = async (guest: Guest) => {
  console.log("submit");
  if (!guest.dni) return null;

  console.log(guest);

  try {
    // Realizar el upsert de la agencia
    const guestDetails = await db.guest.upsert({
      where: { id: guest.id },
      update: { ...guest },
      create: {
        ...guest,
      },
    });

    return guestDetails;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error : any) {
    console.log("Error en upsertGuest:", error.stack);
    throw error;
  }
};
