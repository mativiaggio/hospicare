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

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const DummyTableData: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "j4fh3k9o",
    amount: 558,
    status: "success",
    email: "bennett.alan@yahoo.com",
  },
  {
    id: "x2p7qw8y",
    amount: 132,
    status: "processing",
    email: "julio65@gmail.com",
  },
  {
    id: "9k0tfg5h",
    amount: 300,
    status: "failed",
    email: "mary.jane@hotmail.com",
  },
  {
    id: "yr7tgj4m",
    amount: 665,
    status: "success",
    email: "leila99@outlook.com",
  },
  {
    id: "v5lr8p3s",
    amount: 456,
    status: "processing",
    email: "esteban98@gmail.com",
  },
  {
    id: "2qn9rk6w",
    amount: 903,
    status: "success",
    email: "rodrigo@hotmail.com",
  },
  {
    id: "u7xzqh8e",
    amount: 215,
    status: "success",
    email: "marina23@yahoo.com",
  },
  {
    id: "z5fwk8c3",
    amount: 788,
    status: "failed",
    email: "carla56@outlook.com",
  },
  {
    id: "j8l2pg9k",
    amount: 540,
    status: "success",
    email: "frank.smith@gmail.com",
  },
  {
    id: "d1fq8z4v",
    amount: 421,
    status: "processing",
    email: "sara.jane@hotmail.com",
  },
  {
    id: "k9j4nt8b",
    amount: 399,
    status: "success",
    email: "julia56@gmail.com",
  },
  {
    id: "o4j7w9e2",
    amount: 629,
    status: "failed",
    email: "diego_lopez@gmail.com",
  },
  {
    id: "g7qk3x8v",
    amount: 291,
    status: "success",
    email: "alberto32@yahoo.com",
  },
  {
    id: "n4lf2v6d",
    amount: 753,
    status: "processing",
    email: "laura.martinez@gmail.com",
  },
  {
    id: "q1fz8b5w",
    amount: 416,
    status: "success",
    email: "felipe_gonzalez@hotmail.com",
  },
];
