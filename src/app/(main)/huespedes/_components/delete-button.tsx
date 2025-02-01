"use client";

import { deleteGuest } from "@/database/guest/queries";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  guestId: string;
  onDeleteComplete: () => void;
};

const DeleteCategoryButton = ({ guestId, onDeleteComplete }: Props) => {
  const router = useRouter();

  return (
    <div
      className="text-white"
      onClick={async () => {
        await deleteGuest(guestId);
        onDeleteComplete();
        router.refresh();
      }}>
      Eliminar
    </div>
  );
};

export default DeleteCategoryButton;
