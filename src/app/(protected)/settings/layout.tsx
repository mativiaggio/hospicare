import SidebarComponent from "@/components/sidebar";
import { SettingLinks } from "@/constants";

import React from "react";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SidebarComponent links={SettingLinks}>{children}</SidebarComponent>;
}
