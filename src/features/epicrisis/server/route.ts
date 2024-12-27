import { env } from "@/env.config";
import { epicrisisSchema } from "../schemas";
import { sessionMiddleware } from "@/lib/middlwares";
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
  )
  .put(
    "/update/:id",
    sessionMiddleware,
    zValidator("json", epicrisisSchema),
    async (c) => {
      const database = c.get("databases");
      const epicrisisId = c.req.param("id");
      const data = c.req.valid("json");

      if (!epicrisisId) {
        return c.json({ success: false, message: "Guest ID is required" }, 400);
      }

      const epicrisisData = { ...data };

      const epicrisis = await database.updateDocument(
        env.DATABASE_ID,
        env.EPICRISIS_ID,
        epicrisisId,
        epicrisisData
      );

      return c.json({ epicrisis });
    }
  );

export default app;
