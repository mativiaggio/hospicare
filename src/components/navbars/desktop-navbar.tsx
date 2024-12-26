"use client";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "../buttons/theme-toggle";
import { UserDropdown } from "../dropdowns/user-dropdown";
import { usePathname } from "next/navigation";

export const DesktopNavbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex w-full items-center justify-between px-10 py-2">
      <div className="flex w-1/6 text-main-blue dark:text-foreground">
        <Link className="flex items-center justify-center" href="/">
          <Image
            src="/static/svg/logo-blue.svg"
            height={30}
            width={30}
            alt="Logo"
            className="block dark:hidden"
          />
          <Image
            src="/static/svg/logo-dark.svg"
            height={30}
            width={30}
            alt="Logo"
            className="hidden dark:block"
          />
          <span className="flex flex-col ml-2 font-bold">
            <h1 className="text-2xl">Hospicare</h1>
            <p className="text-xs text-nowrap font-normal">
              por Madre Teresa Hospice
            </p>
          </span>
        </Link>
      </div>
      <nav>
        <ul className="flex items-center justify-between gap-6">
          <li>
            <Link
              href="/"
              className={
                pathname === "/"
                  ? "text-main-blue dark:text-foreground font-bold"
                  : ""
              }>
              Inicio
            </Link>
          </li>
          <li>
            <Link
              href="/huespedes"
              className={
                pathname === "/huespedes"
                  ? "text-main-blue dark:text-foreground font-bold"
                  : ""
              }>
              Huéspedes
            </Link>
          </li>
          <li>
            <Link
              href="/personal"
              className={
                pathname === "/personal"
                  ? "text-main-blue dark:text-foreground font-bold"
                  : ""
              }>
              Personal
            </Link>
          </li>
          <li>
            <Link
              href="/medicamentos"
              className={
                pathname === "/medicamentos"
                  ? "text-main-blue dark:text-foreground font-bold"
                  : ""
              }>
              Medicamentos
            </Link>
          </li>
          <li>
            <Link
              href="/obras-sociales"
              className={
                pathname === "/obras-sociales"
                  ? "text-main-blue dark:text-foreground font-bold"
                  : ""
              }>
              Obras Sociales
            </Link>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
      <div className="w-1/6 flex justify-end">
        <UserDropdown />
      </div>
    </div>
  );
};
