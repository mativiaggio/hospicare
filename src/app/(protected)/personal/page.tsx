"use client";
import { PageTitle } from "@/components/page-title";
import StaffDataContainer from "@/features/staff/components/staff-data-container";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/use-window-size";

export default function StaffOutputPage() {
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
            title="Perosnal"
            icon={<Users className="w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10" />}
            subtitle="Comienza a gestionar los huéspedes"
          />
        </>
      )}

      <div className={(isClient && !isDesktop && "pt-6") || ""}>
        <StaffDataContainer />
      </div>
    </>
  );
}
