"use client"

import type React from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="py-12">
        <div className="mx-auto sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
}
