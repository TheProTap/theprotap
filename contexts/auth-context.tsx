"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { supabase, isUsingDummyClient, isSupabaseConfigured } from "@/lib/supabase"

// Define user type
export interface User {
  id: string
  email: string
  name?: string
  role: "user" | "admin"
}

// Define auth context type
interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; message: string }>
  signOut: () => void
  loading: boolean
  isDemoMode: boolean
  isConfigured: boolean
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const isDemoMode = false // Set to true if you want to enable demo mode
  const isConfigured = isSupabaseConfigured()

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if Supabase is configured
        if (isUsingDummyClient()) {
          console.warn("Using dummy Supabase client. Authentication will not work.")
          setLoading(false)
          return
        }

        // Try to get session from Supabase
        const { data } = await supabase.auth.getSession()
        if (data?.session) {
          const { data: userData } = await supabase.auth.getUser()
          if (userData?.user) {
            setUser({
              id: userData.user.id,
              email: userData.user.email || "",
              name: userData.user.user_metadata?.full_name,
              role: userData.user.user_metadata?.role || "user",
            })
            console.log("User authenticated:", userData.user.email)
          }
        } else {
          console.log("No session found")
        }
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setLoading(false)
      }
    }

    // Set up auth state change listener
    let subscription: { unsubscribe: () => void } | null = null

    try {
      const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log("Auth state changed:", event, session ? "session exists" : "no session")
        if (session) {
          const { user: authUser } = session
          setUser({
            id: authUser.id,
            email: authUser.email || "",
            name: authUser.user_metadata?.full_name,
            role: authUser.user_metadata?.role || "user",
          })
        } else {
          setUser(null)
        }
      })

      subscription = data.subscription
    } catch (error) {
      console.error("Error setting up auth state change listener:", error)
    }

    checkAuth()

    // Clean up subscription
    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [])

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      console.log("Attempting to sign in with email:", email)

      // Check if Supabase is configured
      if (isUsingDummyClient()) {
        console.error("Supabase is not configured. Cannot sign in.")
        return {
          success: false,
          message: "Authentication is not configured. Please check your environment variables.",
        }
      }

      if (isDemoMode) {
        console.log("Using demo mode for sign in")
        // In demo mode, always succeed with any credentials
        const demoUser = {
          id: "demo-user-id",
          email: email,
          name: "Demo User",
          role: "user",
        }

        // Set user immediately for faster UI response
        setUser(demoUser)

        // Create a demo cookie to simulate authentication
        document.cookie = "sb-demo-auth-token=demo-token; path=/; max-age=86400"

        return { success: true, message: "Signed in successfully (Demo Mode)" }
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Sign in error from Supabase:", error)
        // Handle specific error cases
        if (error.message.includes("Email not confirmed")) {
          return {
            success: false,
            message: "Please check your email and confirm your account before logging in.",
          }
        }

        throw error
      }

      if (data?.user) {
        console.log("Sign in successful, user:", data.user.email)
        // Set user immediately for faster UI response
        setUser({
          id: data.user.id,
          email: data.user.email || "",
          name: data.user.user_metadata?.full_name,
          role: data.user.user_metadata?.role || "user",
        })

        // Wait a moment to ensure the session is properly established
        await new Promise((resolve) => setTimeout(resolve, 100))

        return { success: true, message: "Signed in successfully" }
      }

      return { success: false, message: "Authentication failed" }
    } catch (error: any) {
      console.error("Sign in error:", error)
      return {
        success: false,
        message: error.message || "Authentication failed. Please try again.",
      }
    } finally {
      setLoading(false)
    }
  }

  // Sign up function
  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true)
    try {
      // Check if Supabase is configured
      if (isUsingDummyClient()) {
        console.error("Supabase is not configured. Cannot sign up.")
        return {
          success: false,
          message: "Authentication is not configured. Please check your environment variables.",
        }
      }

      if (isDemoMode) {
        console.log("Using demo mode for sign up")
        // In demo mode, always succeed with any credentials
        const demoUser = {
          id: "demo-user-id",
          email: email,
          name: name,
          role: "user",
        }

        setUser(demoUser)

        // Create a demo cookie to simulate authentication
        document.cookie = "sb-demo-auth-token=demo-token; path=/; max-age=86400"

        return { success: true, message: "Account created successfully (Demo Mode)" }
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: "user",
          },
          emailRedirectTo: `${window.location.origin}/login?verified=true`,
        },
      })

      if (error) {
        throw error
      }

      if (data?.user) {
        try {
          // Create profile in the profiles table
          const { error: profileError } = await supabase.from("profiles").insert({
            id: data.user.id,
            full_name: name,
            username: email.split("@")[0],
          })

          if (profileError) {
            console.error("Error creating profile:", profileError)
          }
        } catch (profileError) {
          console.error("Error creating profile:", profileError)
        }

        // Check if email confirmation is required
        if (data.session === null) {
          return {
            success: true,
            message: "Account created. Please check your email to confirm your account.",
          }
        }

        setUser({
          id: data.user.id,
          email: data.user.email || "",
          name: data.user.user_metadata?.full_name,
          role: data.user.user_metadata?.role || "user",
        })
        return { success: true, message: "Account created successfully" }
      }

      return { success: false, message: "Registration failed" }
    } catch (error: any) {
      console.error("Sign up error:", error)
      return {
        success: false,
        message: error.message || "Registration failed. Please try again.",
      }
    } finally {
      setLoading(false)
    }
  }

  // Sign out function
  const signOut = async () => {
    setLoading(true)
    try {
      if (isDemoMode) {
        // Remove demo cookie
        document.cookie = "sb-demo-auth-token=; path=/; max-age=0"
      } else {
        await supabase.auth.signOut()
      }
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Sign out error:", error)
      // Even if there's an error, we should still clear the user state
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        loading,
        isDemoMode,
        isConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
