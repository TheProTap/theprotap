"use client"

import { useState, useEffect } from "react"
import { testSupabaseConnection } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestConnectionPage() {
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const checkConnection = async () => {
    setLoading(true)
    const result = await testSupabaseConnection()
    setStatus(result)
    setLoading(false)
  }

  useEffect(() => {
    checkConnection()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Supabase Connection Test</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Testing connection...</p>
          ) : (
            <>
              <div
                className={`p-4 rounded-md mb-4 ${status?.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
              >
                {status?.message}
              </div>
              <Button onClick={checkConnection} disabled={loading}>
                Test Again
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
