"use client";
import MedicationsDataContainer from "@/features/medications/components/medications-data-container";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/use-window-size";
import { PageTitle } from "@/components/page-title";
import { PillBottle } from "lucide-react";

export default function GuestsOutputPage() {
  const [isClient, setIsClient] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isDesktop = width !== undefined && width >= 1280;

  return (
    <>
      {isClient && isDesktop && (
        <>
          <PageTitle
            title="Medicamentos"
            icon={
              <PillBottle className="w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10" />
            }
            subtitle="Comienza a gestionar los medicamentos"
          />
        </>
      )}

      <div className={(isClient && !isDesktop && "pt-6") || ""}>
        <MedicationsDataContainer />
      </div>
    </>
  );
}
