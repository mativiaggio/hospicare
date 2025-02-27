"use client";

import React from "react";
import { usePathname } from "next/navigation";

// Importa los componentes del Breadcrumb (ajusta las rutas según tu estructura)
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { items } from "@/utils/constants";
import Link from "next/link";

// Función para capitalizar la primera letra de cada segmento
function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const AutoBreadcrumb = () => {
  const pathname = usePathname(); // Ejemplo: "/medicamentos/nuevo"
  const segments = pathname.split("/").filter(Boolean); // ["medicamentos", "nuevo"]

  // Para cada segmento se genera la ruta acumulada
  const paths = segments.map(
    (_, index) => "/" + segments.slice(0, index + 1).join("/")
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Primer item: Home */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {/* Separador y Dropdown fijo */}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {items.map(
                (item) =>
                  paths[0] !== item.url && (
                    <DropdownMenuItem key={item.title}>
                      <Link href={item.url}>{item.title}</Link>
                    </DropdownMenuItem>
                  )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>

        {/* Se renderizan los segmentos de la ruta */}
        {segments.map((segment, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {index < segments.length - 1 ? (
                // Si no es el último segmento, renderiza un enlace
                <BreadcrumbLink href={paths[index]}>
                  {capitalize(segment.replace("-", " "))}
                </BreadcrumbLink>
              ) : (
                // El último segmento se renderiza como página actual (no clickeable)
                <BreadcrumbPage>{capitalize(segment)}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AutoBreadcrumb;
