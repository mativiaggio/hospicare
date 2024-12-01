import { env } from "@/env.config";
import { guestSchema } from "@/features/schemas";
import { sessionMiddleware } from "@/lib/session-middlware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID } from "node-appwrite";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const database = c.get("databases");

    const guests = await database.listDocuments(
      env.DATABASE_ID,
      env.GUESTS_ID,
      []
    );

    return c.json({ guests: guests });
  })
  .post(
    "/new",
    sessionMiddleware,
    zValidator("json", guestSchema),
    async (c) => {
      const database = c.get("databases");

      const data = c.req.valid("json");

      const guest = await database.createDocument(
        env.DATABASE_ID,
        env.GUESTS_ID,
        ID.unique(),
        data
      );

      return c.json({ guest: guest });
    }
  );

export default app;
