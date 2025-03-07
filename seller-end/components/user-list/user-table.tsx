"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Purchase {
  id: string
  date: string
  items: {
    name: string
    quantity: number
    price: number
  }[]
  total: number
  status: string
}

interface Return {
  id: string
  orderId: string
  date: string
  items: {
    name: string
    quantity: number
    price: number
    reason: string
    condition: string
  }[]
  total: number
  status: string
}

interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  avatar?: string
  phone?: string
  address?: string
  joinDate?: string
  lastActive?: string
  socialCredit: number
  purchases: Purchase[]
  returns: Return[]
}

interface UserTableProps {
  users: User[]
  onUserClick: (user: User) => void
}

export function UserTable({ users, onUserClick }: UserTableProps) {
  const [sortField, setSortField] = useState<keyof User>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedUsers = [...users].sort((a, b) => {
    const aValue = a[sortField] || ""
    const bValue = b[sortField] || ""

    if (aValue < bValue) {
      return sortDirection === "asc" ? -1 : 1
    }
    if (aValue > bValue) {
      return sortDirection === "asc" ? 1 : -1
    }
    return 0
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "success"
      case "inactive":
        return "warning"
      case "suspended":
        return "destructive"
      default:
        return "default"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "info"
      case "manager":
        return "secondary"
      case "staff":
        return "default"
      default:
        return "outline"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  const SortIcon = ({ field }: { field: keyof User }) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50 text-left text-sm font-medium text-gray-500">
            <th className="px-4 py-3">
              <div className="flex cursor-pointer items-center" onClick={() => handleSort("name")}>
                User
                <SortIcon field="name" />
              </div>
            </th>
            <th className="px-4 py-3">
              <div className="flex cursor-pointer items-center" onClick={() => handleSort("id")}>
                ID
                <SortIcon field="id" />
              </div>
            </th>
            <th className="px-4 py-3">
              <div className="flex cursor-pointer items-center" onClick={() => handleSort("email")}>
                Email
                <SortIcon field="email" />
              </div>
            </th>
            <th className="px-4 py-3">
              <div className="flex cursor-pointer items-center" onClick={() => handleSort("role")}>
                Role
                <SortIcon field="role" />
              </div>
            </th>
            <th className="px-4 py-3">
              <div className="flex cursor-pointer items-center" onClick={() => handleSort("status")}>
                Status
                <SortIcon field="status" />
              </div>
            </th>
            <th className="px-4 py-3">
              <div className="flex cursor-pointer items-center" onClick={() => handleSort("socialCredit")}>
                Social Credit
                <SortIcon field="socialCredit" />
              </div>
            </th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id} className="border-b cursor-pointer hover:bg-gray-50" onClick={() => onUserClick(user)}>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    {user.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.name} />
                    ) : (
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    )}
                  </Avatar>
                  <span className="font-medium">{user.name}</span>
                </div>
              </td>
              <td className="px-4 py-3">{user.id}</td>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">
                <Badge variant={getRoleColor(user.role) as any}>{user.role}</Badge>
              </td>
              <td className="px-4 py-3">
                <Badge variant={getStatusColor(user.status) as any}>{user.status}</Badge>
              </td>
              <td className="px-4 py-3">
                <div
                  className={`font-medium ${
                    user.socialCredit >= 800
                      ? "text-green-600"
                      : user.socialCredit >= 600
                        ? "text-blue-600"
                        : user.socialCredit >= 400
                          ? "text-yellow-600"
                          : "text-red-600"
                  }`}
                >
                  {user.socialCredit}
                </div>
              </td>
              <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onUserClick(user)}>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit User</DropdownMenuItem>
                    <DropdownMenuItem>Change Role</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">Suspend User</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

