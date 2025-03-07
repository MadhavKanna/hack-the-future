import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { ArrowDown, ArrowUp } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  icon?: ReactNode
  className?: string
}

export function MetricCard({ title, value, change, icon, className }: MetricCardProps) {
  return (
    <div className={cn("rounded-lg border bg-white p-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">{icon}</div>}
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
          </div>
        </div>
        {typeof change !== "undefined" && (
          <div
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
              change >= 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600",
            )}
          >
            {change >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
    </div>
  )
}

