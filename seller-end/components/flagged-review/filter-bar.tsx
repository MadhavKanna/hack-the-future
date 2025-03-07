"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter, Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterBarProps {
  onFilterChange: (filters: {
    search: string
    status: string
    confidence: string
    dateRange: string
  }) => void
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [confidence, setConfidence] = useState("")
  const [dateRange, setDateRange] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    onFilterChange({ search: e.target.value, status, confidence, dateRange })
  }

  const handleStatusChange = (value: string) => {
    setStatus(value)
    onFilterChange({ search, status: value, confidence, dateRange })
  }

  const handleConfidenceChange = (value: string) => {
    setConfidence(value)
    onFilterChange({ search, status, confidence: value, dateRange })
  }

  const handleDateRangeChange = (value: string) => {
    setDateRange(value)
    onFilterChange({ search, status, confidence, dateRange: value })
  }

  const clearFilters = () => {
    setSearch("")
    setStatus("")
    setConfidence("")
    setDateRange("")
    onFilterChange({ search: "", status: "", confidence: "", dateRange: "" })
  }

  const hasFilters = search || status || confidence || dateRange

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
                <SelectItem value="pending">Pending Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="more_info">More Info Needed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">AI Confidence</label>
            <Select value={confidence} onValueChange={handleConfidenceChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select confidence level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="low">Low (0-49%)</SelectItem>
                <SelectItem value="medium">Medium (50-79%)</SelectItem>
                <SelectItem value="high">High (80-100%)</SelectItem>
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
                  onFilterChange({ search: "", status, confidence, dateRange })
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
                  onFilterChange({ search, status: "", confidence, dateRange })
                }}
              />
            </Badge>
          )}
          {confidence && (
            <Badge variant="outline" className="flex items-center gap-1">
              Confidence: {confidence}
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => {
                  setConfidence("")
                  onFilterChange({ search, status, confidence: "", dateRange })
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
                  onFilterChange({ search, status, confidence, dateRange: "" })
                }}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}

