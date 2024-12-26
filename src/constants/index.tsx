import { HardHat, Home, Hospital, Lock, PillBottle, ShieldCheck, User, Users } from "lucide-react";

export const AdminSettingLinks = [
  {
    label: "Admin",
    href: `/configuracion/admin`,
    icon: (
      <ShieldCheck className="h-6 w-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
];

export const SettingLinks = [
  {
    label: "Datos personales",
    href: `/configuracion/datos-personales`,
    icon: (
      <User className="h-6 w-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Seguridad",
    href: `/configuracion/seguridad`,
    icon: (
      <Lock className="h-6 w-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
];

export const MainLinks = [
  {
    label: "Inicio",
    href: `/`,
    icon: (
      <Home className="h-6 w-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Huéspedes",
    href: `/huespedes`,
    icon: (
      <Users className="h-6 w-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Personal",
    href: `/huespedes`,
    icon: (
      <HardHat className="h-6 w-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Medicamentos",
    href: `/medicamentos`,
    icon: (
      <PillBottle className="h-6 w-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Obras Sociales",
    href: `/obras-sociales`,
    icon: (
      <Hospital className="h-6 w-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
];

