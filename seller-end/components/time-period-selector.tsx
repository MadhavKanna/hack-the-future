"use client"
import { Calendar, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface TimePeriodSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function TimePeriodSelector({ value, onChange }: TimePeriodSelectorProps) {
  const timePeriods = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "last_7_days", label: "Last 7 Days" },
    { value: "last_30_days", label: "Last 30 Days" },
    { value: "last_90_days", label: "Last 90 Days" },
    { value: "this_year", label: "This Year" },
    { value: "all_time", label: "All Time" },
  ]

  const getLabel = (value: string) => {
    const period = timePeriods.find((p) => p.value === value)
    return period ? period.label : "Select Period"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{getLabel(value)}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {timePeriods.map((period) => (
          <DropdownMenuItem
            key={period.value}
            onClick={() => onChange(period.value)}
            className={value === period.value ? "bg-gray-100" : ""}
          >
            {period.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

