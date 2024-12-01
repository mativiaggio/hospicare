"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { tickets } from "./data";

export function TicketsTable() {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  const handleRowClick = (ticketId: string) => {
    router.push(`soporte/ticket/${ticketId}`);
  };

  const displayedTickets = isAdmin
    ? tickets
    : tickets.filter((ticket) => ticket.userId === "user1");

  return (
    <div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
            className="mr-2"
          />
          View as Developer
        </label>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha de creación</TableHead>
              <TableHead>Fecha de actualización</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedTickets.map((ticket) => (
              <TableRow
                key={ticket.id}
                onClick={() => handleRowClick(ticket.id)}
                className="cursor-pointer">
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{ticket.title}</TableCell>
                <TableCell>
                  {/* <Badge variant={getBadgeVariant(ticket.status)}> */}
                  <Badge>{ticket.status}</Badge>
                </TableCell>
                <TableCell>
                  {new Date(ticket.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(ticket.updatedAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// function getBadgeVariant(status: Ticket["status"]) {
//   switch (status) {
//     case "open":
//       return "default";
//     case "in-progress":
//       return "secondary";
//     case "resolved":
//       return "success";
//     default:
//       return "default";
//   }
// }
