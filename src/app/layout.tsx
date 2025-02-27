import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { esMX } from "@clerk/localizations";

import { ThemeProvider } from "@/providers/theme-provider";
import { env } from "@/lib/env.config";
import ModalProvider from "@/providers/modal-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: env.APP_TITLE,
  description:
    "La aplicación de gestion de huéspedes del Madre Teresa Hospice de Luján.",
  keywords: [
    "gestión médica",
    "software",
    "salud",
    "cuidado paliativo",
    "hospice madre teresa",
    "madre teresa hospice",
    "hospicare",
    "gestión de huéspedes",
  ],
  authors: [{ name: "Matías Viaggio" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://hospicare.com.ar/",
    title: env.APP_TITLE,
    description:
      "La aplicación de gestión médica segura y eficiente del Madre Teresa Hospice de Luján.",
    images: [
      {
        url: "https://hospicemadreteresa.org.ar/wp-content/uploads/2017/07/bg-frente-casa-hospice.jpg",
        width: 1200,
        height: 630,
        alt: env.APP_TITLE,
      },
    ],
    siteName: "Hospicare",
  },
  twitter: {
    card: "summary_large_image",
    title: env.APP_TITLE,
    description:
      "La aplicación de gestión médica segura y eficiente del Madre Teresa Hospice.",
    images: [
      "https://hospicemadreteresa.org.ar/wp-content/uploads/2017/07/bg-frente-casa-hospice.jpg",
    ],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "1I5vN8XfzHo9awJVBZa30hiGiyayFTx9_EoB8QtzLsg",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={esMX}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <ModalProvider>{children}</ModalProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
