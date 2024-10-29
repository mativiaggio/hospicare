import { env } from "@/env.config";
import { sessionMiddleware } from "@/lib/session-middlware";
import { Hono } from "hono";

const app = new Hono().get("/", sessionMiddleware, async (c) => {
  const database = c.get("databases");

  const guests = await database.listDocuments(
    env.DATABASE_ID,
    env.GUESTS_ID,
    []
  );

  return c.json({ guests: guests });
});

export default app;
