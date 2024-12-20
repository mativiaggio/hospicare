import { env } from "@/env.config";
import { Guest } from "@/lib/appwrite-types";
import { sessionMiddleware } from "@/lib/middlwares";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { guestSchema } from "../schemas";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const database = c.get("databases");

    const guests = await database.listDocuments(
      env.DATABASE_ID,
      env.GUESTS_ID,
      [Query.orderDesc("$createdAt")]
    );

    return c.json({ guests: guests });
  })
  .get("/find-by-id/:id", sessionMiddleware, async (c) => {
    const database = c.get("databases");
    const guestId = c.req.param("id");
    const guest: Guest = await database.getDocument(
      env.DATABASE_ID,
      env.GUESTS_ID,
      guestId
    );

    return c.json({ guest });
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
  )
  .put(
    "/update/:id",
    sessionMiddleware,
    zValidator("json", guestSchema),
    async (c) => {
      const database = c.get("databases");
      const guestId = c.req.param("id");
      const data = c.req.valid("json");

      if (!guestId) {
        return c.json({ success: false, message: "Guest ID is required" }, 400);
      }

      const guestData = { ...data };

      const guest = await database.updateDocument(
        env.DATABASE_ID,
        env.GUESTS_ID,
        guestId,
        guestData
      );

      return c.json({ guest });
    }
  );

export default app;
