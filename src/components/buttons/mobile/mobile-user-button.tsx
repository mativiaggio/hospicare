"use client";
import { useCurrent } from "@/features/auth/api/use-current";
import React, { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { ChevronLeft, ChevronRight, Github, Loader2, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../../ui/button";
import { PageTitle } from "../../page-title";
import { Logout } from "../logout-button";
import MobileUserButtonPersonalization from "./mobile-user-button-personalization";
import MobileUserButtonPersonalData from "./mobile-user-button-personal-data";
import MobileUserButtonSecurity from "./mobile-user-button-security";
import MobileUserButtonAdminPanel from "./mobile-user-button-admin-panel";
import MobileUserButtonTickets from "./mobile-user-button-tickets";

export default function MobileUserButton() {
  const { data, isLoading } = useCurrent();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  if (isLoading) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="h-[40px] w-[40px] bg-transparent rounded-full flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        </DropdownMenuTrigger>
      </DropdownMenu>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger>
        <div className="flex gap-2 items-center border rounded-full p-2 hover:bg-muted">
          <Avatar className="select-none cursor-pointer rounded-full h-8 w-8">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${data?.name}}`}
            />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-sm">
            <div>{data?.name}</div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent
        className="!max-w-[100vw] flex flex-col h-full max-h-screen w-screen max-w-screen"
        showClose={false}>
        <SheetHeader className="flex-shrink-0">
          {/* <SheetTitle> */}
          <div className="flex h-fit items-center w-full">
            <div className="w-1/3 flex justify-start">
              <Button
                variant={"outline"}
                className="p-0 aspect-square rounded-xl"
                onClick={handleLinkClick}>
                <ChevronLeft />
              </Button>
            </div>
            <PageTitle
              title="Configuración"
              titleClassName="font-bold text-center"
              className="w-full flex justify-center"
            />
            <div className="w-1/3"></div>
          </div>
          {/* </SheetTitle> */}
          <div className="pt-8 flex flex-col gap-8">
            <div className="bg-main-card border-main-card rounded-xl p-4 flex gap-4">
              <Avatar className="select-none cursor-pointer rounded-full h-14 w-14">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${data?.name}}`}
                />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="text-xl text-left">{data?.name}</div>
                <div className="text-base text-gray-600 dark:text-gray-400">
                  {data?.email}
                </div>
              </div>
            </div>
          </div>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="grid gap-4 py-4">
            {data?.labels.includes("admin") && (
              <>
                <h2>Avanzado</h2>
                <div className="bg-main-card border-main-card rounded-xl">
                  <div className="flex flex-col gap-4 p-8">
                    <MobileUserButtonAdminPanel data={data!} />
                  </div>
                </div>
              </>
            )}
            <h2>Mi cuenta</h2>
            <div className="bg-main-card border-main-card rounded-xl">
              <div className="flex flex-col gap-4 p-8">
                <MobileUserButtonPersonalData data={data!} />
                <MobileUserButtonSecurity />
                <MobileUserButtonPersonalization />
              </div>
            </div>
            <h2>Soporte</h2>
            <div className="bg-main-card border-main-card rounded-xl">
              <div className="flex flex-col gap-4 p-8">
                <MobileUserButtonTickets />
                <Link
                  className="w-full"
                  href={"https://github.com/mativiaggio/hospicare"}
                  onClick={handleLinkClick}>
                  <div className="w-full border-b border-white dark:border-muted pb-4">
                    <div className="flex items-center gap-2 hover:opacity-50 transition-all">
                      <div className="">
                        <div className="aspect-square rounded-full bg-muted p-3 w-fit">
                          <Github className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="w-full flex flex-col ">
                        <h3>GitHub</h3>
                        <p className="text-sm">Repositorio del proyecto</p>
                      </div>
                      <div className="">
                        <ChevronRight />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <Logout
                className="!p-2 rounded-full transition-all"
                textClassName="!text-base text-red-500"
                iconClassName="text-red-500"
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
