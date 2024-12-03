import { Metadata } from "next";
import TicketsDataContainer from "@/features/ticketing-system/components/tickets-data-container";

export const metadata: Metadata = {
  title: "Ticketing System Dashboard",
  description: "View and manage your support tickets",
};

export default function DashboardPage() {
  return (
      <TicketsDataContainer />
  );
}
