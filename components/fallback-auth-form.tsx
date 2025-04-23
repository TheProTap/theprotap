"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"

type FallbackAuthFormProps = {
  mode: "login" | "signup"
}

export function FallbackAuthForm({ mode }: FallbackAuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Simulate authentication process
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store in localStorage for demo purposes
      if (mode === "signup") {
        localStorage.setItem(
          "demo_user",
          JSON.stringify({
            email,
            name,
            created_at: new Date().toISOString(),
          }),
        )
        setSuccess(true)
      } else {
        const storedUser = localStorage.getItem("demo_user")
        if (storedUser) {
          const user = JSON.parse(storedUser)
          if (user.email === email) {
            // Redirect to dashboard in a real app
            window.location.href = "/dashboard"
          } else {
            setError("Invalid email or password")
          }
        } else {
          setError("User not found. Please sign up first.")
        }
      }
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Demo Mode Active</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Supabase connection is not available. This form is running in demo mode and will not create real
                accounts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {success ? (
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-green-800">Account created successfully!</h3>
          <p className="mt-2 text-sm text-green-700">Your demo account has been created. You can now log in.</p>
          <Button className="mt-4 w-full" onClick={() => (window.location.href = "/login")}>
            Go to Login
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1"
              />
            </div>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : mode === "login" ? "Log In" : "Sign Up"}
          </Button>

          <div className="text-center text-sm">
            {mode === "login" ? (
              <p>
                Don't have an account?{" "}
                <a href="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </a>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Log in
                </a>
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  )
}
