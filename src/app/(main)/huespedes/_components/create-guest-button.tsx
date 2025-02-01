"use client";
import CustomModal from "@/components/custom-modal";
// import CategoryForm from "@/components/forms/guest-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useModal } from "@/lib/providers/modal-provider";
import { SocialSecurity } from "@prisma/client";

import { ArchiveRestore } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";
import GuestForm from "./guest-form";

type Props = {
  className?: string;
  socialSecurity: SocialSecurity[];
};

const CreateGuestButton = ({ className, socialSecurity }: Props) => {
  const { setOpen } = useModal();

  return (
    <Button
      className={twMerge("w-full flex gap-4 mb-4", className)}
      onClick={() => {
        setOpen(
          <CustomModal
            title="Carga un huésped"
            subheading="Ingresa los detalles del huésped">
            {/* <CategoryForm agencyDetails={agencyDetails} userId={user.id} /> */}
            {socialSecurity && socialSecurity.length === 0 ? (
              <Card className="w-full bg-red-100 border-l-4 border-red-500 text-red-500">
                <CardHeader>
                  <CardTitle className="font-bold text-lg">Ups!</CardTitle>
                  <CardDescription className="text-red-400">
                    Te estas adelantando.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Es necesario cargar obras sociales antes de cargar un huésped.
                </CardContent>
              </Card>
            ) : (
              <GuestForm socialSecurities={socialSecurity} />
            )}
          </CustomModal>
        );
      }}>
      <ArchiveRestore size={15} color="white" />
      <span className="text-white">Carga una huésped</span>
    </Button>
  );
};

export default CreateGuestButton;
