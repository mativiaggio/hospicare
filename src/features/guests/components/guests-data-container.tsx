"use client";
import { useGetGuests } from "../api/use-get-guests";
import { GuestsDataTable } from "./guests-data-table";

export default function GuestsDataContainer() {
  const { data } = useGetGuests();
  return <GuestsDataTable guestsData={data} />;
}
