"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { Menu } from "@/components/ui/navbar-menu";
import { ModeToggle } from "@/components/buttons/theme-toggle";

const AuthNavbar: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative z-10 print:hidden">
      <div className="fixed w-full max-w-[100vw] top-0 z-10 bg-[#fafafa] dark:bg-black">
        <div className="flex h-fit max-h-[10vh] items-center justify-between border-b px-4 py-2 sm:px-6 md:px-8 lg:px-10">
          <div className="flex w-1/6">
            <Link className="flex items-center justify-center" href="/">
              <span className="flex items-center justify-between gap-2 w-full">
                <span className="flex items-center gap-2">
                  <Image
                    src={"/static/svg/logo.svg"}
                    height={30}
                    width={30}
                    alt="Logo"
                    className="block dark:hidden h-[30px] max-h-[30px] w-[30px] max-w-[30px]"
                  />
                  <Image
                    src={"/static/svg/logo-dark.svg"}
                    height={30}
                    width={30}
                    alt="Logo"
                    className="hidden dark:block h-[30px] max-h-[30px] w-[30px] max-w-[30px]"
                  />
                </span>
              </span>
              <span className="flex flex-col text-primary ml-2 font-bold">
                <h1 className="text-2xl">Hospicare</h1>
                <p className="text-xs text-nowrap font-normal">
                  por Madre Teresa Hospice
                </p>
              </span>
            </Link>
          </div>
          <Menu setActive={setActive}>
            <div className="w-full flex">
              <ul className="flex items-center justify-between gap-6">
                <li>
                  <ModeToggle />
                </li>
              </ul>
            </div>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default AuthNavbar;
