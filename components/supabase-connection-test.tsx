"use client"

import { useState, useEffect } from "react"
import { testSupabaseConnection } from "@/lib/supabase"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle } from "lucide-react"

export function SupabaseConnectionTest() {
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkConnection() {
      const result = await testSupabaseConnection()
      setStatus(result)
      setLoading(false)
    }

    checkConnection()
  }, [])

  if (loading) return <p className="text-center py-2">Testing Supabase connection...</p>

  if (status?.success) {
    return (
      <Alert className="mb-4 bg-green-50 border-green-200">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-600">{status.message}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="mb-4" variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{status?.message || "Could not connect to Supabase"}</AlertDescription>
    </Alert>
  )
}
