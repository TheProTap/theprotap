"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AuthCheck() {
  const router = useRouter()

  useEffect(() => {
    // Check for demo user in localStorage
    const demoUser = localStorage.getItem("demoUser")

    if (demoUser) {
      // If demo user exists, redirect to the original URL
      const originalPath = window.location.search.replace("?redirect=", "") || "/dashboard"
      router.push(originalPath)
    } else {
      // If no demo user, redirect to login
      router.push("/login")
    }
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Checking authentication...</h2>
        <p className="mt-2 text-gray-600">Please wait while we verify your session.</p>
      </div>
    </div>
  )
}
