"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useGetGuests } from "@/features/guests/api/use-get-guests";
import CardSkeleton from "./card-skeleton";

export default function GuestCard() {
  const { data, isLoading } = useGetGuests();

  if (isLoading)
    return (
      <CardSkeleton
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
    );

  const guests = data?.guests.documents || [];

  const alive = guests.filter((guest) => guest.status === "alive").length;
  const pending = guests.filter((guest) => guest.status === "pending").length;
  const dead = guests.filter((guest) => guest.status === "dead").length;

  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Huéspedes</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data?.guests.total}</div>
        <span className="flex gap-2">
          <p className="text-xs text-muted-foreground w-fit">
            Activos: {alive}
          </p>
          <p className="text-xs text-muted-foreground w-fit">
            Pendientes: {pending}
          </p>
          <p className="text-xs text-muted-foreground w-fit">
            Inactivos: {dead}
          </p>
        </span>
      </CardContent>
    </Card>
  );
}
