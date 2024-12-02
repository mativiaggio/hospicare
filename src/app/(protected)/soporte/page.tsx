import { Metadata } from "next";
import TicketsDataContainer from "@/features/ticketing-system/components/tickets-data-container";

export const metadata: Metadata = {
  title: "Ticketing System Dashboard",
  description: "View and manage your support tickets",
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-5">Tickets</h1>
      <TicketsDataContainer />
    </div>
  );
}
