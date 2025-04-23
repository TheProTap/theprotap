"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { isSupabaseConfigured } from "@/lib/supabase"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"

export function ConfigCheck() {
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    // Check if Supabase is configured
    setShowAlert(!isSupabaseConfigured())
  }, [])

  if (!showAlert) return null

  return (
    <Alert variant="warning" className="mb-6">
      <AlertTriangle className="h-5 w-5" />
      <AlertTitle>Configuration Required</AlertTitle>
      <AlertDescription>
        <p className="mb-2">
          Your Supabase environment variables are not properly configured. Some features may not work correctly.
        </p>
        <div className="flex gap-2 mt-2">
          <Button asChild size="sm" variant="outline">
            <Link href="/debug">View Debug Info</Link>
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
