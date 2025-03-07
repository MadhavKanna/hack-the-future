import type { ReactNode } from "react"
import { Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface ParameterCardProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function ParameterCard({ title, description, children, className }: ParameterCardProps) {
  return (
    <div className={cn("rounded-lg border bg-white p-4", className)}>
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{title}</h3>
          {description && (
            <div className="group relative">
              <Info className="h-4 w-4 text-gray-400" />
              <div className="absolute left-full top-0 z-10 ml-2 hidden w-64 rounded-md border bg-white p-2 text-xs shadow-md group-hover:block">
                {description}
              </div>
            </div>
          )}
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

