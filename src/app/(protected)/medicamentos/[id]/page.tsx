"use client";
import { PageTitle } from "@/components/page-title";
import ViewMedicationForm from "@/features/medications/components/view-medication-form";
import { useWindowSize } from "@/hooks/use-window-size";
import { useEffect, useState } from "react";

export default function MedicationInputPage() {
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
            title="Editar Medicamento"
            subtitle="Completa el formulario para editar un medicamento"
          />
        </div>
      )}
      <div className={(isClient && !isDesktop && "pt-6") || ""}>
        <ViewMedicationForm />
      </div>
    </>
  );
}
