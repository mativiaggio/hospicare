"use client";
import { deleteGuests } from "@/database/guest/queries";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  selectedGuests: string[];
  onDeleteComplete: () => void;
};

const BulkDeleteGuests = ({ selectedGuests, onDeleteComplete }: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  return (
    <div
      className="text-white"
      onClick={async () => {
        await deleteGuests(selectedGuests);
        onDeleteComplete();
        toast({
          title: "Éxito",
          description: "Los huéspedes seleccionados han sido eliminados",
          variant: "success",
        });
        router.refresh();
      }}>
      Eliminar
    </div>
  );
};

export default BulkDeleteGuests;
