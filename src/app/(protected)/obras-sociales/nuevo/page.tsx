"use client";
import { PageTitle } from "@/components/page-title";
import AddSocialSecurityForm from "@/features/social_security/components/add-social-security-form";
import { useWindowSize } from "@/hooks/use-window-size";
import { useEffect, useState } from "react";

export default function SocialSecurityInputPage() {
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
            title="Agregar Obra Social"
            subtitle="Completa el formulario para cargar una obra social"
          />
        </div>
      )}
      <div className={(isClient && !isDesktop && "pt-6") || ""}>
        <AddSocialSecurityForm />
      </div>
    </>
  );
}
