import React from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import AutoBreadcrumb from "@/components/auto-breadcrumb";
import { Toaster } from "@/components/ui/toaster";
import { Notifications } from "@/modules/notifications/frontend/notifications";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col gap-4 w-full">
        <header className="flex justify-between items-center px-4 py-2 w-full border-b bg-primary-foreground">
          <SidebarTrigger className="border text-muted-foreground hover:text-primary" />
          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <Notifications />
            <ModeToggle variant="primary-outline" className="rounded-full" />
          </div>
        </header>
        <main className="px-4 flex flex-col gap-2">
          <AutoBreadcrumb />
          {children}
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default layout;
