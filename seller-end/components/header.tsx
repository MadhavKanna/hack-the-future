import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <div className="flex h-16 items-center justify-between px-4">
      <div className="flex w-full items-center gap-4">
        {/* Search bar - hidden on mobile */}
        <div className="relative hidden md:block md:w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search product, supplier, order"
            className="pl-10"
          />
        </div>

        {/* Mobile search button */}
        <button className="rounded-full p-2 hover:bg-gray-100 md:hidden">
          <Search className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="rounded-full p-2 hover:bg-gray-100">
          <Bell className="h-5 w-5 text-gray-600" />
        </button>
        <div className="h-8 w-8 overflow-hidden rounded-full">
          <img
            src="/placeholder.svg?height=32&width=32"
            alt="User"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
