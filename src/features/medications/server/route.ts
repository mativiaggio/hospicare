import { env } from "@/env.config";
import { sessionMiddleware } from "@/lib/session-middlware";
import { Hono } from "hono";

const app = new Hono().get("/", sessionMiddleware, async (c) => {
  const database = c.get("databases");

  const medications = await database.listDocuments(
    env.DATABASE_ID,
    env.MEDICATIONS_ID,
    []
  );

  return c.json({ medications: medications });
});

export default app;
