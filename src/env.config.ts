// Variables de entorno exportadas para la app
export const env = {
  // App URL
  PUBLIC_URL: process.env.NEXT_PUBLIC_APP_URL || "",

  // Información del proyecto
  PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  API_KEY: process.env.NEXT_API_KEY || "",
  ENDPOINT: process.env.NEXT_PUBLIC_ENDPOINT || "",

  // IDs de la base de datos
  DATABASE_ID: process.env.NEXT_PUBLIC_DATABASE_ID || "",
  USERS_ID: process.env.NEXT_PUBLIC_USERS_ID || "",
  GUESTS_ID: process.env.NEXT_PUBLIC_GUESTS_ID || "",
  SOCIAL_SECURITY_ID: process.env.NEXT_PUBLIC_SOCIAL_SECURITY_ID || "",
  DOCTORS_ID: process.env.NEXT_PUBLIC_DOCTORS_ID || "",
  COGNITIVE_EVALUATION_ID:
    process.env.NEXT_PUBLIC_COGNITIVE_EVALUATION_ID || "",
  PHYSICAL_EVALUATION_ID: process.env.NEXT_PUBLIC_PHYSICAL_EVALUATION_ID || "",
  MEDICATIONS_ID: process.env.NEXT_PUBLIC_MEDICATIONS_ID || "",
  TICKETS_ID: process.env.NEXT_PUBLIC_TICKETS_ID || "",
  STAFF_ID: process.env.NEXT_PUBLIC_STAFF_ID || "",
  EPICRISIS_ID: process.env.NEXT_PUBLIC_EPICRISIS_ID || "",
  SECRETS_ID: process.env.NEXT_PUBLIC_SECRETS_ID || "",

  // Configuración del almacenamiento (buckets)
  IMAGES_BUCKET_ID: process.env.NEXT_PUBLIC_IMAGES_BUCKET_ID || "",

  // General
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || "",
  HOSTNAME: process.env.NEXT_PUBLIC_HOSTNAME || "",
  APP_TITLE:
    process.env.NEXT_PUBLIC_APP_TITLE || "Hospicare por Madre Teresa Hospice",
};
