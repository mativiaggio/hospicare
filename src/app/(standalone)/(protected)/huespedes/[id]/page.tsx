"use client";
import { PageTitle } from "@/components/page-title";
import ViewGuestForm from "@/features/guests/components/view-guest-form";
import { useWindowSize } from "@/hooks/use-window-size";
import { useEffect, useState } from "react";

export default function GuestDetailPage() {
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
            title="Editar Huésped"
            subtitle="Completa el formulario para editar un huésped"
          />
        </div>
      )}
      <div className={(isClient && !isDesktop && "pt-6") || ""}>
        <ViewGuestForm />
      </div>
    </>
  );
}
