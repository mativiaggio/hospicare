import AdminSidebar from "@/components/sidebar";
import BlurPage from "@/components/blur-page";
import React from "react";
import InfoBar from "@/components/infobar";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center">
      <div className="h-screen w-screen">
        <AdminSidebar />
        <div className="md:pl-[300px]">
          <InfoBar />
          <div className="relative">
            <BlurPage>{children}</BlurPage>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
