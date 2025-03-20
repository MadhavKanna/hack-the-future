"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { SidebarNav } from "@/components/sidebar-nav";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Scroll to top when pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[55] bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn("md:block", sidebarOpen ? "block" : "hidden")}>
        <SidebarNav />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden md:pl-64 lg:pl-64">
        <div className="sticky top-0 z-50 flex items-center bg-white border-b">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="ml-4 md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          <div className="flex-1">
            <Header />
          </div>
        </div>
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}
