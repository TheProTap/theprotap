"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Users, MapPin, BarChart3 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import DashboardLayout from "@/components/layouts/dashboard-layout"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      console.log("No user found, redirecting to login")
      router.push("/login")
      return
    }

    // If we have a user, fetch their profile
    if (user && user.id) {
      console.log("User found, fetching profile", user.id)
      const fetchProfile = async () => {
        try {
          const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

          if (error) throw error
          setProfile(data)
        } catch (error) {
          console.error("Error fetching profile:", error)
          // Create a default profile if none exists
          setProfile({
            id: user.id,
            username: user.email?.split("@")[0] || "user",
            full_name: user.name || "User",
          })
        }
      }

      fetchProfile()
    }
  }, [user, loading, router])

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading dashboard...</h2>
          <p className="text-muted-foreground">Please wait while we prepare your dashboard</p>
        </div>
      </div>
    )
  }

  // If no user after loading is complete, show auth required message
  if (!user) {
    return (
      <div className="container py-12">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>You need to be logged in to view this page</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Please log in to access the dashboard.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/login">Go to Login</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <DashboardCard
            title="My Cards"
            description="Manage your ProTap cards"
            icon={<CreditCard className="h-5 w-5" />}
            href="/dashboard/cards"
          />
          <DashboardCard
            title="Connections"
            description="View your network connections"
            icon={<Users className="h-5 w-5" />}
            href="/connections"
          />
          <DashboardCard
            title="Map"
            description="See where you've connected"
            icon={<MapPin className="h-5 w-5" />}
            href="/connections"
          />
          <DashboardCard
            title="Analytics"
            description="Track your card performance"
            icon={<BarChart3 className="h-5 w-5" />}
            href="/dashboard/analytics"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile Overview</CardTitle>
              <CardDescription>Your public profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Email:</strong> {user?.email}
                </p>
                <p>
                  <strong>Name:</strong> {profile?.full_name || user?.name || "Not set"}
                </p>
                <p>
                  <strong>Username:</strong> {profile?.username || "Not set"}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/profile">Edit Profile</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>Complete these steps to set up your ProTap</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Complete your profile</p>
                    <p className="text-sm text-muted-foreground">Add your details and social links</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Order your first card</p>
                    <p className="text-sm text-muted-foreground">Choose your design and place an order</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Start connecting</p>
                    <p className="text-sm text-muted-foreground">Use your card to build your network</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/create-card">Create a Card</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Debug</CardTitle>
              <CardDescription>Tools for debugging your application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button asChild>
                  <Link href="/env-check">Check Environment Variables</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth-test">Test Authentication</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

function DashboardCard({
  title,
  description,
  icon,
  href,
}: {
  title: string
  description: string
  icon: React.ReactNode
  href: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" asChild className="w-full">
          <Link href={href}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
