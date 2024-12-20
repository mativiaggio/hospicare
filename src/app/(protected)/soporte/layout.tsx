import { PageTitle } from "@/components/page-title";
import PageWrapper from "@/components/page-wrapper";
import { TicketIcon } from "lucide-react";
import React from "react";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageWrapper>
      <PageTitle
        title="Tickets"
        icon={<TicketIcon className="w-10 h-10" />}
        subtitle="Comienza a gestionar los tickets para soporte"
      />
      {children}
    </PageWrapper>
  );
}
