"use client"

import type React from "react"
import { useState } from "react"
import { Search, Filter, Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ReturnsFilterProps {
  onFilterChange: (filters: {
    search: string
    status: string
    disposition: string
    dateRange: string
  }) => void
}

export function ReturnsFilter({ onFilterChange }: ReturnsFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [disposition, setDisposition] = useState("")
  const [dateRange, setDateRange] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    onFilterChange({ search: e.target.value, status, disposition, dateRange })
  }

  const handleStatusChange = (value: string) => {
    setStatus(value)
    onFilterChange({ search, status: value, disposition, dateRange })
  }

  const handleDispositionChange = (value: string) => {
    setDisposition(value)
    onFilterChange({ search, status, disposition: value, dateRange })
  }

  const handleDateRangeChange = (value: string) => {
    setDateRange(value)
    onFilterChange({ search, status, disposition, dateRange: value })
  }

  const clearFilters = () => {
    setSearch("")
    setStatus("")
    setDisposition("")
    setDateRange("")
    onFilterChange({ search: "", status: "", disposition: "", dateRange: "" })
  }

  const hasFilters = search || status || disposition || dateRange

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search returns..." value={search} onChange={handleSearchChange} className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className={isExpanded ? "bg-gray-100" : ""}
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          {hasFilters && (
            <Button variant="outline" size="icon" onClick={clearFilters}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 gap-4 rounded-md border bg-white p-4 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Disposition Path</label>
            <Select value={disposition} onValueChange={handleDispositionChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select disposition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Paths</SelectItem>
                <SelectItem value="resell_new">Resell as New</SelectItem>
                <SelectItem value="resell_open_box">Resell as Open Box</SelectItem>
                <SelectItem value="refurbish">Refurbish</SelectItem>
                <SelectItem value="recycle">Recycle</SelectItem>
                <SelectItem value="salvage">Salvage Parts</SelectItem>
                <SelectItem value="donate">Donate</SelectItem>
                <SelectItem value="dispose">Dispose</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Date Range</label>
            <Select value={dateRange} onValueChange={handleDateRangeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {hasFilters && (
        <div className="flex flex-wrap gap-2">
          {search && (
            <Badge variant="outline" className="flex items-center gap-1">
              Search: {search}
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => {
                  setSearch("")
                  onFilterChange({ search: "", status, disposition, dateRange })
                }}
              />
            </Badge>
          )}
          {status && (
            <Badge variant="outline" className="flex items-center gap-1">
              Status: {status}
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => {
                  setStatus("")
                  onFilterChange({ search, status: "", disposition, dateRange })
                }}
              />
            </Badge>
          )}
          {disposition && (
            <Badge variant="outline" className="flex items-center gap-1">
              Disposition: {disposition.replace(/_/g, " ")}
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => {
                  setDisposition("")
                  onFilterChange({ search, status, disposition: "", dateRange })
                }}
              />
            </Badge>
          )}
          {dateRange && (
            <Badge variant="outline" className="flex items-center gap-1">
              Date: {dateRange}
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => {
                  setDateRange("")
                  onFilterChange({ search, status, disposition, dateRange: "" })
                }}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}

