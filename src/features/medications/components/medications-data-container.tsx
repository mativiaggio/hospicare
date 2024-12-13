"use client";
import { useGetMedications } from "../api/use-get-medications";
import { MedicationsDataTable } from "./medications-data-table";

export default function MedicationsDataContainer() {
  const { data } = useGetMedications();
  return <MedicationsDataTable medicationsData={data} />;
}
