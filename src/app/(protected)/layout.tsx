import Navbar from "@/components/navbar";
import React from "react";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="px-4 py-2 sm:px-6 md:px-8 lg:px-10">{children}</div>
    </>
  );
}
