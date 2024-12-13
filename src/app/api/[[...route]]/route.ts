import auth from "@/features/auth/server/route";
import guests from "@/features/guests/server/route";
import medications from "@/features/medications/server/route";
import social_security from "@/features/social_security/server/route";
import users from "@/features/users/server/route";
import tickets from "@/features/ticketing-system/server/route";
import { Hono } from "hono";
import { handle } from "hono/vercel";
const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/auth", auth)
  .route("/users", users)
  .route("/guests", guests)
  .route("/medications", medications)
  .route("/social_security", social_security)
  .route("/tickets", tickets);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
