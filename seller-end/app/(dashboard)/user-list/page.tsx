"use client"

import { useState } from "react"
import { UserPlus, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserFilter } from "@/components/user-list/user-filter"
import { UserTable } from "@/components/user-list/user-table"
import { UserCard } from "@/components/user-list/user-card"
import { UserDetailsModal } from "@/components/user-list/user-details-modal"

export default function UserListPage() {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")
  const [filters, setFilters] = useState({
    search: "",
    role: "",
    status: "",
  })
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showUserDetails, setShowUserDetails] = useState(false)

  // Sample user data with expanded information
  const users = [
    {
      id: "USR-1001",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Customer",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, Anytown, CA 94321",
      joinDate: "Jan 15, 2025",
      lastActive: "2 hours ago",
      socialCredit: 850,
      purchases: [
        {
          id: "ORD-5789",
          date: "Mar 4, 2025",
          items: [
            {
              name: "Premium Wireless Headphones",
              quantity: 1,
              price: 149.99,
            },
            {
              name: "Phone Case",
              quantity: 2,
              price: 19.99,
            },
          ],
          total: 189.97,
          status: "Delivered",
        },
        {
          id: "ORD-4532",
          date: "Feb 15, 2025",
          items: [
            {
              name: "Smart Watch Series 5",
              quantity: 1,
              price: 299.99,
            },
          ],
          total: 299.99,
          status: "Delivered",
        },
      ],
      returns: [
        {
          id: "RTN-1001",
          orderId: "ORD-4532",
          date: "Feb 20, 2025",
          items: [
            {
              name: "Smart Watch Series 5",
              quantity: 1,
              price: 299.99,
              reason: "Defective",
              condition: "Like New",
            },
          ],
          total: 299.99,
          status: "Approved",
        },
      ],
    },
    {
      id: "USR-1002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "VIP Customer",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Ave, Somewhere, NY 10001",
      joinDate: "Feb 3, 2025",
      lastActive: "5 minutes ago",
      socialCredit: 920,
      purchases: [
        {
          id: "ORD-6023",
          date: "Mar 3, 2025",
          items: [
            {
              name: "Designer Handbag",
              quantity: 1,
              price: 899.99,
            },
            {
              name: "Sunglasses",
              quantity: 1,
              price: 199.99,
            },
          ],
          total: 1099.98,
          status: "Delivered",
        },
        {
          id: "ORD-5877",
          date: "Feb 18, 2025",
          items: [
            {
              name: "Winter Coat",
              quantity: 1,
              price: 249.99,
            },
            {
              name: "Leather Boots",
              quantity: 1,
              price: 179.99,
            },
          ],
          total: 429.98,
          status: "Delivered",
        },
      ],
      returns: [],
    },
    {
      id: "USR-1003",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      role: "Customer",
      status: "Inactive",
      joinDate: "Mar 22, 2025",
      lastActive: "3 days ago",
      socialCredit: 450,
      purchases: [
        {
          id: "ORD-5901",
          date: "Mar 1, 2025",
          items: [
            {
              name: "Bluetooth Speaker",
              quantity: 1,
              price: 79.99,
            },
          ],
          total: 79.99,
          status: "Delivered",
        },
      ],
      returns: [
        {
          id: "RTN-1002",
          orderId: "ORD-5901",
          date: "Mar 5, 2025",
          items: [
            {
              name: "Bluetooth Speaker",
              quantity: 1,
              price: 79.99,
              reason: "Changed Mind",
              condition: "New",
            },
          ],
          total: 79.99,
          status: "Pending",
        },
      ],
    },
    {
      id: "USR-1004",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "Customer",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "Dec 10, 2024",
      lastActive: "1 day ago",
      socialCredit: 780,
      purchases: [
        {
          id: "ORD-5432",
          date: "Feb 25, 2025",
          items: [
            {
              name: "Yoga Mat",
              quantity: 1,
              price: 49.99,
            },
            {
              name: "Water Bottle",
              quantity: 1,
              price: 24.99,
            },
          ],
          total: 74.98,
          status: "Delivered",
        },
      ],
      returns: [],
    },
    {
      id: "USR-1005",
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      role: "Customer",
      status: "Active",
      joinDate: "Nov 5, 2024",
      lastActive: "Just now",
      socialCredit: 680,
      purchases: [
        {
          id: "ORD-5123",
          date: "Mar 2, 2025",
          items: [
            {
              name: "Gaming Console",
              quantity: 1,
              price: 499.99,
            },
            {
              name: "Controller",
              quantity: 2,
              price: 59.99,
            },
          ],
          total: 619.97,
          status: "Shipped",
        },
      ],
      returns: [],
    },
    {
      id: "USR-1006",
      name: "Sarah Brown",
      email: "sarah.brown@example.com",
      role: "Customer",
      status: "Suspended",
      joinDate: "Feb 18, 2025",
      lastActive: "1 week ago",
      socialCredit: 320,
      purchases: [
        {
          id: "ORD-4987",
          date: "Feb 20, 2025",
          items: [
            {
              name: "Smartphone",
              quantity: 1,
              price: 899.99,
            },
          ],
          total: 899.99,
          status: "Delivered",
        },
      ],
      returns: [
        {
          id: "RTN-1003",
          orderId: "ORD-4987",
          date: "Feb 28, 2025",
          items: [
            {
              name: "Smartphone",
              quantity: 1,
              price: 899.99,
              reason: "Not as Described",
              condition: "Used",
            },
          ],
          total: 899.99,
          status: "Rejected",
        },
      ],
    },
    {
      id: "USR-1007",
      name: "David Miller",
      email: "david.miller@example.com",
      role: "Customer",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "Jan 30, 2025",
      lastActive: "3 hours ago",
      socialCredit: 720,
      purchases: [
        {
          id: "ORD-4876",
          date: "Feb 15, 2025",
          items: [
            {
              name: "Laptop",
              quantity: 1,
              price: 1299.99,
            },
            {
              name: "Laptop Bag",
              quantity: 1,
              price: 49.99,
            },
          ],
          total: 1349.98,
          status: "Delivered",
        },
      ],
      returns: [],
    },
    {
      id: "USR-1008",
      name: "Lisa Taylor",
      email: "lisa.taylor@example.com",
      role: "Customer",
      status: "Active",
      joinDate: "Mar 15, 2025",
      lastActive: "2 days ago",
      socialCredit: 650,
      purchases: [
        {
          id: "ORD-5234",
          date: "Mar 16, 2025",
          items: [
            {
              name: "Coffee Maker",
              quantity: 1,
              price: 129.99,
            },
          ],
          total: 129.99,
          status: "Processing",
        },
      ],
      returns: [],
    },
  ]

  // Filter users based on search, role, and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      !filters.search ||
      user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.id.toLowerCase().includes(filters.search.toLowerCase())

    const matchesRole =
      !filters.role || filters.role === "all" || user.role.toLowerCase() === filters.role.toLowerCase()

    const matchesStatus =
      !filters.status || filters.status === "all" || user.status.toLowerCase() === filters.status.toLowerCase()

    return matchesSearch && matchesRole && matchesStatus
  })

  const handleUserClick = (user: any) => {
    setSelectedUser(user)
    setShowUserDetails(true)
  }

  const closeUserDetails = () => {
    setShowUserDetails(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-xl font-semibold">User Management</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      <UserFilter onFilterChange={setFilters} />

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{filteredUsers.length}</span> of{" "}
          <span className="font-medium">{users.length}</span> users
        </div>
        <div className="flex items-center gap-2 rounded-md border bg-white p-1">
          <Button variant={viewMode === "table" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("table")}>
            <List className="mr-1 h-4 w-4" />
            List
          </Button>
          <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid className="mr-1 h-4 w-4" />
            Grid
          </Button>
        </div>
      </div>

      {viewMode === "table" ? (
        <UserTable users={filteredUsers} onUserClick={handleUserClick} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} onClick={() => handleUserClick(user)} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span>{" "}
          of <span className="font-medium">{users.length}</span> users
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-primary text-white">
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && <UserDetailsModal user={selectedUser} isOpen={showUserDetails} onClose={closeUserDetails} />}
    </div>
  )
}

