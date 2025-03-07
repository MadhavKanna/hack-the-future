"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Mail, Phone, Calendar, CreditCard } from "lucide-react"

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

interface UserCardProps {
  user: {
    id: string
    name: string
    email: string
    role: string
    status: string
    avatar?: string
    phone?: string
    joinDate?: string
    lastActive?: string
    socialCredit: number
    purchases: Purchase[]
    returns: Return[]
  }
  onClick: () => void
}

export function UserCard({ user, onClick }: UserCardProps) {
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

  const getSocialCreditColor = (score: number) => {
    if (score >= 800) return "text-green-600"
    if (score >= 600) return "text-blue-600"
    if (score >= 400) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div
      className="rounded-lg border bg-white p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            {user.avatar ? (
              <AvatarImage src={user.avatar} alt={user.name} />
            ) : (
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <h3 className="font-medium">{user.name}</h3>
            <div className="flex flex-wrap gap-2 pt-1">
              <Badge variant="outline">ID: {user.id}</Badge>
              <Badge variant={getRoleColor(user.role) as any}>{user.role}</Badge>
              <Badge variant={getStatusColor(user.status) as any}>{user.status}</Badge>
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full p-1 hover:bg-gray-100" onClick={(e) => e.stopPropagation()}>
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onClick}>View Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Edit User</DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Change Role</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" onClick={(e) => e.stopPropagation()}>
              Suspend User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-4 space-y-2 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <span>{user.email}</span>
        </div>
        {user.phone && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>{user.phone}</span>
          </div>
        )}
        {user.joinDate && (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Joined {user.joinDate}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          <span className="flex items-center gap-1">
            Social Credit:
            <span className={`font-medium ${getSocialCreditColor(user.socialCredit)}`}>{user.socialCredit}</span>
          </span>
        </div>
      </div>
      {user.lastActive && (
        <div className="mt-4 flex justify-between text-xs text-gray-400">
          <span>Last active: {user.lastActive}</span>
          <span>
            {user.purchases.length} purchases • {user.returns.length} returns
          </span>
        </div>
      )}
    </div>
  )
}

