"use client";
import A4Sheet from "@/components/prints/A4/a4-sheet";
import { Button } from "@/components/ui/button";
import { useFindGuestById } from "@/features/guests/api/use-find-by-id";
import { calcularEdad, dateFormat } from "@/lib/utils";
import { LoaderCircle, Printer } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

function EpicrisisInputPage() {
  const params = useParams<{ id: string }>();
  const {
    data: guest,
    isLoading: isLoadingGuest,
    isFetching: isFetchingGuest,
  } = useFindGuestById(params.id);
  const handleClick = () => {
    window.print();
  };

  if (isLoadingGuest || isFetchingGuest) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin" size={48} />
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-2xl font-bold print:hidden pt-4 pb-8">
        Epicrisis de {guest?.name}{" "}
        <span className="text-sm text-gray-500 dark:text-gray-400">
          (impresión hoja A4)
        </span>
      </h1>
      <div className="flex flex-col items-center gap-4 bg-[#e0e0e0]">
        <A4Sheet>
          <div className="flex justify-between mb-4">
            <div className="w-1/3">
              <Image
                src={"/hospice-madre-teresa-logo.svg"}
                height={50}
                width={150}
                alt="Logo Hospice Madre Teresa"
              />
            </div>
            <h1 className="w-1/3 text-center font-bold">Epicrisis</h1>
            <div className="w-1/3"></div>
          </div>
          <div className="text-xs flex justify-between pb-2">
            <p>Nombre y apellido: {guest?.name}</p>
            <p>Edad: {calcularEdad(guest?.birthdate)} años</p>
          </div>
          <div className="text-xs flex justify-between pb-2">
            <p>Obra social: {guest?.social_security?.name}</p>
          </div>
          <div className="text-xs flex justify-between pb-2">
            <p>Dirección: {guest?.address}</p>
          </div>
          <div className="text-xs flex justify-between pb-2">
            <p>Tumor (si el diagnóstico es cáncer): {guest?.tumor}</p>
          </div>
          <div className="text-xs flex justify-between pb-2">
            <p>Metástasis: {guest?.metastasis_location}</p>
          </div>
          <div className="text-xs flex justify-between pb-2">
            <p>
              Fecha de internación: {dateFormat(guest?.hospitalization_date)}
            </p>
            <p>Fecha de fallecimiento: 00/00/00</p>
          </div>
          <div className="text-xs flex justify-between pb-2">
            <p>Total de días de internación: 0</p>
          </div>
        </A4Sheet>
        <div className="pb-4 print:hidden sticky bottom-4">
          <Button
            onClick={handleClick}
            variant={"invert"}
            className="flex items-center justify-center rounded-full !h-12 !w-12 p-0"
            title="Imprimir">
            <Printer className="!h-6 !w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EpicrisisInputPage;
