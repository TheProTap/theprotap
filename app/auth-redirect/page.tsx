"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AuthRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Force a hard navigation to dashboard
    window.location.href = "/dashboard"
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to Dashboard...</h1>
        <p>If you are not redirected automatically, click the button below.</p>
        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  )
}
