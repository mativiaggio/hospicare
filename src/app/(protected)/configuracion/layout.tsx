import PageWrapper from "@/components/page-wrapper";
import SidebarComponent from "@/components/sidebar";
import { AdminSettingLinks, SettingLinks } from "@/constants";

import React from "react";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarComponent links={SettingLinks} adminLinks={AdminSettingLinks}>
      <PageWrapper>{children}</PageWrapper>
    </SidebarComponent>
  );
}
