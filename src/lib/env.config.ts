// Variables de entorno exportadas para la app
export const env = {
  // Clerk
  CLERK_SIGNIN_SECRET: process.env.CLERK_SIGNIN_SECRET || "",

  // General
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || "",
  HOSTNAME: process.env.NEXT_PUBLIC_HOSTNAME || "",
  APP_TITLE:
    process.env.NEXT_PUBLIC_APP_TITLE || "Hospicare por Madre Teresa Hospice",

  // Database Development
  DATABASE_URL: process.env.DATABASE_URL || "",
};
