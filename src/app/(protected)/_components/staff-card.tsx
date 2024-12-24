"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HardHat } from "lucide-react";
import CardSkeleton from "./card-skeleton";
import { useGetStaff } from "@/features/staff/api/use-get-staff";

export default function StaffCard() {
  const { data, isLoading } = useGetStaff();

  if (isLoading)
    return (
      <CardSkeleton
        icon={<HardHat className="h-4 w-4 text-muted-foreground" />}
        bottomLine={false}
      />
    );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Huéspedes</CardTitle>
        <HardHat className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data?.staff.total}</div>
      </CardContent>
    </Card>
  );
}
