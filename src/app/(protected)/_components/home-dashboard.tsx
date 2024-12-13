"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Activity,
  Building,
  Pill,
  PlusCircle,
  Search,
  Users,
} from "lucide-react";
import React from "react";

export default function HomeDashboard() {
  const [typing, setTyping] = React.useState<boolean>(false);

  return (
    <div className="flex flex-col min-h-screen py-4">
      <main className="flex-grow">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Huéspedes
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">
                +4% desde el último mes
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Medicamentos Activos
              </CardTitle>
              <Pill className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">
                +2 nuevos esta semana
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Obras Sociales
              </CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">
                3 convenios en revisión
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Actividades Hoy
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">7 pendientes</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card className="col-span-5">
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center space-x-4">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Huésped
                </Button>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Medicamento
                </Button>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Nueva Obra Social
                </Button>
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

        <div className="mt-6">
          <Tabs defaultValue="actividades" className="w-full">
            <TabsList>
              <TabsTrigger value="actividades">
                Actividades Recientes
              </TabsTrigger>
              <TabsTrigger value="tareas">Tareas Pendientes</TabsTrigger>
            </TabsList>
            <TabsContent value="actividades">
              <Card>
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
        </div>
      </main>
    </div>
  );
}
