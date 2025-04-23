"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { testSupabaseConnection, isSupabaseConfigured } from "@/lib/supabase"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"

export function SupabaseTest() {
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const runTest = async () => {
    setIsLoading(true)
    try {
      if (!isSupabaseConfigured()) {
        setTestResult({
          success: false,
          message: "Supabase is not properly configured. Please check your environment variables.",
        })
        return
      }

      const result = await testSupabaseConnection()
      setTestResult(result)
    } catch (error) {
      console.error("Test error:", error)
      setTestResult({
        success: false,
        message: "An unexpected error occurred while testing the connection",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Run the test automatically on component mount
    runTest()
  }, [])

  return (
    <div className="space-y-4">
      <Button onClick={runTest} disabled={isLoading}>
        {isLoading ? "Testing..." : "Test Connection"}
      </Button>

      {testResult && (
        <Alert variant={testResult.success ? "default" : "destructive"}>
          <div className="flex items-center gap-2">
            {testResult.success ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
            <AlertTitle>{testResult.success ? "Success" : "Error"}</AlertTitle>
          </div>
          <AlertDescription>{testResult.message}</AlertDescription>
        </Alert>
      )}

      {!isSupabaseConfigured() && (
        <Alert variant="warning" className="mt-4">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>Missing Configuration</AlertTitle>
          <AlertDescription>
            <p className="mb-2">
              Your Supabase environment variables are not properly configured. Please add the following to your
              environment:
            </p>
            <ul className="list-disc pl-5">
              <li>NEXT_PUBLIC_SUPABASE_URL</li>
              <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {!testResult?.success && isSupabaseConfigured() && (
        <div className="mt-4 space-y-2">
          <h3 className="font-medium">Troubleshooting Steps:</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Check that your Supabase URL and anon key are correctly set in your environment variables</li>
            <li>Verify that your Supabase project is up and running</li>
            <li>Make sure your database tables have been created</li>
            <li>Check that your Row Level Security (RLS) policies are properly configured</li>
            <li>Ensure your IP address is not blocked by Supabase</li>
          </ol>
        </div>
      )}
    </div>
  )
}
