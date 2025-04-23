"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { LayoutDashboard, CreditCard, Users, BarChart3, LogOut, Menu, X, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMobile } from "@/hooks/use-mobile"
import { handleClick, navigateTo } from "@/lib/click-handler"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Cards", href: "/dashboard/cards", icon: CreditCard },
    { name: "Connections", href: "/connections", icon: Users },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Profile", href: "/dashboard/profile", icon: UserCircle },
  ]

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sidebar and main content */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        <div
          className={`md:w-64 bg-gray-900 text-white ${
            isSidebarOpen ? "block" : "hidden"
          } md:block fixed md:relative z-30 h-full md:h-auto overflow-y-auto`}
        >
          <div className="flex h-14 items-center border-b px-4 lg:h-[61px]">
            <a href="/" className="flex items-center font-bold text-xl" onClick={handleClick(() => navigateTo("/"))}>
              Pro Tap
            </a>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-2 text-sm font-medium">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={handleClick(() => {
                      if (isMobile) setIsSidebarOpen(false)
                      navigateTo(item.href)
                    })}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      isActive ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </a>
                )
              })}
            </nav>
          </div>
          <div className="mt-auto border-t p-4">
            <div className="flex items-center gap-3 py-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                <AvatarFallback>YN</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">Your Name</p>
                <p className="text-xs text-gray-500">your.email@example.com</p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleClick(() => navigateTo("/logout"))}>
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Log out</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 md:ml-64 p-4 md:p-8">{children}</div>
      </div>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed bottom-4 right-4 z-40 bg-primary text-white p-3 rounded-full shadow-lg"
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
    </div>
  )
}
