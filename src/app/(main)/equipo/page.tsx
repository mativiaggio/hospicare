import React from "react";
import { getAll } from "@/modules/users/backend/queries";
import { DataTable } from "@/modules/users/frontend/data-table";

const TeamsPage = async () => {
  const users = await getAll();

  return <DataTable data={users || []} />;
};

export default TeamsPage;
