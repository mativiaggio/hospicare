// Variables de entorno exportadas para la app
export const env = {
  // General
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || "",
  HOSTNAME: process.env.NEXT_PUBLIC_HOSTNAME || "",
  APP_TITLE:
    process.env.NEXT_PUBLIC_APP_TITLE || "Hospicare por Madre Teresa Hospice",
};
