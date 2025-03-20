"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Cpu,
  BarChart2,
  TrendingUp,
  Users,
  Flag,
  Settings,
  LogOut,
  ArrowDownLeft,
  ShoppingBag,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

// Define the navigation items
const navItems = [
  {
    title: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "AI Parameters",
    href: "/ai-parameters",
    icon: Cpu,
  },
  {
    title: "Finances",
    icon: BarChart2,
    submenu: [
      {
        title: "Overview",
        href: "/finances",
        icon: BarChart2,
      },
      {
        title: "Purchases Management",
        href: "/purchases-management",
        icon: ShoppingBag,
      },
      {
        title: "Returns Management",
        href: "/returns-management",
        icon: ArrowDownLeft,
      },
    ],
  },
  {
    title: "Trends",
    href: "/trends",
    icon: TrendingUp,
  },
  {
    title: "User List",
    href: "/user-list",
    icon: Users,
  },
  {
    title: "Flagged for Review",
    href: "/flagged-for-review",
    icon: Flag,
  },
];

export function SidebarNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>("Finances"); // Default open for demo

  // Check if the current path is under a submenu and open that submenu
  useEffect(() => {
    for (const item of navItems) {
      if (item.submenu) {
        const isInSubmenu = item.submenu.some(
          (subItem) =>
            pathname === subItem.href || pathname.startsWith(subItem.href + "/")
        );

        if (isInSubmenu) {
          setOpenSubmenu(item.title);
          break;
        }
      }
    }
  }, [pathname]);

  const toggleSubmenu = (title: string, navigate = false) => {
    if (navigate) {
      // If navigate is true, find the first submenu item and navigate to it
      const item = navItems.find((item) => item.title === title);
      if (item && item.submenu && item.submenu.length > 0) {
        const firstSubItem = item.submenu[0];
        router.push(firstSubItem.href);
      }
    }

    // Toggle the submenu state
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white lg:w-64 md:w-20 fixed top-0 left-0 z-[60]">
      <div className="flex-shrink-0 p-4">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto scrollbar-none">
        {navItems.map((item) => (
          <div key={item.title}>
            {item.submenu ? (
              <div className="space-y-1">
                <div
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-3 text-sm font-medium",
                    pathname.startsWith(
                      `/${item.title.toLowerCase().replace(/\s+/g, "-")}`
                    )
                      ? "bg-blue-50 text-[#0088CC]"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <div
                    className="flex items-center flex-1 cursor-pointer min-h-[40px]"
                    onClick={() => toggleSubmenu(item.title, true)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    <span className="md:hidden lg:inline">{item.title}</span>
                  </div>
                  <div
                    className="cursor-pointer p-2 md:hidden lg:block"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSubmenu(item.title);
                    }}
                  >
                    {openSubmenu === item.title ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                </div>
                {openSubmenu === item.title && (
                  <div className="ml-6 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={cn(
                          "flex items-center rounded-md px-3 py-3 text-sm font-medium min-h-[40px]",
                          pathname === subItem.href
                            ? "bg-blue-50 text-[#0088CC]"
                            : "text-gray-600 hover:bg-gray-100"
                        )}
                      >
                        <subItem.icon className="mr-3 h-5 w-5" />
                        <span className="md:hidden lg:inline">
                          {subItem.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-3 text-sm font-medium min-h-[40px]",
                  pathname === item.href
                    ? "bg-blue-50 text-[#0088CC]"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span className="md:hidden lg:inline">{item.title}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
      <div className="border-t p-4">
        <Link
          href="/settings"
          className={cn(
            "flex items-center rounded-md px-3 py-3 text-sm font-medium min-h-[40px]",
            pathname === "/settings"
              ? "bg-blue-50 text-[#0088CC]"
              : "text-gray-600 hover:bg-gray-100"
          )}
        >
          <Settings className="mr-3 h-5 w-5" />
          <span className="md:hidden lg:inline">Settings</span>
        </Link>
        <Link
          href="/logout"
          className="flex items-center rounded-md px-3 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 min-h-[40px]"
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span className="md:hidden lg:inline">Log Out</span>
        </Link>
      </div>
    </div>
  );
}
