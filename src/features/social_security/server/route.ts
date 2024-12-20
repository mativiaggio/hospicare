import { env } from "@/env.config";
import { socialSecuritySchema } from "../schemas";
import { sessionMiddleware } from "@/lib/middlwares";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID } from "node-appwrite";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const database = c.get("databases");

    const social_security = await database.listDocuments(
      env.DATABASE_ID,
      env.SOCIAL_SECURITY_ID,
      []
    );

    return c.json({ social_security: social_security });
  })
  .post(
    "/new",
    sessionMiddleware,
    zValidator("json", socialSecuritySchema),
    async (c) => {
      const database = c.get("databases");

      const data = c.req.valid("json");

      const social_security = await database.createDocument(
        env.DATABASE_ID,
        env.SOCIAL_SECURITY_ID,
        ID.unique(),
        data
      );

      return c.json({ social_security: social_security });
    }
  );

export default app;
