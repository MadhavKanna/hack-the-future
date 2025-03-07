import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon?: ReactNode
  className?: string
  valueClassName?: string
}

export function StatCard({ title, value, icon, className, valueClassName }: StatCardProps) {
  return (
    <div className={cn("flex items-center gap-3 rounded-md bg-white p-4", className)}>
      {icon && <div className="flex h-10 w-10 items-center justify-center">{icon}</div>}
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">{title}</span>
        <span className={cn("text-xl font-semibold", valueClassName)}>{value}</span>
      </div>
    </div>
  )
}

