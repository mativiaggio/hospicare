import { QueryProvider } from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Define metadata for the page
export const metadata: Metadata = {
  title: "Hospicare por Hospice Madre Teresa",
  description:
    "La aplicación de gestion de huéspedes del Hospice Madre Teresa.",
  keywords: [
    "gestión médica",
    "software",
    "salud",
    "cuidado paliativo",
    "Hospice Madre Teresa",
    "Hospicare",
  ],
  authors: [{ name: "Hospice Madre Teresa" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://hospicare-hmt.vercel.app/",
    title: "Hospicare por Hospice Madre Teresa",
    description:
      "La aplicación de gestión médica segura y eficiente del Hospice Madre Teresa.",
    images: [
      {
        url: "https://hospicemadreteresa.org.ar/wp-content/uploads/2017/07/bg-frente-casa-hospice.jpg",
        width: 1200,
        height: 630,
        alt: "Hospicare por Hospice Madre Teresa",
      },
    ],
    siteName: "Hospicare",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hospicare por Hospice Madre Teresa",
    description:
      "La aplicación de gestión médica segura y eficiente del Hospice Madre Teresa.",
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
};

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(plusJakartaSans.className, "antialiased min-h-screen")}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
