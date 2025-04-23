"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function DemoLoginButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDemoLogin = () => {
    setLoading(true)

    // Create a demo user in localStorage
    const demoUser = {
      id: "demo-user-123",
      email: "demo@example.com",
      name: "Demo User",
      role: "user",
      isDemo: true,
    }

    // Store in localStorage
    localStorage.setItem("protap-user", JSON.stringify(demoUser))

    // Simulate loading
    setTimeout(() => {
      setLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="mt-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-50 text-gray-500">Or</span>
        </div>
      </div>

      <Button variant="outline" className="w-full mt-4" onClick={handleDemoLogin} disabled={loading}>
        {loading ? "Logging in..." : "Continue with Demo Account"}
      </Button>

      <p className="text-xs text-center mt-2 text-gray-500">No signup required. Use this to explore the platform.</p>
    </div>
  )
}
