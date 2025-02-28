import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { navbarItems } from "@/utils/constants";

import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export async function AppSidebar() {
  const user = await currentUser();

  if (!user) return null;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarGroupLabel>por Madre Teresa Hospice</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="hover:bg-transparent">
                <div className="!h-fit">
                  <Image
                    src={"/assets/svg/logo-blue.svg"}
                    height={25}
                    width={25}
                    alt="Logo"
                    unoptimized
                  />
                  <span className="text-xl font-bold">Hospicare</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Módulos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navbarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
