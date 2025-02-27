"use server";
import { db } from "@/database";
import { users } from "@/database/schema";
import { env } from "@/lib/env.config";
import { clerkClient } from "@clerk/nextjs/server";

export const getAll = async () => {
  try {
    return await db.select().from(users);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const sendInvitation = async (email: string) => {
  try {
    const client = await clerkClient();

    if (!env.HOSTNAME) {
      throw new Error("La variable NEXT_PUBLIC_URL no está definida.");
    }

    await client.invitations.createInvitation({
      emailAddress: email,
      redirectUrl: env.HOSTNAME + "/crear-cuenta",
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
      return null;
    }
  }

  return { status: 200, message: "Invitación enviada con éxito" };
};
