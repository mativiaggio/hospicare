import Footer from "@/components/footer";
import Navbar from "@/components/navbars/navbar";
import { getCurrent } from "@/features/auth/actions";
import React from "react";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getCurrent();

  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
}
