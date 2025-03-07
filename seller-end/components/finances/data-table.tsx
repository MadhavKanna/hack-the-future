import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface Column {
  key: string
  title: string
  render?: (value: any, row: any) => ReactNode
  className?: string
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  className?: string
}

export function DataTable({ columns, data, className }: DataTableProps) {
  return (
    <div className={cn("overflow-x-auto rounded-lg border bg-white", className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50 text-left text-sm font-medium text-gray-500">
            {columns.map((column) => (
              <th key={column.key} className={cn("px-4 py-3", column.className)}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex !== data.length - 1 ? "border-b" : ""}>
              {columns.map((column) => (
                <td key={`${rowIndex}-${column.key}`} className={cn("px-4 py-3", column.className)}>
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

