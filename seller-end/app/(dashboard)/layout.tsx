"use client"

import type React from "react"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Scroll to top when pathname changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarNav />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  )
}

