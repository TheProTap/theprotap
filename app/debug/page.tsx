"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SupabaseTest } from "@/components/supabase-test"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { initializeDatabaseSQL } from "@/lib/db-init"

export default function DebugPage() {
  const [showEnvVars, setShowEnvVars] = useState(false)
  const [showSQL, setShowSQL] = useState(false)
  const [cookieInfo, setCookieInfo] = useState<string[]>([])

  useEffect(() => {
    // Get cookie information
    if (typeof document !== "undefined") {
      const cookies = document.cookie.split(";").map((cookie) => cookie.trim())
      setCookieInfo(cookies)
    }
  }, [])

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Supabase Debug Page</h1>

      <Tabs defaultValue="connection">
        <TabsList className="mb-4">
          <TabsTrigger value="connection">Connection Test</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
          <TabsTrigger value="database">Database Setup</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
        </TabsList>

        <TabsContent value="connection">
          <Card>
            <CardHeader>
              <CardTitle>Supabase Connection Test</CardTitle>
              <CardDescription>Test if your application can connect to Supabase</CardDescription>
            </CardHeader>
            <CardContent>
              <SupabaseTest />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environment">
          <Card>
            <CardHeader>
              <CardTitle>Environment Variables</CardTitle>
              <CardDescription>Check if your environment variables are set correctly</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setShowEnvVars(!showEnvVars)} variant="outline" className="mb-4">
                {showEnvVars ? "Hide Variables" : "Show Variables"}
              </Button>

              {showEnvVars && (
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                  NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || "Not set"}
                  <br />
                  NEXT_PUBLIC_SUPABASE_ANON_KEY:{" "}
                  {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                    ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 10)}...`
                    : "Not set"}
                  <br />
                  NEXT_PUBLIC_BASE_URL: {process.env.NEXT_PUBLIC_BASE_URL || "Not set"}
                  <br />
                  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:{" "}
                  {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
                    ? `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.substring(0, 10)}...`
                    : "Not set"}
                </pre>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle>Database Setup</CardTitle>
              <CardDescription>SQL to initialize your Supabase database</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <AlertTitle>How to use this SQL</AlertTitle>
                <AlertDescription>
                  Copy this SQL and run it in your Supabase SQL Editor to set up your database schema and security
                  policies.
                </AlertDescription>
              </Alert>

              <Button onClick={() => setShowSQL(!showSQL)} variant="outline" className="mb-4">
                {showSQL ? "Hide SQL" : "Show SQL"}
              </Button>

              {showSQL && (
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">{initializeDatabaseSQL}</pre>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auth">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Debug</CardTitle>
              <CardDescription>Check authentication cookies and session information</CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-medium mb-2">Authentication Cookies</h3>
              {cookieInfo.length > 0 ? (
                <ul className="list-disc pl-5 mb-4">
                  {cookieInfo.map((cookie, index) => (
                    <li key={index} className="mb-1">
                      {cookie}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground mb-4">No cookies found</p>
              )}

              <Alert>
                <AlertTitle>Authentication Status</AlertTitle>
                <AlertDescription>
                  {cookieInfo.some((cookie) => cookie.includes("-auth-token"))
                    ? "Authentication cookie found. You should be able to access protected routes."
                    : "No authentication cookie found. You may need to log in."}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
