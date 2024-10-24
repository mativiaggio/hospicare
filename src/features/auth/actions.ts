"use server";

import { env } from "@/lib/env.config";
import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";
import { AUTH_COOKIE } from "./constants";

export const getCurrent = async () => {
  try {
    const client = new Client()
      .setEndpoint(env.endpoint)
      .setProject(env.projectId);

    const session = await cookies().get(AUTH_COOKIE);

    if (!session) return null;

    client.setSession(session.value);
    const account = new Account(client);

    return await account.get();
  } catch (error) {
    console.error(error);
    return null;
  }
};
