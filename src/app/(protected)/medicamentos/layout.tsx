import { PageTitle } from "@/components/page-title";
import PageWrapper from "@/components/page-wrapper";
import { PillBottle } from "lucide-react";
import React from "react";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageWrapper>
      <PageTitle
        title="Medicamentos"
        icon={<PillBottle className="w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10" />}
        subtitle="Comienza a gestionar los medicamentos"
      />
      {children}
    </PageWrapper>
  );
}
