"use client";
import SocialSecurityDataContainer from "@/features/social_security/components/social-security-data-container";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/use-window-size";
import { PageTitle } from "@/components/page-title";
import { Hospital } from "lucide-react";

export default function SocialSecurityOutputPage() {
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
            title="Obras Sociales"
            icon={
              <Hospital className="w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10" />
            }
            subtitle="Comienza a gestionar las obras sociales"
          />
        </>
      )}

      <div className={(isClient && !isDesktop && "pt-6") || ""}>
        <SocialSecurityDataContainer />
      </div>
    </>
  );
}
