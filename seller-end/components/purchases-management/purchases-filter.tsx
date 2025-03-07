"use client"

import type React from "react"
import { useState } from "react"
import { Search, Filter, Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PurchasesFilterProps {
  onFilterChange: (filters: {
    search: string
    status: string
    paymentMethod: string
    dateRange: string
  }) => void
}

export function PurchasesFilter({ onFilterChange }: PurchasesFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [dateRange, setDateRange] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    onFilterChange({ search: e.target.value, status, paymentMethod, dateRange })
  }

  const handleStatusChange = (value: string) => {
    setStatus(value)
    onFilterChange({ search, status: value, paymentMethod, dateRange })
  }

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value)
    onFilterChange({ search, status, paymentMethod: value, dateRange })
  }

  const handleDateRangeChange = (value: string) => {
    setDateRange(value)
    onFilterChange({ search, status, paymentMethod, dateRange: value })
  }

  const clearFilters = () => {
    setSearch("")
    setStatus("")
    setPaymentMethod("")
    setDateRange("")
    onFilterChange({ search: "", status: "", paymentMethod: "", dateRange: "" })
  }

  const hasFilters = search || status || paymentMethod || dateRange

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search purchases..." value={search} onChange={handleSearchChange} className="pl-10" />
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Payment Method</label>
            <Select value={paymentMethod} onValueChange={handlePaymentMethodChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="credit_card">Credit Card</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="store_credit">Store Credit</SelectItem>
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
                <SelectItem value="last_7_days">Last 7 Days</SelectItem>
                <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                <SelectItem value="last_90_days">Last 90 Days</SelectItem>
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
                  onFilterChange({ search: "", status, paymentMethod, dateRange })
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
                  onFilterChange({ search, status: "", paymentMethod, dateRange })
                }}
              />
            </Badge>
          )}
          {paymentMethod && (
            <Badge variant="outline" className="flex items-center gap-1">
              Payment: {paymentMethod.replace(/_/g, " ")}
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => {
                  setPaymentMethod("")
                  onFilterChange({ search, status, paymentMethod: "", dateRange })
                }}
              />
            </Badge>
          )}
          {dateRange && (
            <Badge variant="outline" className="flex items-center gap-1">
              Date: {dateRange.replace(/_/g, " ")}
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => {
                  setDateRange("")
                  onFilterChange({ search, status, paymentMethod, dateRange: "" })
                }}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}

