import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AddTicketFormSkeleton() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Nuevo ticket</CardTitle>
        <CardDescription>
          Completa el formulario para cargar un nuevo ticket
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <p className="text-sm pb-2">Título</p>
                <Skeleton className="h-12 w-full" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm pb-2">Descripción</p>
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
            <div className="pt-10">
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
