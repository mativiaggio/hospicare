import {
  BellDot,
  BookUser,
  Hospital,
  Inbox,
  Layout,
  PillBottle,
  Settings,
  Users2,
} from "lucide-react";

// Menu items.
export const navbarItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Layout,
  },
  {
    title: "Huéspedes",
    url: "/huespedes",
    icon: Users2,
  },
  {
    title: "Equipo",
    url: "/equipo",
    icon: BookUser,
  },
  {
    title: "Medicamentos",
    url: "/medicamentos",
    icon: PillBottle,
  },
  {
    title: "Seguridad social",
    url: "/seguridad-social",
    icon: Hospital,
  },
  {
    title: "Mensajes",
    url: "/mensajes",
    icon: Inbox,
  },
  {
    title: "Notificaciones",
    url: "/notifications",
    icon: BellDot,
  },
  {
    title: "Configuración",
    url: "/configuracion",
    icon: Settings,
  },
];
