"use client";
import { PageTitle } from "@/components/page-title";
import AddMedicationForm from "@/features/medications/components/add-medication-form";
import { useWindowSize } from "@/hooks/use-window-size";
import { useEffect, useState } from "react";

export default function GuestsInputPage() {
  const [isClient, setIsClient] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isDesktop = width !== undefined && width >= 1280;
  return (
    <>
      {isClient && isDesktop && (
        <div className="space-y-6">
          <PageTitle
            title="Agregar Medicamento"
            subtitle="Completa el formulario para cargar un medicamento"
          />
        </div>
      )}
      <div className={(isClient && !isDesktop && "pt-6") || ""}>
        <AddMedicationForm />
      </div>
    </>
  );
}
