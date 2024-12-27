"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  HardHat,
  Hospital,
  PillBottle,
  PlusCircle,
  Search,
  Users2,
} from "lucide-react";
import React from "react";
import GuestCard from "./guest-card";
import StaffCard from "./staff-card";
import Link from "next/link";

export default function HomeDashboard() {
  const [typing, setTyping] = React.useState<boolean>(false);

  return (
    <div className="flex flex-col py-4">
      <main className="flex-grow pb-[80px]">
        <div className="grid gap-6 md:grid-cols-2">
          <GuestCard />
          <StaffCard />
        </div>

        <div className="mt-6">
          <Card className="col-span-5 shadow-none">
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2 md:grid-cols-2">
                <Link href={"/huespedes/nuevo"} className="w-full">
                  <Button className="w-full">
                    <PlusCircle className="w-fit h-4 flex justify-end" />
                    <p className="w-full">Nuevo Huésped</p>
                    <Users2 className="w-fit h-4 flex justify-en" />
                  </Button>
                </Link>
                <Link href={"/personal/nuevo"} className="w-full">
                  <Button className="w-full">
                    <PlusCircle className="w-fit h-4 flex justify-end" />
                    <p className="w-full">Nuevo Personal</p>
                    <HardHat className="w-fit h-4 flex justify-en" />
                  </Button>
                </Link>
                <Link href={"/medicamentos/nuevo"} className="w-full">
                  <Button className="w-full">
                    <PlusCircle className="w-fit h-4 flex justify-end" />
                    <p className="w-full">Nuevo Medicamento</p>
                    <PillBottle className="w-fit h-4 flex justify-en" />
                  </Button>
                </Link>
                <Link href={"/obras-sociales/nuevo"} className="w-full">
                  <Button className="w-full">
                    <PlusCircle className="w-fit h-4 flex justify-end" />
                    <p className="w-full">Nueva Obra Social</p>
                    <Hospital className="w-fit h-4 flex justify-en" />
                  </Button>
                </Link>
              </div>
              <div
                className={cn(
                  "flex items-center border border-input focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring px-3 rounded-md",
                  typing ? "ring-1 ring-ring" : ""
                )}>
                <Search className="left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar huésped, medicamento o obra social..."
                  className="focus-visible:ring-0 ring-0 border-none shadow-none"
                  onFocus={() => setTyping(true)}
                  onBlur={() => setTyping(false)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* <div className="mt-6">
          <Tabs defaultValue="actividades" className="w-full">
            <TabsList>
              <TabsTrigger value="actividades">
                Actividades Recientes
              </TabsTrigger>
              <TabsTrigger value="tareas">Tareas Pendientes</TabsTrigger>
            </TabsList>
            <TabsContent value="actividades">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle>Actividades Recientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span>Ingreso de nuevo huésped: María González</span>
                      <span className="text-sm text-muted-foreground">
                        Hace 2 horas
                      </span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Actualización de medicamento: Paracetamol</span>
                      <span className="text-sm text-muted-foreground">
                        Hace 4 horas
                      </span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Renovación de convenio: Obra Social XYZ</span>
                      <span className="text-sm text-muted-foreground">
                        Ayer
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tareas">
              <Card>
                <CardHeader>
                  <CardTitle>Tareas Pendientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span>Revisar historial médico de Juan Pérez</span>
                      <Button size="sm" variant="outline">
                        Completar
                      </Button>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Actualizar inventario de medicamentos</span>
                      <Button size="sm" variant="outline">
                        Completar
                      </Button>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>
                        Programar cita con representante de Obra Social ABC
                      </span>
                      <Button size="sm" variant="outline">
                        Completar
                      </Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div> */}
      </main>
    </div>
  );
}
