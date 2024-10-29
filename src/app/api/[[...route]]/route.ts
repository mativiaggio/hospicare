import auth from "@/features/auth/server/route";
import guests from "@/features/guests/server/route";
import users from "@/features/users/server/route";
import { Hono } from "hono";
import { handle } from "hono/vercel";
const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/auth", auth)
  .route("/users", users)
  .route("/guests", guests);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
