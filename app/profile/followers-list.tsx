"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users } from "lucide-react"

export default function FollowersList() {
  const [searchQuery, setSearchQuery] = useState("")

  // Empty followers list
  const followers = []

  const filteredFollowers = followers.filter((follower) =>
    follower.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          placeholder="Search followers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
      </div>

      {filteredFollowers.length > 0 ? (
        <div className="space-y-4">
          {filteredFollowers.map((follower) => (
            <div key={follower.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={follower.avatar} alt={follower.name} />
                  <AvatarFallback>{follower.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{follower.name}</div>
                  <div className="text-sm text-gray-600">{follower.title}</div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Profile
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border border-dashed rounded-md">
          <Users className="h-10 w-10 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500">No followers yet</p>
          <p className="text-sm text-gray-400 mt-1">Share your profile to gain followers</p>
        </div>
      )}
    </div>
  )
}
