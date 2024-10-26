"use client";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";

import React, { ReactNode, useState } from "react";

interface RootLayoutProps {
  children: React.ReactNode;
  links: Links[];
}

interface Links {
  label: string;
  href: string;
  icon: ReactNode;
}

export default function SidebarComponent({ children, links }: RootLayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-none md:flex-row",
        "h-fit min-h-screen"
      )}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-2 flex-col overflow-y-auto overflow-x-hidden">
            <div className="flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  labelClassName="text-xl md:text-base"
                />
              ))}
            </div>
          </div>
          <div></div>
        </SidebarBody>
      </Sidebar>
      <Content>{children}</Content>
    </div>
  );
}

const Content: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex w-full flex-1 border-l border-muted-foregroun">
      <div className="page-wrapper">{children}</div>
    </div>
  );
};
