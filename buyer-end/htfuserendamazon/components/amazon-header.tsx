import { Search } from "lucide-react"

export function AmazonHeader() {
  return (
    <header className="bg-[#131921] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center p-2">
          <div className="flex-shrink-0 mr-4">
            <svg className="h-8 w-24" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M72.2,25.3c-5.5,4-13.4,6.2-20.3,6.2c-9.6,0-18.3-3.5-24.8-9.4c-0.5-0.5-0.1-1.1,0.6-0.7c7.1,4.1,15.8,6.6,24.8,6.6c6.1,0,12.8-1.3,18.9-3.9C72.4,23.7,73.2,24.6,72.2,25.3z"
                fill="#FF9900"
              />
              <path
                d="M74.9,22.3c-0.7-0.9-4.6-0.4-6.4-0.2c-0.5,0.1-0.6-0.4-0.1-0.7c3.1-2.2,8.2-1.6,8.8-0.8c0.6,0.8-0.2,6.1-3.2,8.7c-0.5,0.4-0.9,0.2-0.7-0.3C74,27.4,75.6,23.2,74.9,22.3z"
                fill="#FF9900"
              />
              <path
                d="M67.2,3.3v-2c0-0.3,0.2-0.5,0.5-0.5h9.6c0.3,0,0.5,0.2,0.5,0.5v1.7c0,0.3-0.3,0.7-0.7,1.3l-5,7.1c1.9-0.1,3.8,0.2,5.5,1.2c0.4,0.2,0.5,0.6,0.5,0.9v2.1c0,0.3-0.3,0.7-0.7,0.5c-2.9-1.5-6.7-1.7-9.8,0c-0.3,0.2-0.7-0.2-0.7-0.5v-2c0-0.3,0-0.9,0.4-1.4l5.7-8.2h-5c-0.3,0-0.5-0.2-0.5-0.5L67.2,3.3z"
                fill="white"
              />
              <path
                d="M24.4,16.1h-2.9c-0.3,0-0.5-0.2-0.5-0.5V1.3c0-0.3,0.2-0.5,0.5-0.5h2.7c0.3,0,0.5,0.2,0.5,0.5v1.9h0.1c0.7-1.9,2-2.7,3.8-2.7c1.8,0,2.9,0.9,3.7,2.7c0.7-1.9,2.3-2.7,3.9-2.7c1.2,0,2.5,0.5,3.3,1.6c0.9,1.2,0.7,3,0.7,4.6v9.3c0,0.3-0.2,0.5-0.5,0.5h-2.9c-0.3,0-0.5-0.2-0.5-0.5V8.3c0-0.7,0.1-2.3-0.1-2.9c-0.2-1-0.8-1.3-1.6-1.3c-0.7,0-1.4,0.5-1.7,1.2c-0.3,0.8-0.3,2.1-0.3,3v7.3c0,0.3-0.2,0.5-0.5,0.5h-2.9c-0.3,0-0.5-0.2-0.5-0.5V8.3c0-1.8,0.3-4.5-2-4.5c-2.3,0-2.2,2.6-2.2,4.5v7.3C24.9,15.9,24.7,16.1,24.4,16.1z"
                fill="white"
              />
              <path
                d="M89.1,1.1c4.3,0,6.7,3.7,6.7,8.4c0,4.6-2.6,8.2-6.7,8.2c-4.3,0-6.6-3.7-6.6-8.3C82.5,4.8,84.9,1.1,89.1,1.1z M89.1,4.2c-2.2,0-2.3,3-2.3,4.8c0,1.8,0,5.8,2.3,5.8c2.3,0,2.4-3.2,2.4-5.1c0-1.3,0-2.8-0.4-4C90.7,4.5,90,4.2,89.1,4.2z"
                fill="white"
              />
              <path
                d="M101.8,16.1h-2.9c-0.3,0-0.5-0.2-0.5-0.5V1.3c0-0.3,0.2-0.5,0.5-0.5h2.7c0.2,0,0.4,0.2,0.5,0.4v2h0.1c0.8-2,1.9-3,3.9-3c1.3,0,2.5,0.5,3.3,1.8c0.7,1.2,0.7,3.3,0.7,4.8v9.7c0,0.3-0.2,0.5-0.5,0.5h-2.9c-0.3,0-0.5-0.2-0.5-0.5V8.3c0-1.8,0.2-4.5-2-4.5c-0.8,0-1.5,0.5-1.9,1.3c-0.5,1-0.5,2-0.5,3.2v7.2C102.3,15.9,102.1,16.1,101.8,16.1z"
                fill="white"
              />
              <path
                d="M54.1,8.3c0-1.1,0-2.1-0.5-3.1c-0.4-0.8-1.1-1.3-1.9-1.3c-2.2,0-2,3-2,4.5v7.3c0,0.3-0.2,0.5-0.5,0.5h-2.9c-0.3,0-0.5-0.2-0.5-0.5V1.3c0-0.3,0.2-0.5,0.5-0.5h2.7c0.3,0,0.5,0.2,0.5,0.5v1.9h0.1c0.7-1.9,1.7-2.7,3.9-2.7c1.3,0,2.5,0.5,3.3,1.8c0.7,1.2,0.7,3.3,0.7,4.8v9.7c0,0.3-0.2,0.5-0.5,0.5h-2.9c-0.3,0-0.5-0.2-0.5-0.5V8.3z"
                fill="white"
              />
              <path
                d="M14.1,8.3c0-1.1,0-2.1-0.5-3.1c-0.4-0.8-1.1-1.3-1.9-1.3c-2.2,0-2,3-2,4.5v7.3c0,0.3-0.2,0.5-0.5,0.5H6.3c-0.3,0-0.5-0.2-0.5-0.5V1.3c0-0.3,0.2-0.5,0.5-0.5H9c0.3,0,0.5,0.2,0.5,0.5v1.9h0.1c0.7-1.9,1.7-2.7,3.9-2.7c1.3,0,2.5,0.5,3.3,1.8c0.7,1.2,0.7,3.3,0.7,4.8v9.7c0,0.3-0.2,0.5-0.5,0.5h-2.9c-0.3,0-0.5-0.2-0.5-0.5V8.3z"
                fill="white"
              />
            </svg>
          </div>

          <div className="flex items-center text-sm mr-4">
            <span className="text-gray-400 text-xs">Deliver to Grace</span>
            <div className="flex items-center">
              <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor" />
              </svg>
              <span className="font-bold">New York 10035</span>
            </div>
          </div>

          <div className="flex-1 flex">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <select className="h-full py-0 pl-2 pr-7 border-transparent bg-gray-100 text-gray-700 rounded-l-md">
                  <option>All</option>
                </select>
              </div>
              <input
                type="text"
                className="block w-full pl-20 pr-3 py-2 border border-transparent rounded-md leading-5 bg-white text-gray-900"
                placeholder="Search Amazon"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button className="p-2 bg-[#febd69] hover:bg-[#f3a847] rounded-r-md">
                  <Search className="h-5 w-5 text-gray-800" />
                </button>
              </div>
            </div>
          </div>

          <div className="ml-4 flex items-center">
            <div className="mr-4 text-xs">
              <div>Hello, grace</div>
              <div className="font-bold">Account & Lists</div>
            </div>
            <div className="mr-4 text-xs">
              <div>Returns</div>
              <div className="font-bold">& Orders</div>
            </div>
            <div className="flex items-center">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
                  fill="currentColor"
                />
              </svg>
              <span className="font-bold">Cart</span>
            </div>
          </div>
        </div>

        <nav className="flex space-x-6 px-4 py-1 text-sm bg-[#232f3e] overflow-x-auto">
          <a href="#" className="hover:text-[#febd69]">
            All
          </a>
          <a href="#" className="hover:text-[#febd69]">
            Customer Service
          </a>
          <a href="#" className="hover:text-[#febd69]">
            Prime Video
          </a>
          <a href="#" className="hover:text-[#febd69]">
            Best Sellers
          </a>
          <a href="#" className="hover:text-[#febd69]">
            Browsing History
          </a>
          <a href="#" className="hover:text-[#febd69]">
            Prime
          </a>
          <a href="#" className="hover:text-[#febd69]">
            Shopper Toolkit
          </a>
          <a href="#" className="hover:text-[#febd69]">
            Pet Supplies
          </a>
          <a href="#" className="hover:text-[#febd69]">
            Outdoor Recreation
          </a>
          <a href="#" className="hover:text-[#febd69]">
            Fresh
          </a>
          <a href="#" className="hover:text-[#febd69]">
            No annual fee
          </a>
        </nav>
      </div>
    </header>
  )
}

