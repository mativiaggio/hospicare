import React from "react";
import { db } from "@/database/db";
import GuestsDataTable from "./_components/guest-data-table";
import CreateGuestButton from "./_components/create-guest-button";
import { AlertDialog } from "@/components/ui/alert-dialog";

const GuestPage = async () => {
  const guests = await db.guest.findMany();
  const socialSecurity = await db.socialSecurity.findMany();

  if (!guests || !socialSecurity) return null;

  return (
    <>
      <AlertDialog>
        <div className="flex flex-col ">
          <CreateGuestButton
            className="w-fit self-end"
            socialSecurity={socialSecurity}
          />
          <GuestsDataTable guests={guests} />
        </div>
      </AlertDialog>
    </>
  );
};

export default GuestPage;
