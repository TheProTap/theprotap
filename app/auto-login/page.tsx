"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function AutoLoginPage() {
  const { signIn, isDemoMode } = useAuth()
  const [status, setStatus] = useState("Initializing auto-login...")
  const { toast } = useToast()

  useEffect(() => {
    const autoLogin = async () => {
      try {
        setStatus("Attempting to log in automatically...")

        // Use demo credentials
        const email = "demo@example.com"
        const password = "password123"

        const result = await signIn(email, password)

        if (result.success) {
          setStatus("Login successful! Redirecting to dashboard...")
          toast({
            title: "Auto-login successful",
            description: "You've been automatically logged in. Redirecting to dashboard...",
          })

          // Redirect to dashboard
          setTimeout(() => {
            window.location.href = "/dashboard"
          }, 1500)
        } else {
          setStatus(`Login failed: ${result.message}`)
          toast({
            title: "Auto-login failed",
            description: result.message,
            variant: "destructive",
          })
        }
      } catch (error: any) {
        setStatus(`Error during auto-login: ${error.message}`)
        toast({
          title: "Auto-login error",
          description: error.message,
          variant: "destructive",
        })
      }
    }

    autoLogin()
  }, [signIn, toast])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Auto Login</CardTitle>
          <CardDescription>Automatically logging you in...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="mb-4">{status}</p>
            {isDemoMode && (
              <p className="text-sm text-muted-foreground">
                Running in demo mode. You'll be logged in with demo credentials.
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => (window.location.href = "/dashboard")}>Go to Dashboard</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
