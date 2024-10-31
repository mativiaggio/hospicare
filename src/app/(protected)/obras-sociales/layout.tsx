import React from "react";

export default function SocialSecurityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="page-wrapper">{children}</div>;
}
