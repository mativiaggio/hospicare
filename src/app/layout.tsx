import { QueryProvider } from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { env } from "@/env.config";

// Define metadata for the page
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
    url: "https://hospicare-hmt.vercel.app/",
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

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          plusJakartaSans.className,
          "antialiased text-lg print:!mt-0 bg-main"
        )}>
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
