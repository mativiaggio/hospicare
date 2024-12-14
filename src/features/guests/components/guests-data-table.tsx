"use client";

import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
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

import { Badge } from "@/components/ui/badge";
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
import { Guest, GuestsApiResponse } from "@/lib/appwrite-types";
import { cn } from "@/lib/utils";
import { Copy, FileX2, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RowActions = ({ row }: { row: any }) => {
  const guest = row.original;

  const handleEpicrisis = () => {};

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
          onClick={() => navigator.clipboard.writeText(guest.$id)}>
          <span className="flex items-center gap-1">
            ID
            <Copy size={12} />
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            navigator.clipboard.writeText(
              guest.contact_email ? guest.contact_email : ""
            )
          }>
          <span className="flex items-center gap-1">
            Email
            <Copy size={12} />
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            navigator.clipboard.writeText(
              guest.contact_phone ? guest.contact_phone : ""
            )
          }>
          <span className="flex items-center gap-1">
            Teléfono
            <Copy size={12} />
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {/* <Link href={`huespedes/${guest.$id}/epicrisis`}>Epicrisis</Link> */}
          <Button
            variant={"inherit"}
            className="w-full flex justify-start items-center"
            onClick={handleEpicrisis}>
            Epicrisis
          </Button>
        </DropdownMenuItem>
        {/* Agrega más acciones según sea necesario */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Guest>[] = [
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
    accessorKey: "birthdate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Fecha de nacimiento
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("birthdate"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "$createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Fecha de Alta
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("$createdAt"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Estado
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>
        <StatusBadge status={row.getValue("status")} />
      </div>
    ),
  },
  {
    accessorKey: "contact_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Contacto
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue("contact_name")}</div>
    ),
  },
  {
    accessorKey: "contact_email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email de contacto
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase whitespace-nowrap">
        {row.getValue("contact_email")}
      </div>
    ),
  },
  {
    accessorKey: "contact_phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Teléfono de contacto
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase whitespace-nowrap">
        {row.getValue("contact_phone")}
      </div>
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Dirección
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const address = row.getValue<string>("address");

      if (typeof address === "string") {
        const displayAddress =
          address.length > 30 ? `${address.substring(0, 30)}...` : address;
        return <div className="whitespace-nowrap">{displayAddress}</div>;
      } else {
        return;
      }
    },
  },
  {
    accessorKey: "referring_person",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Quien lo refirió
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        {row.getValue("referring_person")}
      </div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <RowActions row={row} />,
  },
];

const statusMapping: { [key: string]: string | null } = {
  Todos: null,
  Activo: "alive",
  Pendiente: "pending",
  Inactivo: "dead",
};

const statusMappingInverse: { [key: string]: string | null } = {
  null: "Todos",
  alive: "Activo",
  pending: "Pendiente",
  dead: "Inactivo",
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        "",
        status === "alive" &&
          "bg-active border-active dark:bg-active-dark dark:border-active-dark text-active-text-light dark:text-active-text-dark",
        status === "pending" &&
          "bg-pending border-pending dark:bg-pending-dark dark:border-pending-dark text-pending-text-light dark:text-pending-text-dark",
        status === "dead" &&
          "bg-inactive border-inactive dark:bg-inactive-dark dark:border-inactive-dark text-inactive-text-light dark:text-inactive-text-dark"
      )}>
      {statusMappingInverse[status]}
    </Badge>
  );
};

interface GuestsDataTableProps {
  guestsData?: GuestsApiResponse;
}

export function GuestsDataTable({ guestsData }: GuestsDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedFilter, setSelectedFilter] = React.useState<string>("Todos");
  const router = useRouter();
  const guests = guestsData;
  const data = React.useMemo(() => guests?.guests.documents ?? [], [guests]);

  const table = useReactTable<Guest>({
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
    const currentFilters = table.getColumn("status")?.getFilterValue() as
      | string[]
      | undefined;

    if (!currentFilters || currentFilters.length === 0) {
      setSelectedFilter("Todos");
    } else {
      const mapped = currentFilters
        .map((s) => statusMappingInverse[s] || s)
        .join(", ");
      setSelectedFilter(mapped);
    }
  }, [columnFilters, table]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center py-4">
        <div className="w-1/2 gap-2 flex items-center">
          <Input
            placeholder="Filtrar por nombre..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Input
            placeholder="Filtrar por contacto..."
            value={
              (table.getColumn("contact_name")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("contact_name")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {selectedFilter} <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {["Todos", "Activo", "Pendiente", "Inactivo"].map((status) => {
                const status2 = statusMapping[status];

                const currentFilters = table
                  .getColumn("status")
                  ?.getFilterValue() as string[] | undefined;

                if (status === "Todos") {
                  const isChecked =
                    !currentFilters || currentFilters.length === 0;
                  return (
                    <DropdownMenuCheckboxItem
                      key={status}
                      className="capitalize"
                      checked={isChecked}
                      onCheckedChange={(value) => {
                        if (value) {
                          table.getColumn("status")?.setFilterValue(undefined);
                        }
                      }}>
                      {status}
                    </DropdownMenuCheckboxItem>
                  );
                }

                const isChecked = currentFilters
                  ? currentFilters.includes(status2!)
                  : false;

                return (
                  <DropdownMenuCheckboxItem
                    key={status2}
                    className="capitalize"
                    checked={isChecked}
                    onCheckedChange={(value) => {
                      let newFilters: string[] = [];

                      if (value) {
                        if (!newFilters.includes(status2!)) {
                          newFilters.push(status2!);
                        }
                      } else {
                        newFilters = newFilters.filter((s) => s !== status2);
                      }

                      if (newFilters.length > 0) {
                        table.getColumn("status")?.setFilterValue(newFilters);
                      } else {
                        table.getColumn("status")?.setFilterValue(undefined);
                      }
                    }}>
                    {status}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href={"/huespedes/nuevo"}>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Agregar Huésped
            </Button>
          </Link>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                    router.push(`/huespedes/${row.original.$id}`)
                  }
                  data-state={row.getIsSelected() ? "selected" : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.column.id === "age" ? (
                        <div className="flex gap-1">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}{" "}
                          años
                        </div>
                      ) : (
                        <div>
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
            ) : guests && guests.guests ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center hover:text-[#991b1b] dark:hover:text-[#f87171]">
                  <div className="flex gap-2 items-center justify-center w-full">
                    <FileX2 />
                    No hay datos disponibles.
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={index}>
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
