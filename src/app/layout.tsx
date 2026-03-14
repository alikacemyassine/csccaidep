import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CSCC AI Department - Team Formation Portal",
  description: "Complete your profile to join balanced teams for research, workshops, and competitions in the CSCC AI Department.",
  keywords: ["CSCC", "AI Department", "Team Formation", "Machine Learning", "Student Portal"],
  authors: [{ name: "CSCC AI Department" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "CSCC AI Department - Team Formation",
    description: "Join balanced teams for research, workshops, and competitions",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
