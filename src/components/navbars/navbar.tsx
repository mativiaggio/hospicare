"use client";

import React from "react";

import { MobileTopNavbar } from "./mobile-top-navbar";
import { DesktopNavbar } from "./desktop-navbar";
import { MobileBottomNavbar } from "./mobile-bottom-navbar";
import { useWindowSize } from "../../hooks/use-window-size";

const Navbar: React.FC = () => {
  const { width } = useWindowSize();
  const isDesktop = width !== undefined && width >= 1280;

  return (
    <>
      <header
        className={`fixed w-full !max-w-[${width}px] top-0 z-10 bg-main print:hidden min-h-[65px] h-fit border-b`}>
        {isDesktop ? <DesktopNavbar /> : <MobileTopNavbar width={width} />}
      </header>
      {!isDesktop && <MobileBottomNavbar width={width} />}
    </>
  );
};

export default Navbar;
