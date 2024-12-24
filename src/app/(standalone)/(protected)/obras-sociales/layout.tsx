import PageWrapper from "@/components/page-wrapper";
import React from "react";

export default function SocialSecurityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PageWrapper>{children}</PageWrapper>;
}
