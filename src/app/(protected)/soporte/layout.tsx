import { PageTitle } from "@/components/page-title";
import PageWrapper from "@/components/page-wrapper";
import React from "react";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageWrapper>
      <PageTitle
        title="Tickets 🎫"
        subtitle="Comienza a gestionar los tickets para soporte"
      />
      {children}
    </PageWrapper>
  );
}
