import { env } from "@/env.config";
import { sessionMiddleware } from "@/lib/session-middlware";
import { Hono } from "hono";

const app = new Hono().get("/", sessionMiddleware, async (c) => {
  const database = c.get("databases");

  const social_security = await database.listDocuments(
    env.DATABASE_ID,
    env.SOCIAL_SECURITY_ID,
    []
  );

  return c.json({ social_security: social_security });
});

export default app;
