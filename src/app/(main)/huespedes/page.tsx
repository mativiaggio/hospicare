import { getAll } from "@/modules/guests/backend/queries";
import { DataTable } from "@/modules/guests/frontend/data-table";
import React from "react";

const GuestPage = async () => {
  const guests = await getAll();

  return <DataTable data={guests || []} />;
};

export default GuestPage;
