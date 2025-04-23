"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DashboardTest() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getUser() {
      try {
        const { data, error } = await supabase.auth.getUser()
        if (error) throw error
        setUser(data.user)
      } catch (error) {
        console.error("Error getting user:", error)
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      window.location.href = "/login"
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {user ? (
              <>
                <div>
                  <strong>User Email:</strong> {user.email}
                </div>
                <div>
                  <strong>User ID:</strong> {user.id}
                </div>
                <Button onClick={handleSignOut} variant="destructive">
                  Sign Out
                </Button>
              </>
            ) : (
              <div>
                <p className="text-red-600">Not authenticated</p>
                <Button onClick={() => (window.location.href = "/login")} className="mt-2">
                  Go to Login
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
