import ErrorPage from "@/components/pages/error";
import { getAll } from "@/modules/guests/backend/queries";
import { DataTable } from "@/modules/guests/frontend/data-table";
import React from "react";

const GuestPage = async () => {
  const users = await getAll();

  if (users === null) return <ErrorPage />;

  return <DataTable data={users} />;
};

export default GuestPage;
