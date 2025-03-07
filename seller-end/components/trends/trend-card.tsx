import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { TrendIndicator } from "./trend-indicator"

interface TrendCardProps {
  title: string
  value: string | number
  trend: number
  period?: string
  children?: ReactNode
  reversed?: boolean
  className?: string
}

export function TrendCard({
  title,
  value,
  trend,
  period = "vs last period",
  reversed = false,
  children,
  className,
}: TrendCardProps) {
  return (
    <div className={cn("rounded-lg border bg-white p-4", className)}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
        <TrendIndicator value={trend} reversed={reversed} />
      </div>
      {period && <p className="mb-4 text-xs text-gray-500">{period}</p>}
      {children}
    </div>
  )
}

