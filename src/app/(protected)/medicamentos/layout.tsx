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
        icon={<PillBottle className="w-10 h-10" />}
        subtitle="Comienza a gestionar los medicamentos"
      />
      {children}
    </PageWrapper>
  );
}
