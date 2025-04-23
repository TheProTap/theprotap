"use client"

import { useState, type ReactNode } from "react"
import { Users, Settings, CreditCard, BarChart3, Package, Bell, Menu, Home, Shield } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navItems = [
    { icon: <Home className="h-5 w-5" />, label: "Dashboard", href: "/admin" },
    { icon: <Users className="h-5 w-5" />, label: "Users", href: "/admin/users" },
    { icon: <Package className="h-5 w-5" />, label: "Orders", href: "/admin/orders" },
    { icon: <CreditCard className="h-5 w-5" />, label: "Cards", href: "/admin/card-management" },
    { icon: <BarChart3 className="h-5 w-5" />, label: "Analytics", href: "/admin/analytics" },
    { icon: <Shield className="h-5 w-5" />, label: "System", href: "/admin/system" },
    { icon: <Settings className="h-5 w-5" />, label: "Settings", href: "/admin/settings" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b py-4 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden mr-4 text-gray-500 hover:text-gray-900"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="font-bold text-xl">Pro Tap Admin</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </div>

          <Avatar className="h-8 w-8">
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Sidebar and main content */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <div
          className={`w-64 bg-gray-900 text-white ${isSidebarOpen ? "block" : "hidden"} md:block fixed md:relative z-20 h-[calc(100vh-64px)] overflow-y-auto transition-all duration-300`}
        >
          <div className="p-4 border-b border-gray-800">
            <Link href="/admin" className="flex items-center">
              <span className="font-bold text-xl">THE PRO TAP</span>
              <span className="ml-2 text-xs bg-white text-black px-1 rounded">ADMIN</span>
            </Link>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-gray-700">AD</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Admin User</div>
                <div className="text-sm text-gray-400">admin@theprotap.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 md:p-6 md:ml-64 w-full">{children}</div>
      </div>
    </div>
  )
}
