import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CursorGlow from "@/components/CursorGlow";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const inter = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "REVO | Leave Your Mark",
  description:
    "You showed up at 6 AM. Nobody saw it. Until now. REVO turns every run and walk into a visible mark on your neighbourhood's live map. Launching first in Mumbai.",
  openGraph: {
    title: "REVO | Leave Your Mark",
    description: "Every morning thousands move through this city. Every evening it disappeared. Not anymore.",
    url: "https://revo.run",
    siteName: "Revo",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "REVO | Leave Your Mark",
    description: "Every morning thousands move through this city. Every evening it disappeared. Not anymore.",
  },
  themeColor: "#1A1A2E",
  icons: {
    icon: "/main-logo-transparent.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased scroll-smooth" suppressHydrationWarning>
      <body className={`${bebasNeue.variable} ${inter.variable} antialiased font-sans bg-[#1A1A2E] text-white`}>
        <CursorGlow />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
