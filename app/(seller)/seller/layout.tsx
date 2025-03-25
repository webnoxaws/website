import "@/styles/globals.css";
import { Search, ShoppingBag, Bell, Plus, ChevronUp } from "lucide-react"
import Image from "next/image"

import { AppSidebar } from "@/components/layout/seller/sidebar/app-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

// app/seller/layout.tsx
export default function SellerLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body>
        <SidebarProvider >
      <AppSidebar  />
      <SidebarInset className="bg-white">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 px-4 w-full">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-gray-500 hover:bg-gray-50 hover:text-gray-700" />
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search" className="pl-8 w-full border-gray-200 focus-visible:ring-red-500" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button className="bg-red-600 hover:bg-red-700 text-white border-0">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
            <Button variant="ghost" size="icon" className="relative text-gray-600 hover:bg-gray-50 hover:text-gray-800">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="relative text-gray-600 hover:bg-gray-50 hover:text-gray-800">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                2
              </span>
            </Button>
            <div className="flex items-center gap-2">
              <div className="relative h-9 w-9 overflow-hidden rounded-full border border-gray-200">
                <Image
                  src="/assets/images/Avatar/user1.png"
                  alt="User"
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-sm font-medium text-gray-800">Stebin Ben</span>
            </div>
          </div>
        </header>
        <div className="p-[2rem]">

        {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
        </body>
      </html>
    );
  }
  