import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Navbar } from "@/features/navigation/components/Navbar";
import { Footer } from "@/features/navigation/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "8eyond Infinite | Exploring the Boundless Future",
  description: "8eyond Infinite is an organization dedicated to pushing the boundaries of human potential and technology through innovation and boundless creativity.",
};

import { GlobalInfinity } from "@/components/ui/GlobalInfinity";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black selection:bg-accent/30 selection:text-white`}>
        <SmoothScrollProvider>
          <GlobalInfinity />
          <CustomCursor />
          <Navbar />
          <main className="relative flex flex-col min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
