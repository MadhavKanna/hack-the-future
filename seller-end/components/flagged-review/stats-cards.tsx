import { AlertCircle, CheckCircle, XCircle, Clock } from "lucide-react"

interface StatsCardsProps {
  stats: {
    pending: number
    approved: number
    rejected: number
    moreInfo: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-blue-100 p-2">
            <AlertCircle className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending Review</p>
            <p className="text-2xl font-bold">{stats.pending}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-green-100 p-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Approved</p>
            <p className="text-2xl font-bold">{stats.approved}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-red-100 p-2">
            <XCircle className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Rejected</p>
            <p className="text-2xl font-bold">{stats.rejected}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-yellow-100 p-2">
            <Clock className="h-5 w-5 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">More Info Needed</p>
            <p className="text-2xl font-bold">{stats.moreInfo}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

