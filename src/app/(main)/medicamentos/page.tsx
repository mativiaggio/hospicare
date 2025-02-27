import ErrorPage from "@/components/pages/error";
import { getAll } from "@/modules/medications/backend/queries";
import { DataTable } from "@/modules/medications/frontend/data-table";
import React from "react";

const MedicationPage = async () => {
  const medications = await getAll();

  if (medications === null) return <ErrorPage />;

  return <DataTable data={medications} />;
};

export default MedicationPage;
