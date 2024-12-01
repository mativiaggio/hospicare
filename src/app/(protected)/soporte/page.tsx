import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TicketsTable } from "./_components/tickets-table";

export const metadata: Metadata = {
  title: "Ticketing System Dashboard",
  description: "View and manage your support tickets",
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-5">Ticketing System Dashboard</h1>
      <div className="mb-5">
        <Link href="soporte/nuevo">
          <Button>Create New Ticket</Button>
        </Link>
      </div>
      <TicketsTable />
    </div>
  );
}
