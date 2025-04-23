"use client"

import { useState } from "react"
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Download,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardLayout from "@/components/dashboard-layout"

// Mock data for charts
const profileViewsData = [
  { date: "Jan", views: 12 },
  { date: "Feb", views: 18 },
  { date: "Mar", views: 15 },
  { date: "Apr", views: 22 },
  { date: "May", views: 28 },
  { date: "Jun", views: 35 },
  { date: "Jul", views: 42 },
  { date: "Aug", views: 38 },
  { date: "Sep", views: 45 },
  { date: "Oct", views: 50 },
  { date: "Nov", views: 58 },
  { date: "Dec", views: 62 },
]

const contactsSavedData = [
  { date: "Jan", saved: 5 },
  { date: "Feb", saved: 8 },
  { date: "Mar", saved: 6 },
  { date: "Apr", saved: 10 },
  { date: "May", saved: 12 },
  { date: "Jun", saved: 15 },
  { date: "Jul", saved: 18 },
  { date: "Aug", saved: 16 },
  { date: "Sep", saved: 20 },
  { date: "Oct", saved: 22 },
  { date: "Nov", saved: 25 },
  { date: "Dec", saved: 28 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("year")

  // Calculate max values for chart scaling
  const maxViews = Math.max(...profileViewsData.map((d) => d.views))
  const maxSaved = Math.max(...contactsSavedData.map((d) => d.saved))

  // Filter data based on time range
  const getFilteredData = (data, range) => {
    if (range === "month") {
      return data.slice(-1)
    } else if (range === "quarter") {
      return data.slice(-3)
    } else if (range === "halfYear") {
      return data.slice(-6)
    } else {
      return data
    }
  }

  const filteredViewsData = getFilteredData(profileViewsData, timeRange)
  const filteredSavedData = getFilteredData(contactsSavedData, timeRange)

  // Calculate totals and changes
  const totalViews = filteredViewsData.reduce((sum, item) => sum + item.views, 0)
  const totalSaved = filteredSavedData.reduce((sum, item) => sum + item.saved, 0)

  const previousPeriodViews =
    timeRange === "month"
      ? profileViewsData[profileViewsData.length - 2]?.views || 0
      : timeRange === "quarter"
        ? profileViewsData.slice(-6, -3).reduce((sum, item) => sum + item.views, 0)
        : timeRange === "halfYear"
          ? profileViewsData.slice(-12, -6).reduce((sum, item) => sum + item.views, 0)
          : 0

  const previousPeriodSaved =
    timeRange === "month"
      ? contactsSavedData[contactsSavedData.length - 2]?.saved || 0
      : timeRange === "quarter"
        ? contactsSavedData.slice(-6, -3).reduce((sum, item) => sum + item.saved, 0)
        : timeRange === "halfYear"
          ? contactsSavedData.slice(-12, -6).reduce((sum, item) => sum + item.saved, 0)
          : 0

  const viewsChange = previousPeriodViews ? ((totalViews - previousPeriodViews) / previousPeriodViews) * 100 : 100
  const savedChange = previousPeriodSaved ? ((totalSaved - previousPeriodSaved) / previousPeriodSaved) * 100 : 100

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
            <p className="text-gray-500">Track your profile performance and engagement</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="halfYear">Last 6 Months</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Profile Views</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold">{totalViews}</h3>
                    <Badge className={viewsChange >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      <span className="flex items-center">
                        {viewsChange >= 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(viewsChange).toFixed(1)}%
                      </span>
                    </Badge>
                  </div>
                </div>
                <div className="p-2 bg-blue-100 rounded-md">
                  <Eye className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Contacts Saved</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold">{totalSaved}</h3>
                    <Badge className={savedChange >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      <span className="flex items-center">
                        {savedChange >= 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(savedChange).toFixed(1)}%
                      </span>
                    </Badge>
                  </div>
                </div>
                <div className="p-2 bg-green-100 rounded-md">
                  <Download className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold">
                      {totalViews ? ((totalSaved / totalViews) * 100).toFixed(1) : 0}%
                    </h3>
                  </div>
                </div>
                <div className="p-2 bg-purple-100 rounded-md">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">New Connections</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold">18</h3>
                    <Badge className="bg-green-100 text-green-800">
                      <span className="flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        12.5%
                      </span>
                    </Badge>
                  </div>
                </div>
                <div className="p-2 bg-orange-100 rounded-md">
                  <Users className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Views</CardTitle>
              <CardDescription>Number of times your profile was viewed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <div className="flex h-full items-end gap-2">
                  {filteredViewsData.map((item, index) => (
                    <div key={index} className="relative flex flex-1 flex-col items-center">
                      <div
                        className="w-full bg-blue-100 rounded-sm"
                        style={{
                          height: `${(item.views / maxViews) * 100}%`,
                          minHeight: "1%",
                        }}
                      >
                        <div className="absolute bottom-full w-full text-center mb-1">
                          <span className="text-xs font-medium">{item.views}</span>
                        </div>
                      </div>
                      <span className="mt-2 text-xs">{item.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contacts Saved</CardTitle>
              <CardDescription>Number of people who saved your contact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <div className="flex h-full items-end gap-2">
                  {filteredSavedData.map((item, index) => (
                    <div key={index} className="relative flex flex-1 flex-col items-center">
                      <div
                        className="w-full bg-green-100 rounded-sm"
                        style={{
                          height: `${(item.saved / maxSaved) * 100}%`,
                          minHeight: "1%",
                        }}
                      >
                        <div className="absolute bottom-full w-full text-center mb-1">
                          <span className="text-xs font-medium">{item.saved}</span>
                        </div>
                      </div>
                      <span className="mt-2 text-xs">{item.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest interactions with your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                {
                  type: "view",
                  name: "Jamie Smith",
                  time: "2 hours ago",
                  location: "San Francisco, CA",
                  device: "iPhone 13",
                  saved: true,
                },
                {
                  type: "connection",
                  name: "Taylor Reed",
                  time: "Yesterday",
                  location: "Tech Conference, New York",
                  device: "Samsung Galaxy S22",
                  saved: true,
                },
                {
                  type: "view",
                  name: "Casey Jones",
                  time: "2 days ago",
                  location: "Chicago, IL",
                  device: "Google Pixel 6",
                  saved: false,
                },
                {
                  type: "view",
                  name: "Morgan Chen",
                  time: "3 days ago",
                  location: "Remote",
                  device: "MacBook Pro",
                  saved: true,
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                    {activity.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{activity.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {activity.type === "view" && "Viewed your profile"}
                        {activity.type === "connection" && "Connected with you"}
                      </Badge>
                      {activity.saved && <Badge className="bg-green-100 text-green-800 text-xs">Saved Contact</Badge>}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {activity.time} • {activity.location}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">via {activity.device}</div>
                  </div>
                  <div className="text-xs text-gray-400 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Activity
            </Button>
          </CardFooter>
        </Card>

        {/* Location Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Location Analytics</CardTitle>
            <CardDescription>Where your profile is being viewed from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-gray-100 rounded-md flex items-center justify-center mb-4">
              <div className="text-center">
                <BarChart3 className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Map visualization would go here</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Top Cities</h4>
                <div className="space-y-2">
                  {[
                    { city: "San Francisco, CA", count: 28 },
                    { city: "New York, NY", count: 22 },
                    { city: "Chicago, IL", count: 15 },
                    { city: "Seattle, WA", count: 12 },
                    { city: "Austin, TX", count: 10 },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{item.city}</span>
                      <span className="text-sm font-medium">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Top Countries</h4>
                <div className="space-y-2">
                  {[
                    { country: "United States", count: 87 },
                    { country: "Canada", count: 23 },
                    { country: "United Kingdom", count: 18 },
                    { country: "Germany", count: 12 },
                    { country: "Australia", count: 9 },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{item.country}</span>
                      <span className="text-sm font-medium">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
