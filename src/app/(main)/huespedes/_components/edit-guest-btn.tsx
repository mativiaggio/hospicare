"use client";
import CustomModal from "@/components/custom-modal";
// import AdminGuestForm from "@/components/forms/guest-form";
import { Button } from "@/components/ui/button";
import { useModal } from "@/lib/providers/modal-provider";
import { Guest } from "@prisma/client";
import { Edit } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  guest: Guest;
  className: string;
};

const EditGuestButton = ({ guest, className }: Props) => {
  const { setOpen } = useModal();

  return (
    <Button
      className={twMerge("h-8 justify-start !w-full px-2", className)}
      variant={"ghost"}
      onClick={() => {
        setOpen(
          <CustomModal
            title={`Controlador de ${guest.name}`}
            subheading="Modifica el estado de la suscripción de la agencia">
            {/* <AdminGuestForm guest={guest} /> */}
            <p></p>
          </CustomModal>
        );
      }}>
      <Edit className="h-4 w-4 mr-2" />
      Editar
    </Button>
  );
};

export default EditGuestButton;
