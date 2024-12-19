import { env } from "@/env.config";
import { staffSchema } from "../schemas";
import { Staff } from "@/lib/appwrite-types";
import { sessionMiddleware } from "@/lib/session-middlware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID } from "node-appwrite";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const database = c.get("databases");

    const staff = await database.listDocuments(
      env.DATABASE_ID,
      env.STAFF_ID,
      []
    );

    return c.json({ staff: staff });
  })
  .get("/find-by-id/:id", sessionMiddleware, async (c) => {
    const database = c.get("databases");
    const staffId = c.req.param("id");
    const staff: Staff = await database.getDocument(
      env.DATABASE_ID,
      env.STAFF_ID,
      staffId
    );

    return c.json({ staff });
  })
  .put(
    "/update/:id",
    sessionMiddleware,
    zValidator("json", staffSchema),
    async (c) => {
      const database = c.get("databases");
      const staffId = c.req.param("id");
      const data = c.req.valid("json");

      if (!staffId) {
        return c.json({ success: false, message: "Staff ID is required" }, 400);
      }

      const staffData = { ...data };

      const staff = await database.updateDocument(
        env.DATABASE_ID,
        env.STAFF_ID,
        staffId,
        staffData
      );

      return c.json({ staff });
    }
  )
  .post(
    "/new",
    sessionMiddleware,
    zValidator("json", staffSchema),
    async (c) => {
      const database = c.get("databases");

      const data = c.req.valid("json");

      const staff = await database.createDocument(
        env.DATABASE_ID,
        env.STAFF_ID,
        ID.unique(),
        data
      );

      return c.json({ staff: staff });
    }
  );

export default app;
