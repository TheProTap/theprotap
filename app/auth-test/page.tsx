"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AuthTest() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkSession() {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error
        setSession(data.session)
      } catch (error) {
        console.error("Error checking session:", error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Authentication Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <strong>Authentication Status:</strong>{" "}
              {session ? (
                <span className="text-green-600">Authenticated</span>
              ) : (
                <span className="text-red-600">Not Authenticated</span>
              )}
            </div>

            {session && (
              <div>
                <strong>User Email:</strong> {session.user.email}
              </div>
            )}

            <div className="flex space-x-4">
              <Button onClick={() => (window.location.href = "/dashboard")}>Go to Dashboard</Button>
              <Button onClick={() => (window.location.href = "/login")} variant="outline">
                Go to Login
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
