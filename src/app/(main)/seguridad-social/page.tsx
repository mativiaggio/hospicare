import ErrorPage from "@/components/pages/error";
import { getAll } from "@/modules/health-insurances/backend/query";
import { DataTable } from "@/modules/health-insurances/frontend/data-table";
import React from "react";

const MedicationPage = async () => {
  const healthInsurances = await getAll();

  if (healthInsurances === null) return <ErrorPage />;

  return <DataTable data={healthInsurances} />;
};

export default MedicationPage;
