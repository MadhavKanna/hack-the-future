"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UserFilterProps {
  onFilterChange: (filters: {
    search: string
    role: string
    status: string
  }) => void
}

export function UserFilter({ onFilterChange }: UserFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [search, setSearch] = useState("")
  const [role, setRole] = useState("")
  const [status, setStatus] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    onFilterChange({ search: e.target.value, role, status })
  }

  const handleRoleChange = (value: string) => {
    setRole(value)
    onFilterChange({ search, role: value, status })
  }

  const handleStatusChange = (value: string) => {
    setStatus(value)
    onFilterChange({ search, role, status: value })
  }

  const clearFilters = () => {
    setSearch("")
    setRole("")
    setStatus("")
    onFilterChange({ search: "", role: "", status: "" })
  }

  const hasFilters = search || role || status

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search users..." value={search} onChange={handleSearchChange} className="pl-10" />
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
          {hasFilters && (
            <Button variant="outline" size="icon" onClick={clearFilters}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 gap-4 rounded-md border bg-white p-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <Select value={role} onValueChange={handleRoleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
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
                  onFilterChange({ search: "", role, status })
                }}
              />
            </Badge>
          )}
          {role && (
            <Badge variant="outline" className="flex items-center gap-1">
              Role: {role}
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => {
                  setRole("")
                  onFilterChange({ search, role: "", status })
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
                  onFilterChange({ search, role, status: "" })
                }}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}

