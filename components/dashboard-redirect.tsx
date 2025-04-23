"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { redirectToDashboard } from "@/lib/redirect"

export function DashboardRedirect() {
  useEffect(() => {
    // Redirect to dashboard on component mount
    redirectToDashboard()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
      <h1 className="text-2xl font-bold mb-4">Redirecting to Dashboard...</h1>
      <p className="text-gray-600 mb-6">If you are not redirected automatically, please click the button below.</p>
      <Button onClick={redirectToDashboard}>Go to Dashboard</Button>
    </div>
  )
}
