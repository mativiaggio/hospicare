import { PageTitle } from "@/components/page-title";
import PageWrapper from "@/components/page-wrapper";
import { Hospital } from "lucide-react";
import React from "react";

export default function SocialSecurityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageWrapper>
      <PageTitle
        title="Obras sociales"
        icon={<Hospital className="w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10" />}
        subtitle="Comienza a gestionar las obras sociales y prepagas"
      />
      {children}
    </PageWrapper>
  );
}
