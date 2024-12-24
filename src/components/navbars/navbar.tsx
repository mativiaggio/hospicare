"use client";

import React, { useEffect, useState } from "react";
import { MobileTopNavbar } from "./mobile-top-navbar";
import { DesktopNavbar } from "./desktop-navbar";
import { MobileBottomNavbar } from "./mobile-bottom-navbar";
import { useWindowSize } from "../../hooks/use-window-size";

const Navbar: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isDesktop = width !== undefined && width >= 1280;

  return (
    <>
      <header className="fixed w-full top-0 z-10 bg-main print:hidden min-h-[65px] h-fit border-b">
        {isClient && isDesktop ? (
          <DesktopNavbar />
        ) : (
          <MobileTopNavbar width={width} />
        )}
      </header>
      {isClient && !isDesktop && <MobileBottomNavbar width={width} />}
    </>
  );
};

export default Navbar;
