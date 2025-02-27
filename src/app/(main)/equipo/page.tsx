import React from "react";
import ErrorPage from "@/components/pages/error";
import { getAll } from "@/modules/users/backend/queries";
import { DataTable } from "@/modules/users/frontend/data-table";

const TeamsPage = async () => {
  const users = await getAll();

  if (users === null) return <ErrorPage />;

  return <DataTable data={users} />;
};

export default TeamsPage;
