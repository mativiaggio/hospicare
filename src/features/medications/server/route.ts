import { env } from "@/env.config";
import { medicationSchema } from "../schemas";
import { Medications } from "@/lib/appwrite-types";
import { sessionMiddleware } from "@/lib/middlwares";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID } from "node-appwrite";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const database = c.get("databases");

    const medications = await database.listDocuments(
      env.DATABASE_ID,
      env.MEDICATIONS_ID,
      []
    );

    return c.json({ medications: medications });
  })
  .get("/find-by-id/:id", sessionMiddleware, async (c) => {
    const database = c.get("databases");
    const medicationId = c.req.param("id");
    const medication: Medications = await database.getDocument(
      env.DATABASE_ID,
      env.MEDICATIONS_ID,
      medicationId
    );

    return c.json({ medication });
  })
  .post(
    "/new",
    sessionMiddleware,
    zValidator("json", medicationSchema),
    async (c) => {
      const database = c.get("databases");

      const data = c.req.valid("json");

      const medication = await database.createDocument(
        env.DATABASE_ID,
        env.MEDICATIONS_ID,
        ID.unique(),
        data
      );

      return c.json({ medication: medication });
    }
  )
  .put(
    "/update/:id",
    sessionMiddleware,
    zValidator("json", medicationSchema),
    async (c) => {
      const database = c.get("databases");
      const medicationId = c.req.param("id");
      const data = c.req.valid("json");

      if (!medicationId) {
        return c.json(
          { success: false, message: "Medication ID is required" },
          400
        );
      }

      const medicationData = { ...data };

      const medication = await database.updateDocument(
        env.DATABASE_ID,
        env.MEDICATIONS_ID,
        medicationId,
        medicationData
      );

      return c.json({ medication });
    }
  )
  .delete("/delete/:id", sessionMiddleware, async (c) => {
    const database = c.get("databases");
    const medicationId = c.req.param("id");

    if (!medicationId) {
      return c.json(
        { success: false, message: "Medication ID is required" },
        400
      );
    }

    const response = await database.deleteDocument(
      env.DATABASE_ID,
      env.MEDICATIONS_ID,
      medicationId
    );

    return c.json({ response });
  });

export default app;
