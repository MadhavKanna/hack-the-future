import { Search, ShoppingBag } from "lucide-react"

export function ShopifyHeader() {
  return (
    <header className="bg-[#008060] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center p-2">
          <div className="flex-shrink-0 mr-4">
            {/* Shopify Logo */}
            <svg className="h-8 w-auto" viewBox="0 0 109 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M36.678 9.333c-.037-.31-.31-.477-.525-.496-.214-.02-4.743-.358-4.743-.358s-3.143-3.12-3.49-3.467a1.26 1.26 0 00-1.125-.358c-.033 0-.063.008-.095.012l-1.92.59c-.456-1.305-1.26-2.492-2.67-2.492h-.125c-.4-.53-1.037-.73-1.7-.56-1.245.4-2.47 1.506-3.47 4.08-1.47.456-2.52.786-2.65.825-1.037.33-1.07.358-1.205 1.34-.1.735-2.73 21.033-2.73 21.033l20.913 3.93 11.32-2.457c0-.002-6.73-20.993-6.785-21.622zm-10.51-2.427s-2.19.67-4.82 1.47c0-.05-.006-.1-.006-.15-.214-1.14-.6-2.06-1.27-2.79 3.154.63 6.097 1.47 6.097 1.47zm-6.097-1.47c.67.73 1.1 1.77 1.27 3.19-3.06.94-6.4 1.96-6.4 1.96s2.19-4.23 5.13-5.15zm-1.77-1.34c.33 0 .6.07.85.2-2.52.78-5.25 4.53-6.4 7.32-1.68.52-3.28 1.01-4.74 1.46 1.03-3.5 3.5-9.02 10.29-9.02v.04z"
                fill="#fff"
              />
              <path
                d="M36.153 8.837c-.214-.02-4.743-.358-4.743-.358s-3.143-3.12-3.49-3.467c-.126-.126-.28-.22-.44-.28l-2.39 49.268 11.32-2.457s-6.73-20.993-6.785-21.622c-.037-.31-.31-.477-.525-.496 0 0 .037 0 0 0z"
                fill="#fff"
              />
              <path
                d="M22.037 16.33l-1.82 5.42s-1.6-.85-3.53-.85c-2.85 0-2.99 1.79-2.99 2.24 0 2.45 6.4 3.39 6.4 9.14 0 4.52-2.87 7.42-6.76 7.42-4.66 0-7.03-2.9-7.03-2.9l1.25-4.11s2.45 2.1 4.52 2.1c1.35 0 1.91-1.06 1.91-1.85 0-3.23-5.25-3.37-5.25-8.67 0-4.46 3.2-8.77 9.67-8.77 2.49 0 3.73.71 3.73.71l-.12.15zM58.009 27.8c-1.47-.79-2.21-1.47-2.21-2.39 0-1.18.97-1.94 2.5-1.94 1.77 0 3.35.73 3.35.73l1.24-3.82s-1.15-.9-4.52-.9c-4.7 0-7.97 2.69-7.97 6.47 0 2.15 1.52 3.78 3.55 4.94 1.65.94 2.23 1.62 2.23 2.6 0 1.03-.82 1.85-2.36 1.85-2.27 0-4.43-1.18-4.43-1.18l-1.33 3.85s1.98 1.33 5.31 1.33c4.85 0 8.32-2.39 8.32-6.67.03-2.33-1.77-3.97-3.68-4.87zM75.14 19.61c-2.39 0-4.26 1.13-5.71 2.84l-.07-.03 2.07-10.8h-5.31l-5.23 27.53h5.31l1.77-9.4c.7-3.53 2.54-5.71 4.26-5.71 1.21 0 1.68.82 1.68 2 0 .73-.06 1.65-.21 2.39l-2 10.72h5.31l2.07-10.98c.24-1.13.38-2.48.38-3.38.03-2.93-1.5-5.18-4.32-5.18zM89.81 19.61c-6.38 0-10.63 5.76-10.63 12.17 0 4.11 2.54 7.42 7.3 7.42 6.29 0 10.54-5.6 10.54-12.17.01-3.82-2.18-7.42-7.21-7.42zm-2.6 15.55c-1.83 0-2.6-1.56-2.6-3.5 0-3.08 1.59-8.08 4.52-8.08 1.92 0 2.54 1.65 2.54 3.29 0 3.38-1.59 8.29-4.46 8.29zM108.81 19.61c-3.58 0-5.6 3.14-5.6 3.14h-.06l.32-2.84h-4.7c-.24 1.92-.67 4.85-1.09 7.03l-3.73 19.64h5.31l1.5-7.94h.12s1.09.7 3.11.7c6.23 0 10.31-6.38 10.31-12.82 0-3.55-1.56-6.91-5.49-6.91zm-5.1 15.64c-1.38 0-2.18-.79-2.18-.79l.88-4.94c.62-3.29 2.33-5.49 4.17-5.49 1.62 0 2.12 1.5 2.12 2.9 0 3.41-2.03 8.32-4.99 8.32z"
                fill="#fff"
              />
            </svg>
          </div>

          <div className="flex items-center text-sm mr-4">
            <span className="text-white text-xs">Hello, Grace</span>
            <div className="flex items-center">
              <span className="font-bold ml-1">My Store</span>
            </div>
          </div>

          <div className="flex-1 flex">
            <div className="relative w-full">
              <input
                type="text"
                className="block w-full pl-3 pr-10 py-2 border border-transparent rounded-md leading-5 bg-white text-gray-900"
                placeholder="Search products"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="ml-4 flex items-center">
            <div className="mr-4 text-xs">
              <div className="font-bold">Orders</div>
            </div>
            <div className="mr-4 text-xs">
              <div className="font-bold">Products</div>
            </div>
            <div className="flex items-center">
              <ShoppingBag className="h-6 w-6 mr-1" />
              <span className="font-bold">Cart</span>
            </div>
          </div>
        </div>

        <nav className="flex space-x-6 px-4 py-1 text-sm bg-[#004C3F] overflow-x-auto">
          <a href="#" className="hover:text-[#C1F0D0]">
            Home
          </a>
          <a href="#" className="hover:text-[#C1F0D0]">
            Collections
          </a>
          <a href="#" className="hover:text-[#C1F0D0]">
            Products
          </a>
          <a href="#" className="hover:text-[#C1F0D0]">
            Orders
          </a>
          <a href="#" className="hover:text-[#C1F0D0]">
            Customers
          </a>
          <a href="#" className="hover:text-[#C1F0D0]">
            Analytics
          </a>
          <a href="#" className="hover:text-[#C1F0D0]">
            Marketing
          </a>
          <a href="#" className="hover:text-[#C1F0D0]">
            Discounts
          </a>
          <a href="#" className="hover:text-[#C1F0D0]">
            Apps
          </a>
        </nav>
      </div>
    </header>
  )
}

