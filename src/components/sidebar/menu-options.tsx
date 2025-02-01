"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";
import clsx from "clsx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { icons } from "@/lib/constants";

type Props = {
  defaultOpen?: boolean;
};

const linkOrder = [
  "inicio",
  "huespedes",
  "personal",
  "medicamentos",
  "obras-sociales",
];

const sidebarOptions = [
  {
    id: "inicio",
    name: "Inicio",
    link: "/",
    icon: "category",
  },
  {
    id: "huespedes",
    name: "Huespedes",
    link: "/huespedes",
    icon: "person",
  },
  {
    id: "personal",
    name: "Personal",
    link: "/personal",
    icon: "person",
  },
  {
    id: "medicamentos",
    name: "Medicamentos",
    link: "/medicamentos",
    icon: "pillBottle",
  },
  {
    id: "obras-sociales",
    name: "Obras sociales",
    link: "/obras-sociales",
    icon: "building",
  },
];

const MenuOptions = ({ defaultOpen }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const currentPath = usePathname();

  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <Sheet modal={false} {...openState}>
      <SheetTrigger
        asChild
        className="absolute left-4 top-4 md:!hidden flex z-50">
        <Button variant={"outline"} size={"icon"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        showX={!defaultOpen}
        side={"left"}
        className={clsx(
          "bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6",
          {
            "hidden md:inline-block z-0 w-[300px]": defaultOpen,
            "inline-block md:hidden z-[100] w-full": !defaultOpen,
          }
        )}>
        <SheetTitle className="sr-only">Sidebar</SheetTitle>
        <SheetDescription className="sr-only">
          This is the sidebar
        </SheetDescription>
        <div>
          <div className="w-full text-2xl text-main-blue font-extrabold px-3 flex items-center gap-2">
            <Image
              src={"/static/svg/logo-blue.svg"}
              height={30}
              width={30}
              alt="Agency Logo"
            />
            Hospicare
          </div>
          <Separator className="mt-8" />
          <nav className="relative">
            <Command className="rounded-lg overflow-visible bg-transparent">
              <CommandInput placeholder="Buscar..." />
              <CommandList className="py-4 overflow-visible">
                <CommandEmpty>No se encontraron resultados</CommandEmpty>
                <CommandGroup className="overflow-visible">
                  {sidebarOptions
                    .sort(
                      (a, b) =>
                        linkOrder.indexOf(a.name) - linkOrder.indexOf(b.name)
                    )
                    .map((sidebarOption) => {
                      const IconComponent =
                        icons.find((icon) => icon.value === sidebarOption.icon)
                          ?.path || null;

                      return (
                        <CommandItem
                          key={sidebarOption.id}
                          className={cn(
                            "w-full !p-0 mb-1",
                            currentPath === sidebarOption.link
                              ? "!bg-main-blue !text-white hover:!text-white"
                              : "hover:!bg-blue-500/20 dark:hover:!bg-blue-500/30"
                          )}>
                          <Link
                            href={sidebarOption.link}
                            className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-full px-2 py-1.5">
                            {IconComponent && <IconComponent />}
                            <span>{sidebarOption.name}</span>
                          </Link>
                        </CommandItem>
                      );
                    })}
                </CommandGroup>
              </CommandList>
            </Command>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuOptions;
