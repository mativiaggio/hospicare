"use client";
import { X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavbarMenuButton from "./buttons/navbar-menu-button";
import { ModeToggle } from "./buttons/theme-toggle";

import { UserDropdown } from "./dropdowns/user-dropdown";
import { Button } from "./ui/button";
import { Menu } from "./ui/navbar-menu";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();

  const handleToggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleCloseNavbar = () => {
    setIsNavbarOpen(false);
  };

  useEffect(() => {
    // Cierra el menú cada vez que la ruta cambia
    setIsNavbarOpen(false);
  }, [pathname]); // Escucha cambios en pathname

  return (
    <div className="relative z-10 print:hidden">
      <div className="fixed w-full max-w-[100vw] top-0 z-10 bg-[#fafafa] dark:bg-[#141414]">
        <div className="flex h-fit max-h-[10vh] items-center justify-between border-b px-4 py-2 sm:px-6 md:px-8 lg:px-10">
          <div className="flex w-1/6">
            <Link className="flex items-center justify-center" href="/">
              <span className="flex items-center justify-between gap-2 w-full">
                <span className="flex items-center gap-2">
                  <Image
                    src={"/HMT-logo.svg"}
                    height={50}
                    width={50}
                    alt="Logo"
                    className="block dark:hidden h-[50px] max-h-[50px] w-[50px] max-w-[50px]"
                  />
                  <Image
                    src={"/HMT-logo-dark.svg"}
                    height={50}
                    width={50}
                    alt="Logo"
                    className="hidden dark:block h-[50px] max-h-[50px] w-[50px] max-w-[50px]"
                  />
                </span>
              </span>
              <span className="flex flex-col text-primary ml-2 font-bold">
                <h1 className="text-2xl">Hospicare</h1>
                <p className="text-xs text-nowrap font-normal">
                  por Hospice Madre Teresa
                </p>
              </span>
            </Link>
          </div>
          <Menu setActive={setActive}>
            <div className="hidden w-full xl:flex">
              <ul className="flex items-center justify-between gap-6">
                <li>
                  <Link href={"/"}>Inicio</Link>
                </li>
                <li>
                  <Link href={"/huespedes"}>Huéspedes</Link>
                </li>
                <li>
                  <Link href={"/medicamentos"}>Medicamentos</Link>
                </li>
                <li>
                  <Link href={"/obras-sociales"}>Obras Sociales</Link>
                </li>
                <li>
                  <Link href={"/personal"}>Personal</Link>
                </li>
                <li>
                  <ModeToggle />
                </li>
              </ul>
            </div>
          </Menu>

          <div className="hidden w-1/6 xl:flex justify-end">
            <UserDropdown />
          </div>
          <div className="block xl:hidden">
            <Button
              variant={"ghost"}
              onClick={handleToggleNavbar}
              className="px-0">
              <NavbarMenuButton />
            </Button>
          </div>
        </div>
      </div>

      <div
        id="mobile-navbar"
        className={`navbar-container fixed left-0 top-0 h-screen w-full transform transition-transform duration-150 ease-in-out xl:hidden z-50 ${
          isNavbarOpen
            ? "translate-x-0 overflow-hidden"
            : "-translate-x-full overflow-auto"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-navbar-title">
        <div className="fixed inset-0 z-50"></div>
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-4 dark:bg-black sm:ring-1 sm:ring-gray-900/10">
          <div className="flex h-fit max-h-[10vh] min-h-[57px] items-center justify-between px-0 py-2 sm:px-2 md:px-4 lg:px-6">
            <span className="-m-1.5 p-1.5">
              <span className="sr-only">Hospicare</span>
              <div>
                <Link className="flex items-center justify-center" href="#">
                  <span className="flex items-center justify-between gap-2 w-full">
                    <span className="flex items-center gap-2">
                      <Image
                        src={"/HMT-logo.svg"}
                        height={50}
                        width={50}
                        alt="Logo"
                        className="block dark:hidden h-[50px] max-h-[50px] w-[50px] max-w-[50px]"
                      />
                      <Image
                        src={"/HMT-logo-dark.svg"}
                        height={50}
                        width={50}
                        alt="Logo"
                        className="hidden dark:block h-[50px] max-h-[50px] w-[50px] max-w-[50px]"
                      />
                    </span>
                  </span>
                  <span className="flex flex-col text-primary ml-2 font-bold">
                    <h1 className="text-2xl">Hospicare</h1>
                    <p className="text-xs text-nowrap font-normal">
                      por Hospice Madre Teresa
                    </p>
                  </span>
                </Link>
              </div>
            </span>
            <button
              id="close-mobile-navbar"
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-black dark:text-white"
              onClick={handleCloseNavbar}>
              <span className="sr-only">Close menu</span>
              <X color="red" />
            </button>
          </div>
          <div className="mt-6 flow-root text-black dark:text-white">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="flex flex-col">
                <ul className="navbar-ul items-left mb-6 flex flex-col gap-6 text-2xl">
                  <li>
                    <Link onClick={() => handleCloseNavbar()} href={"/"}>
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => handleCloseNavbar()}
                      href={"/huespedes"}>
                      Huéspedes
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => handleCloseNavbar()}
                      href={"/medicamentos"}>
                      Medicamentos
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => handleCloseNavbar()}
                      href={"/obras-sociales"}>
                      Obras Sociales
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => handleCloseNavbar()}
                      href={"/personal"}>
                      Personal
                    </Link>
                  </li>
                  <li className="hover:!bg-transparent">
                    <ModeToggle
                      buttonClasses="justify-start hover:!bg-transparent"
                      iconSize="h-[1.8rem] w-[1.8rem]"
                    />
                  </li>
                </ul>
              </div>
              <div className="p-2">
                <UserDropdown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
