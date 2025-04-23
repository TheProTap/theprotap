"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

// Force dynamic rendering to prevent static generation
export const dynamic = "force-dynamic"

export default function AuthDebugPage() {
  const { user, loading } = useAuth()
  const [session, setSession] = useState<any>(null)
  const [cookies, setCookies] = useState<string[]>([])
  const [localStorageItems, setLocalStorageItems] = useState<string[]>([])
  const [authTokenFound, setAuthTokenFound] = useState<string>("Checking...")
  const [supabaseConfig, setSupabaseConfig] = useState({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "Not set",
    hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  })

  // Only run on the client side
  useEffect(() => {
    // Get Supabase session
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
    }

    // Get cookies
    const getCookies = () => {
      const allCookies = document.cookie.split(";").map((cookie) => cookie.trim())
      setCookies(allCookies)
    }

    // Get localStorage items
    const getLocalStorageItems = () => {
      const items = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key) {
          items.push(`${key}: ${localStorage.getItem(key)?.substring(0, 50)}...`)
        }
      }
      setLocalStorageItems(items)

      // Check for auth token in localStorage
      const hasAuthToken = Object.keys(localStorage).some((key) => key.startsWith("sb-") && key.endsWith("-auth-token"))
      setAuthTokenFound(hasAuthToken ? "Found in localStorage" : "Not found in localStorage")
    }

    getSession()
    getCookies()
    getLocalStorageItems()
  }, [])

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Authentication Debug</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Auth Context State</CardTitle>
            <CardDescription>Current state of the auth context</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Loading:</strong> {loading ? "True" : "False"}
              </p>
              <p>
                <strong>User:</strong> {user ? "Authenticated" : "Not authenticated"}
              </p>
              {user && (
                <div className="pl-4 border-l-2 border-gray-200 mt-2">
                  <p>
                    <strong>ID:</strong> {user.id}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Name:</strong> {user.name || "Not set"}
                  </p>
                  <p>
                    <strong>Role:</strong> {user.role}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supabase Session</CardTitle>
            <CardDescription>Current Supabase session data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Session:</strong> {session ? "Active" : "None"}
              </p>
              {session && (
                <div className="pl-4 border-l-2 border-gray-200 mt-2">
                  <p>
                    <strong>User ID:</strong> {session.user.id}
                  </p>
                  <p>
                    <strong>Expires At:</strong> {new Date(session.expires_at * 1000).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>LocalStorage</CardTitle>
            <CardDescription>Current localStorage items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Auth Token Check:</strong> {authTokenFound}
              </p>
              <p>
                <strong>All LocalStorage Items:</strong>
              </p>
              {localStorageItems.length > 0 ? (
                <ul className="list-disc pl-5">
                  {localStorageItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>No localStorage items found or still loading...</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cookies</CardTitle>
            <CardDescription>Current browser cookies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>All Cookies:</strong>
              </p>
              {cookies.length > 0 ? (
                <ul className="list-disc pl-5">
                  {cookies.map((cookie, index) => (
                    <li key={index}>{cookie}</li>
                  ))}
                </ul>
              ) : (
                <p>No cookies found or still loading...</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
            <CardDescription>Supabase configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>NEXT_PUBLIC_SUPABASE_URL:</strong> {supabaseConfig.url}
              </p>
              <p>
                <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong> {supabaseConfig.hasAnonKey ? "Set" : "Not set"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>Debug actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild>
              <Link href="/login">Go to Login</Link>
            </Button>
            <Button asChild className="ml-2">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button
              onClick={() => {
                setCookies(document.cookie.split(";").map((cookie) => cookie.trim()))

                const items = []
                for (let i = 0; i < localStorage.length; i++) {
                  const key = localStorage.key(i)
                  if (key) {
                    items.push(`${key}: ${localStorage.getItem(key)?.substring(0, 50)}...`)
                  }
                }
                setLocalStorageItems(items)

                const hasAuthToken = Object.keys(localStorage).some(
                  (key) => key.startsWith("sb-") && key.endsWith("-auth-token"),
                )
                setAuthTokenFound(hasAuthToken ? "Found in localStorage" : "Not found in localStorage")
              }}
              className="ml-2"
            >
              Refresh Data
            </Button>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Supabase stores auth tokens in localStorage, not cookies. This is why middleware-based protection doesn't
              work.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
