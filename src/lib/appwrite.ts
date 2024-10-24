import { Account, Client } from "node-appwrite";
import { env } from "./env.config";

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(env.endpoint)
    .setProject(env.projectId)
    .setKey(env.apiKey);

  return {
    get account() {
      return new Account(client);
    },
  };
}
