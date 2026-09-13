"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Boxes,
  BarChart3,
  Settings,
  Bell,
  Calendar,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

interface DashboardShellProps {
  children: React.ReactNode;
}

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Products", icon: Package, active: false },
  { label: "Inventory", icon: Boxes, active: false },
  { label: "Analytics", icon: BarChart3, active: false },
  { label: "Settings", icon: Settings, active: false },
];

export default function DashboardShell({ children }: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Formatted current date
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-zinc-50/70 dark:bg-zinc-950 flex flex-col text-foreground">
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar for Desktop & Mobile Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-card border-r border-border/80 flex flex-col transition-transform duration-200 ease-in-out md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 border-b border-border/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-xs">
              <Boxes className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight leading-none">
                HelalStock
              </span>
              <span className="text-[11px] text-muted-foreground font-medium mt-0.5">
                Inventory SaaS
              </span>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Main Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                }`}
              >
                <Icon className="size-4.5 shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.active && (
                  <span className="size-1.5 rounded-full bg-primary-foreground" />
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer User Card */}
        <div className="p-4 border-t border-border/70">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-muted/50 border border-border/50">
            <div className="relative size-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
              AM
              <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-card" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate leading-tight">
                Helal Ahmed
              </p>
              <p className="text-[11px] text-muted-foreground truncate flex items-center gap-1 mt-0.5">
                <ShieldCheck className="size-3 text-emerald-600" />
                Store Admin
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Top Navbar */}
      <header className="sticky top-0 z-30 h-16 bg-card/85 backdrop-blur-md border-b border-border/70 md:pl-64 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>

          {/* Breadcrumbs */}
          <nav className="flex items-center text-xs sm:text-sm text-muted-foreground font-medium">
            <span className="hover:text-foreground cursor-pointer">
              Dashboard
            </span>
            <ChevronRight className="size-3.5 mx-1.5 text-muted-foreground/60" />
            <span className="text-foreground font-semibold">
              Products &amp; Inventory
            </span>
          </nav>
        </div>

        {/* Right Header: Date, Notifications, Profile Avatar */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-lg border border-border/40">
            <Calendar className="size-3.5 text-muted-foreground" />
            <span>{today}</span>
          </div>

          <button
            type="button"
            className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="View notifications"
          >
            <Bell className="size-4.5" />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-blue-600 ring-2 ring-card" />
          </button>

          <div className="size-8 rounded-full bg-primary text-primary-foreground font-semibold text-xs flex items-center justify-center shadow-xs">
            AM
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="md:pl-64 flex-1 flex flex-col">{children}</div>
    </div>
  );
}
