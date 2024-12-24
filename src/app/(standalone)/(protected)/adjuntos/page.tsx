"use client";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/use-window-size";
import { PageTitle } from "@/components/page-title";
import { Hospital } from "lucide-react";
import FilesDataContainer from "@/features/files/components/files-data-container";

export default function FilesOutputPage() {
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
            title="Adjuntos"
            icon={
              <Hospital className="w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10" />
            }
            subtitle="Consulta adjuntos"
          />
        </>
      )}

      <div className={(isClient && !isDesktop && "pt-6") || ""}>
        <FilesDataContainer />
      </div>
    </>
  );
}
