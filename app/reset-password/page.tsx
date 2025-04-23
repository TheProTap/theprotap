"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import Logo from "@/components/logo"
import { supabase } from "@/lib/supabase"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [resetComplete, setResetComplete] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Check if we have a hash in the URL and extract user email
  useEffect(() => {
    const checkHash = async () => {
      try {
        const hash = window.location.hash
        if (!hash || !hash.startsWith("#access_token=")) {
          setError("Invalid or missing reset token. Please request a new password reset link.")
          return
        }

        // Get user from the access token
        const { data, error } = await supabase.auth.getUser()
        if (error || !data.user) {
          setError("Unable to verify your identity. Please request a new password reset link.")
          return
        }

        setEmail(data.user.email)
      } catch (err) {
        console.error("Error checking reset token:", err)
        setError("An error occurred. Please request a new password reset link.")
      }
    }

    checkHash()
  }, [])

  // Handle redirection after successful reset
  useEffect(() => {
    if (resetComplete && email) {
      const timer = setTimeout(() => {
        // Store email in sessionStorage for the login page
        sessionStorage.setItem("resetEmail", email)
        sessionStorage.setItem("resetPassword", password)
        sessionStorage.setItem("autoLogin", "true")

        // Redirect to a special auto-login page
        router.push("/auto-login")
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [resetComplete, email, password, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) throw error

      toast({
        title: "Password updated",
        description: "Your password has been successfully reset. Redirecting you to login...",
      })

      setResetComplete(true)
    } catch (error: any) {
      console.error("Password reset error:", error)
      toast({
        title: "Reset failed",
        description: error.message || "Failed to reset password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Set new password</CardTitle>
          <CardDescription className="text-center">Enter your new password below</CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : resetComplete ? (
            <Alert>
              <AlertDescription>Password reset successful! Redirecting you to login...</AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <p className="text-xs text-muted-foreground">Password must be at least 6 characters long</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Updating..." : "Reset Password"}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm text-muted-foreground">
            <Link href="/login" className="text-primary hover:underline">
              Back to login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
