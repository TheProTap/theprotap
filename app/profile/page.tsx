"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, Users, UserPlus, UserCheck, Share2, Mail, Globe, Phone, Home, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useMobile } from "@/hooks/use-mobile"
import FollowersList from "./followers-list"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false)
  const [followers, setFollowers] = useState(0)
  const isMobile = useMobile()

  // Empty profile data
  const profile = {
    name: "",
    title: "",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "",
    location: "",
    following: 0,
    connections: 0,
    skills: [],
    socials: [
      { icon: <Globe className="h-4 w-4" />, label: "", url: "#" },
      { icon: <Mail className="h-4 w-4" />, label: "", url: "#" },
      { icon: <Phone className="h-4 w-4" />, label: "", url: "#" },
    ],
    recentConnections: [],
  }

  const toggleFollow = () => {
    if (isFollowing) {
      setFollowers((prev) => prev - 1)
      setIsFollowing(false)
      toast({
        title: "Unfollowed",
        description: `You are no longer following this user`,
      })
    } else {
      setFollowers((prev) => prev + 1)
      setIsFollowing(true)
      toast({
        title: "Following",
        description: `You are now following this user`,
      })
    }
  }

  // Empty connections
  const additionalConnections = []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="font-semibold">Profile</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-1 mr-2">
                <Home className="h-4 w-4" />
                {!isMobile && <span>Home</span>}
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="h-32 bg-black"></div>
          <div className="px-4 sm:px-6 pb-6 relative">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-white -mt-10 sm:-mt-12 relative z-10">
                <AvatarImage src={profile.avatar} alt={profile.name || "Profile"} />
                <AvatarFallback>?</AvatarFallback>
              </Avatar>
              <div className="flex-1 mt-2 md:mt-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold">{profile.name || "Your Name"}</h2>
                    <p className="text-gray-600">{profile.title || "Your Professional Title"}</p>
                  </div>
                  <div className="flex gap-2 mt-3 md:mt-0">
                    <Button
                      variant={isFollowing ? "outline" : "default"}
                      onClick={toggleFollow}
                      className="flex items-center gap-1"
                    >
                      {isFollowing ? (
                        <>
                          <UserCheck className="h-4 w-4 mr-1" />
                          Following
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-4 w-4 mr-1" />
                          Follow
                        </>
                      )}
                    </Button>
                    <Button variant="outline">
                      <MapPin className="h-4 w-4 mr-1" />
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{profile.location || "Your Location"}</span>
              </div>
              <Link href="/connections" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{profile.connections} connections</span>
              </Link>
              <div className="flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{followers} followers</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Following {profile.following}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">About</h3>
                <p className="text-gray-600 text-sm">{profile.bio || "Your professional bio will appear here."}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  {profile.socials.map((social, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {social.icon}
                      <span className="text-sm text-gray-600">{social.label || "Add your contact information"}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Skills</h3>
                {profile.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-100">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Add your skills to showcase your expertise</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2">
            <Tabs defaultValue="activity">
              <TabsList>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="connections">Connections</TabsTrigger>
                <TabsTrigger value="followers">Followers</TabsTrigger>
              </TabsList>

              <TabsContent value="activity">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Recent Connections</h3>
                    {profile.recentConnections && profile.recentConnections.length > 0 ? (
                      <div className="space-y-4">
                        {profile.recentConnections.map((connection) => (
                          <div key={connection.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                            <Avatar>
                              <AvatarImage
                                src={
                                  connection.avatar ||
                                  `/placeholder.svg?height=100&width=100&text=${connection.name.charAt(0)}`
                                }
                                alt={connection.name}
                              />
                              <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="font-medium">{connection.name}</div>
                              <div className="text-sm text-gray-600">{connection.title}</div>
                              <div className="mt-1 flex items-center gap-2">
                                <MapPin className="h-3 w-3 text-gray-500" />
                                <span className="text-xs text-gray-500">{connection.location}</span>
                              </div>
                              <div className="text-xs text-gray-400 mt-1">{connection.date}</div>
                            </div>
                            <div>
                              <Link href={`/profile?id=${connection.id}`}>
                                <Button variant="outline" size="sm">
                                  View Profile
                                </Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 border border-dashed rounded-md">
                        <Users className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500">No connections yet</p>
                        <p className="text-sm text-gray-400 mt-1">Connect with others to build your network</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="connections">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input placeholder="Search connections..." className="pl-10" />
                      </div>

                      {profile.recentConnections && profile.recentConnections.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {profile.recentConnections.map((connection) => (
                            <div
                              key={connection.id}
                              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50"
                            >
                              <div className="flex items-center flex-1 gap-3">
                                <Avatar>
                                  <AvatarImage src={connection.avatar} alt={connection.name} />
                                  <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{connection.name}</div>
                                  <div className="text-sm text-gray-600">{connection.title}</div>
                                  <div className="text-xs text-gray-400">{connection.date}</div>
                                </div>
                              </div>
                              <div>
                                <Link href={`/profile?id=${connection.id}`}>
                                  <Button variant="outline" size="sm">
                                    View
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 border border-dashed rounded-md">
                          <Users className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                          <p className="text-gray-500">No connections yet</p>
                          <p className="text-sm text-gray-400 mt-1">Connect with others to build your network</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="followers">
                <Card>
                  <CardContent className="p-6">
                    <FollowersList />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
