import { env } from "@/env.config";
import { epicrisisSchema } from "../schemas";
import { sessionMiddleware } from "@/lib/session-middlware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";

const app = new Hono()
  .get("/find-by-guest-id/:id", sessionMiddleware, async (c) => {
    const database = c.get("databases");
    const guestId = c.req.param("id");
    const epicrisis = await database.listDocuments(
      env.DATABASE_ID,
      env.EPICRISIS_ID,
      [Query.equal("guest_id", [guestId])]
    );

    return c.json({ epicrisis });
  })
  .post(
    "/new",
    sessionMiddleware,
    zValidator("json", epicrisisSchema),
    async (c) => {
      const database = c.get("databases");

      const data = c.req.valid("json");

      const epicrisis = await database.createDocument(
        env.DATABASE_ID,
        env.EPICRISIS_ID,
        ID.unique(),
        data
      );

      return c.json({ epicrisis: epicrisis });
    }
  );

export default app;
