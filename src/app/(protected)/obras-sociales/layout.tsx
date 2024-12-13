import { PageTitle } from "@/components/page-title";
import PageWrapper from "@/components/page-wrapper";
import React from "react";

export default function SocialSecurityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageWrapper>
      <PageTitle
        title="Obras sociales 🏥"
        subtitle="Comienza a gestionar las obras sociales y prepagas"
      />
      {children}
    </PageWrapper>
  );
}
