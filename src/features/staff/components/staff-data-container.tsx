"use client";
import { useGetStaff } from "../api/use-get-staff";
import { StaffDataTable } from './staff-data-table';

export default function StaffDataContainer() {
  const { data } = useGetStaff();
  return <StaffDataTable staffData={data} />;
}
