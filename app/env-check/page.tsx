"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function EnvCheckPage() {
  const [envVars, setEnvVars] = useState<Record<string, string>>({})

  useEffect(() => {
    // Collect all environment variables that start with NEXT_PUBLIC_
    const publicEnvVars: Record<string, string> = {}

    // Check for specific environment variables we need
    publicEnvVars["NEXT_PUBLIC_SUPABASE_URL"] = process.env.NEXT_PUBLIC_SUPABASE_URL || "Not set"
    publicEnvVars["NEXT_PUBLIC_SUPABASE_ANON_KEY"] = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 10)}...`
      : "Not set"
    publicEnvVars["NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"] = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      ? `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.substring(0, 10)}...`
      : "Not set"
    publicEnvVars["NEXT_PUBLIC_BASE_URL"] = process.env.NEXT_PUBLIC_BASE_URL || "Not set"

    setEnvVars(publicEnvVars)
  }, [])

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Environment Variables Check</CardTitle>
          <CardDescription>
            This page shows the current environment variables available to the client. Only variables prefixed with
            NEXT_PUBLIC_ are visible here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Public Environment Variables</h3>
            <div className="rounded-md bg-gray-50 p-4">
              <pre className="text-sm">{JSON.stringify(envVars, null, 2)}</pre>
            </div>

            <h3 className="text-lg font-medium">Validation</h3>
            <ul className="space-y-2">
              {Object.entries(envVars).map(([key, value]) => (
                <li key={key} className="flex items-start">
                  <span className={`mr-2 ${value === "Not set" ? "text-red-500" : "text-green-500"}`}>
                    {value === "Not set" ? "✗" : "✓"}
                  </span>
                  <span className="font-mono text-sm">
                    {key}: {value}
                  </span>
                </li>
              ))}
            </ul>

            <div className="rounded-md bg-blue-50 p-4">
              <h4 className="text-sm font-medium text-blue-800">How to set environment variables</h4>
              <ol className="mt-2 list-decimal pl-5 text-sm text-blue-700">
                <li>Go to your Vercel project dashboard</li>
                <li>Navigate to Settings → Environment Variables</li>
                <li>Add each variable with its name and value</li>
                <li>Click "Save" for each variable</li>
                <li>Redeploy your application for the changes to take effect</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
