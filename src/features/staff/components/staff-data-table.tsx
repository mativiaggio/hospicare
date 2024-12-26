"use client";

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Staff, StaffApiResponse } from "@/lib/appwrite-types";
import { ChevronDownIcon, Copy, FileX2, Filter, Plus } from "lucide-react";
import Link from "next/link";
import { StaffRole } from "@/constants/appwrite";
import { useRouter } from "next/navigation";
import { useWindowSize } from "@/hooks/use-window-size";

export const columns: ColumnDef<Staff>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nombre
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "dni",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          DNI
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue("dni")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "phone_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Teléfono
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue("phone_number")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Rol
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const roleValue: string = row.getValue("role");
      const roleTranslation =
        StaffRole.find((role) => role.value === roleValue)?.name || roleValue;

      return <div className="whitespace-nowrap">{roleTranslation}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const staff = row.original;

      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(staff.$id)}>
              <span className="flex items-center gap-1">
                ID
                <Copy size={12} />
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver más</DropdownMenuItem>
            {/* Agrega más acciones según sea necesario */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface StaffDataTableProps {
  staffData?: StaffApiResponse;
}

const roleMapping: { [key: string]: string | null } = {
  Todos: null,
  Voluntarios: "volunteer",
  Administrativos: "administrative",
  Enfermeros: "nurse",
  Psicólogos: "psychologist",
  Médicos: "doctor",
};

const roleMappingInverse: { [key: string]: string | null } = {
  null: "Todos",
  volunteer: "Voluntarios",
  administrative: "Administrativos",
  nurse: "Enfermeros",
  psychologist: "Psicólogos",
  doctor: "Médicos",
};

export function StaffDataTable({ staffData }: StaffDataTableProps) {
  // Declaraciones de estado
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [selectedFilter, setSelectedFilter] = React.useState<string>("Todos");
  const [rowSelection, setRowSelection] = React.useState({});

  const staff = staffData;
  const router = useRouter();

  // Uso de useMemo para memoizar los datos
  const data = React.useMemo(() => staff?.staff.documents ?? [], [staff]);

  const { width } = useWindowSize();
  const isDesktop = width !== undefined && width >= 1280;

  // Inicializar la tabla
  const table = useReactTable<Staff>({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  React.useEffect(() => {
    const currentFilters = table.getColumn("role")?.getFilterValue() as
      | string[]
      | undefined;

    if (!currentFilters || currentFilters.length === 0) {
      setSelectedFilter("Todos");
    } else {
      const mapped = currentFilters
        .map((s) => roleMappingInverse[s] || s)
        .join(", ");
      setSelectedFilter(mapped);
    }
  }, [columnFilters, table]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center py-4">
        <div className="flex lg:hidden">
          <Dialog modal={true}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:block">Filtros</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-md">
              <DialogHeader>
                <DialogTitle>Filtros</DialogTitle>
              </DialogHeader>
              <div className="w-full flex flex-col gap-2 items-center">
                <Input
                  placeholder="Filtrar por nombre..."
                  value={
                    (table.getColumn("name")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="w-1/2 gap-2 hidden lg:flex items-center">
          <Input
            placeholder="Filtrar por nombre..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {selectedFilter} <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {[
                "Todos",
                "Voluntarios",
                "Administrativos",
                "Enfermeros",
                "Psicólogos",
                "Médicos",
              ].map((role) => {
                const role2 = roleMapping[role];

                const currentFilters = table
                  .getColumn("role")
                  ?.getFilterValue() as string[] | undefined;

                if (role === "Todos") {
                  const isChecked =
                    !currentFilters || currentFilters.length === 0;
                  return (
                    <DropdownMenuCheckboxItem
                      key={role}
                      className="capitalize"
                      checked={isChecked}
                      onCheckedChange={(value) => {
                        if (value) {
                          table.getColumn("role")?.setFilterValue(undefined);
                        }
                      }}>
                      {role}
                    </DropdownMenuCheckboxItem>
                  );
                }

                const isChecked = currentFilters
                  ? currentFilters.includes(role2!)
                  : false;

                return (
                  <DropdownMenuCheckboxItem
                    key={role2}
                    className="capitalize"
                    checked={isChecked}
                    onCheckedChange={(value) => {
                      let newFilters: string[] = [];

                      if (value) {
                        if (!newFilters.includes(role2!)) {
                          newFilters.push(role2!);
                        }
                      } else {
                        newFilters = newFilters.filter((s) => s !== role2);
                      }

                      if (newFilters.length > 0) {
                        table.getColumn("role")?.setFilterValue(newFilters);
                      } else {
                        table.getColumn("role")?.setFilterValue(undefined);
                      }
                    }}>
                    {role}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href={"/personal/nuevo"}>
            <Button>
              <Plus className={isDesktop ? "mr-2 h-4 w-4" : "h-4 w-4"} />
              {isDesktop && "Agregar Personal"}
            </Button>
          </Link>
        </div>
      </div>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-main-blue dark:bg-transparent text-foreground">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="!text-white">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onDoubleClick={() =>
                    router.push(`/personal/${row.original.$id}`)
                  }
                  data-state={row.getIsSelected() ? "selected" : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-0">
                      {cell.column.id === "age" ? (
                        <div className="flex gap-1">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}{" "}
                          años
                        </div>
                      ) : (
                        <div className="py-4 px-2">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : staff && staff.staff ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center hover:text-[#991b1b] dark:hover:text-[#f87171] py-4 px-2">
                  <div className="flex gap-2 items-center justify-center w-full">
                    <FileX2 />
                    No hay datos disponibles.
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={index} className="py-4 px-2">
                    <Skeleton className="h-5" />
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
