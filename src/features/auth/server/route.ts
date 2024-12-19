// import { env } from "@/env.config";
import { loginSchema, registerSchema } from "@/features/schemas";
import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddleware } from "@/lib/session-middlware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";
import { ID } from "node-appwrite";
import { AUTH_COOKIE } from "../constants";
// import {
//   PasswordRecoverySchema,
//   PasswordResetSchema,
// } from "../schemas/schemas";

const app = new Hono()
  .post("/register", zValidator("json", registerSchema), async (c) => {
    const { email, password, name } = c.req.valid("json");

    const { account } = await createAdminClient();

    await account.create(ID.unique(), email, password, name);

    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      secure: true,
      sameSite: "Strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    return c.json({ success: true });
  })
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      secure: true,
      sameSite: "Strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    return c.json({ success: true });
  })
  .get("/current", sessionMiddleware, (c) => {
    const user = c.get("user");

    return c.json({ data: user });
  })
  .post("/logout", sessionMiddleware, async (c) => {
    const account = c.get("account");

    deleteCookie(c, AUTH_COOKIE);
    await account.deleteSession("current");

    return c.json({ success: true });
  });
  // .post(
  //   "/password-recovery",
  //   zValidator("json", PasswordRecoverySchema),
  //   async (c) => {
  //     const { email } = c.req.valid("json");

  //     const { account } = await createAdminClient();

  //     await account.createRecovery(email, `${env.HOSTNAME}/password-reset`);

  //     return c.json({ success: true });
  //   }
  // )
  // .post(
  //   "/password-reset",
  //   zValidator("json", PasswordResetSchema),
  //   async (c) => {
  //     try {
  //       const { user_id, secret, password } = c.req.valid("json");

  //       const { account } = await createAdminClient();

  //       await account.updateRecovery(user_id, secret, password);

  //       return c.json({ success: true });
  //     } catch (error) {
  //       return c.json(
  //         { success: false, message: (error as Error).message },
  //         500
  //       );
  //     }
  //   }
  // );

export default app;
