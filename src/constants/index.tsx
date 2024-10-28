import { Lock, User } from "lucide-react";

export const SettingLinks = [
  {
    label: "Perfil",
    href: `/settings/profile`,
    icon: (
      <User className="h-6 w-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Seguridad",
    href: `/settings/security`,
    icon: (
      <Lock className="h-6 w-6 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
];
