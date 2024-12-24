"use client";
import { PageTitle } from "@/components/page-title";
import GuestsDataContainer from "@/features/guests/components/guests-data-container";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/use-window-size";

export default function GuestsOutputPage() {
  const [isClient, setIsClient] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isDesktop = width !== undefined && width >= 1280;
  return (
    <>
      {" "}
      {isClient && isDesktop && (
        <>
          <PageTitle
            title="Huéspedes"
            icon={<User className="w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10" />}
            subtitle="Comienza a gestionar los huéspedes"
          />
        </>
      )}
      <div className={(isClient && !isDesktop && "pt-6") || ""}>
        <GuestsDataContainer />
      </div>
    </>
  );
}
