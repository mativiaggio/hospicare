"use client";
import { PageTitle } from "@/components/page-title";
import ViewStaffForm from "@/features/staff/components/view-staff-form";
import { useWindowSize } from "@/hooks/use-window-size";
import { useEffect, useState } from "react";

export default function StaffInputPage() {
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
            title="Editar Personal"
            subtitle="Completa el formulario para editar personal"
          />
        </div>
      )}
      <div className={(isClient && !isDesktop && "pt-6") || ""}>
        <ViewStaffForm />
      </div>
    </>
  );
}
