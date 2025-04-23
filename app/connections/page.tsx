"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Search, Filter, MapPin, Calendar, Users, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMobile } from "@/hooks/use-mobile"
import dynamic from "next/dynamic"

// Import Leaflet dynamically to avoid SSR issues
const MapComponent = dynamic(() => import("../../components/map-component"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-100 flex items-center justify-center">
      <div className="animate-pulse text-gray-500">Loading map...</div>
    </div>
  ),
})

// Mock data for connections
const connectionData = [
  {
    id: 1,
    name: "Jamie Smith",
    title: "Marketing Director",
    company: "CreativeHub",
    avatar: "/placeholder.svg?height=100&width=100",
    date: "May 15, 2023",
    location: "Design Conference, New York",
    coordinates: { lat: 40.7128, lng: -74.006 },
    notes: "Discussed potential collaboration on upcoming campaign",
  },
  {
    id: 2,
    name: "Taylor Reed",
    title: "Frontend Developer",
    company: "TechSolutions",
    avatar: "/placeholder.svg?height=100&width=100",
    date: "June 3, 2023",
    location: "Tech Meetup, San Francisco",
    coordinates: { lat: 37.7749, lng: -122.4194 },
    notes: "Shared insights on React performance optimization",
  },
  {
    id: 3,
    name: "Casey Jones",
    title: "Startup Founder",
    company: "InnovateLabs",
    avatar: "/placeholder.svg?height=100&width=100",
    date: "July 12, 2023",
    location: "Venture Capital Event, Boston",
    coordinates: { lat: 42.3601, lng: -71.0589 },
    notes: "Potential investment opportunity",
  },
  {
    id: 4,
    name: "Morgan Chen",
    title: "UX Researcher",
    company: "UserFirst",
    avatar: "/placeholder.svg?height=100&width=100",
    date: "August 5, 2023",
    location: "UX Conference, Chicago",
    coordinates: { lat: 41.8781, lng: -87.6298 },
    notes: "Exchanged ideas on user testing methodologies",
  },
  {
    id: 5,
    name: "Jordan Williams",
    title: "Product Manager",
    company: "ProductSphere",
    avatar: "/placeholder.svg?height=100&width=100",
    date: "September 20, 2023",
    location: "Product Summit, Austin",
    coordinates: { lat: 30.2672, lng: -97.7431 },
    notes: "Discussed roadmap planning strategies",
  },
  {
    id: 6,
    name: "Alex Rivera",
    title: "Graphic Designer",
    company: "VisualCraft",
    avatar: "/placeholder.svg?height=100&width=100",
    date: "October 8, 2023",
    location: "Design Workshop, Seattle",
    coordinates: { lat: 47.6062, lng: -122.3321 },
    notes: "Shared portfolio and discussed freelance opportunities",
  },
]

export default function ConnectionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedConnection, setSelectedConnection] = useState(null)
  const [activeTab, setActiveTab] = useState("list")
  const [userLocation, setUserLocation] = useState(null)
  const isMobile = useMobile()

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }, [])

  // Filter connections based on search term
  const filteredConnections = connectionData.filter(
    (connection) =>
      connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connection.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="font-semibold">My Connections</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                {!isMobile && <span>Home</span>}
              </Button>
            </Link>
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {connectionData.length} Connections
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search connections..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All time</SelectItem>
                <SelectItem value="month">Last month</SelectItem>
                <SelectItem value="quarter">Last quarter</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>

          {/* List View */}
          <TabsContent value="list">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredConnections.length > 0 ? (
                filteredConnections.map((connection) => (
                  <Card key={connection.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="p-4 flex gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={connection.avatar} alt={connection.name} />
                          <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-medium">{connection.name}</h3>
                          <p className="text-sm text-gray-600">
                            {connection.title} at {connection.company}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {connection.date}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {connection.location}
                            </div>
                          </div>
                        </div>
                        <Link href={`/profile?id=${connection.id}`}>
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                        </Link>
                      </div>
                      {connection.notes && (
                        <div className="px-4 py-2 border-t bg-gray-50">
                          <p className="text-xs text-gray-600">{connection.notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 text-center py-12">
                  <p className="text-gray-500">No connections found matching your search.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Map View */}
          <TabsContent value="map">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Map */}
              <div className="md:col-span-2">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <MapComponent
                      connections={connectionData}
                      selectedConnection={selectedConnection}
                      setSelectedConnection={setSelectedConnection}
                      userLocation={userLocation}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Connection Details */}
              <div className="md:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    {selectedConnection ? (
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <Avatar>
                            <AvatarImage src={selectedConnection.avatar} alt={selectedConnection.name} />
                            <AvatarFallback>{selectedConnection.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{selectedConnection.name}</h3>
                            <p className="text-sm text-gray-600">{selectedConnection.title}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Company</h4>
                            <p>{selectedConnection.company}</p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Connected On</h4>
                            <p>{selectedConnection.date}</p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Location</h4>
                            <p>{selectedConnection.location}</p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                            <p className="text-sm">{selectedConnection.notes}</p>
                          </div>
                        </div>

                        <div className="mt-6 flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            Message
                          </Button>
                          <Button size="sm" className="flex-1" asChild>
                            <Link href={`/profile?id=${selectedConnection.id}`}>View Profile</Link>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <MapPin className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <h3 className="font-medium mb-1">Select a Connection</h3>
                        <p className="text-sm text-gray-500">Click on a marker on the map to view connection details</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="mt-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-medium mb-4">Connection Statistics</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Total Connections</span>
                          <Badge variant="secondary">{connectionData.length}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Cities</span>
                          <Badge variant="secondary">6</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Countries</span>
                          <Badge variant="secondary">1</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Most Active Month</span>
                          <Badge variant="secondary">September</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
