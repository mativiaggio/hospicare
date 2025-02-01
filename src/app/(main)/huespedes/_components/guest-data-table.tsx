"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpDown,
  MoreHorizontal,
  Trash,
  Download,
  RefreshCcw,
} from "lucide-react";
import { Guest } from "@prisma/client";
import DeleteGuestButton from "./delete-button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditGuestButton from "./edit-guest-btn";
import { useRouter } from "next/navigation";
import BulkDeleteGuests from "./bulk-delete-guests";

type Props = {
  guests: Guest[];
  onDelete?: (guest: Guest) => void;
};

const ITEMS_PER_PAGE = 50;

export default function GuestsDataTable({ guests }: Props) {
  const [selectedGuests, setselectedGuests] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Guest;
    direction: "asc" | "desc";
  }>({ key: "name", direction: "asc" });
  const [filterName, setFilterName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const toggleSort = (key: keyof Guest) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const filteredGuests = guests.filter((guest) =>
    guest.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const sortedGuests = [...filteredGuests].sort((a, b) => {
    const aValue = a[sortConfig.key] ?? ""; // Replace "" with a sensible fallback
    const bValue = b[sortConfig.key] ?? ""; // Replace "" with a sensible fallback

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;

    return 0;
  });

  const paginatedGuests = sortedGuests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(sortedGuests.length / ITEMS_PER_PAGE);

  const toggleSelectAll = () => {
    if (selectedGuests.size === paginatedGuests.length) {
      setselectedGuests(new Set());
    } else {
      setselectedGuests(new Set(paginatedGuests.map((p) => p.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedGuests);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setselectedGuests(newSelected);
  };

  const resetselectedGuests = () => {
    setselectedGuests(new Set());
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-end justify-between gap-2">
        <Input
          placeholder={"Buscar..."}
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden md:block">
            {selectedGuests.size} seleccionado
            {selectedGuests.size !== 1 && "s"}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {}}
            className="h-8"
            disabled={selectedGuests.size == 0}>
            <Download className="" />
            Exportar
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                onClick={() => {}}
                className="h-8"
                disabled={selectedGuests.size == 0}>
                <Trash />
                Eliminar
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Eliminar{" "}
                  <span className="text-main-secondary">
                    {" "}
                    {selectedGuests.size} agencia
                    {selectedGuests.size !== 1 && "s"}
                  </span>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Estás seguro/a de querer eliminar{" "}
                  {selectedGuests.size !== 1 ? "las agencias" : "la agencia"}{" "}
                  seleccionada
                  {selectedGuests.size !== 1 && "s"}?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>
                  <BulkDeleteGuests
                    selectedGuests={Array.from(selectedGuests)}
                    onDeleteComplete={resetselectedGuests}
                  />
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedGuests.size === paginatedGuests.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="w-/6">
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("name")}
                  className="flex items-center gap-1 p-0 hover:bg-transparent">
                  Nombre
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-12 text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    router.refresh();
                  }}
                  className="h-8">
                  <RefreshCcw />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedGuests.map((guest) => (
              <TableRow
                key={guest.id}
                className={`${
                  selectedGuests.has(guest.id) ? "bg-muted" : ""
                } hover:bg-muted`}>
                <TableCell>
                  <Checkbox
                    checked={selectedGuests.has(guest.id)}
                    onCheckedChange={() => toggleSelect(guest.id)}
                  />
                </TableCell>
                <TableCell>{guest.name}</TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <AlertDialog>
                        <EditGuestButton
                          guest={guest}
                          className="w-[200px] self-end"
                        />
                      </AlertDialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}>
                            <div className="flex gap-2 items-center cursor-pointer text-main-secondary">
                              <Trash className="h-4 w-4 mr-2" />
                              Eliminar
                            </div>
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Eliminar{" "}
                              <span className="text-main-secondary">
                                {" "}
                                {guest.name}
                              </span>
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Estás seguro/a de querer eliminar la agencia{" "}
                              <span className="text-main-primary">
                                {" "}
                                {guest.name}
                              </span>
                              ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>
                              <DeleteGuestButton
                                guestId={guest.id}
                                onDeleteComplete={resetselectedGuests}
                              />
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1} a{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, sortedGuests.length)} de{" "}
          {sortedGuests.length} agencias
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}>
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}>
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
