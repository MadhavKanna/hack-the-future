import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ChartCardProps {
  title: string
  children: ReactNode
  className?: string
  action?: ReactNode
}

export function ChartCard({ title, children, className, action }: ChartCardProps) {
  return (
    <div className={cn("rounded-lg border bg-white p-4", className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        {action}
      </div>
      <div className="h-[200px]">{children}</div>
    </div>
  )
}

