import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

import DashboardShell from "@/components/DashboardShell";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "StockPulse | Inventory & Product Management",
  description: "Modern production-grade SaaS Admin Dashboard for inventory management",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen flex flex-col antialiased">
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  );
}
