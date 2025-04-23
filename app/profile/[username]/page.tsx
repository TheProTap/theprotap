"use client"

import { useState } from "react"
import {
  Phone,
  Mail,
  MapPin,
  Download,
  Share2,
  Linkedin,
  Instagram,
  Twitter,
  Github,
  Globe,
  Check,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default function PublicProfilePage({ params }) {
  const [contactSaved, setContactSaved] = useState(false)
  const username = params?.username || "alexmorgan"

  // Mock profile data - in a real app, this would be fetched from an API
  const profile = {
    name: "Alex Morgan",
    title: "Product Designer",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Creative designer with 8+ years of experience in UI/UX and product design. Passionate about creating intuitive digital experiences.",
    location: "San Francisco, CA",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    website: "alexmorgan.design",
    skills: ["UI Design", "UX Research", "Figma", "Product Strategy", "Wireframing", "Prototyping", "User Testing"],
    socialLinks: {
      linkedin: "linkedin.com/in/alexmorgan",
      twitter: "twitter.com/alexmorgan",
      instagram: "instagram.com/alexmorgan",
      github: "github.com/alexmorgan",
    },
    experiences: [
      {
        id: 1,
        title: "Senior Product Designer",
        company: "TechCorp Inc.",
        location: "San Francisco",
        startDate: "2020-01",
        endDate: "",
        current: true,
        description:
          "Led design for flagship product, increasing user engagement by 35%. Managed a team of 3 designers and established design system.",
      },
      {
        id: 2,
        title: "UX Designer",
        company: "DesignHub",
        location: "New York",
        startDate: "2017-03",
        endDate: "2019-12",
        current: false,
        description:
          "Designed user interfaces for various clients in fintech and healthcare sectors. Conducted user research and usability testing.",
      },
    ],
    education: [
      {
        id: 1,
        school: "Rhode Island School of Design",
        degree: "Bachelor of Design",
        field: "Graphic Design",
        startDate: "2013-09",
        endDate: "2017-05",
        current: false,
        description: "Graduated with honors. Specialized in digital product design.",
      },
    ],
    portfolioItems: [
      {
        id: 1,
        title: "Finance App Redesign",
        description:
          "Complete redesign of a mobile banking application focusing on improving user experience and accessibility.",
        link: "https://alexmorgan.design/projects/finance-app",
        type: "project",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: 2,
        title: "E-commerce Website",
        description: "Designed and prototyped a responsive e-commerce website with a focus on conversion optimization.",
        link: "https://alexmorgan.design/projects/ecommerce",
        type: "project",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: 3,
        title: "Health Tracker App",
        description:
          "UI/UX design for a health tracking mobile application with a focus on data visualization and user engagement.",
        link: "https://alexmorgan.design/projects/health-tracker",
        type: "project",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: 4,
        title: "Brand Identity",
        description:
          "Complete brand identity design for a tech startup, including logo, color palette, typography, and brand guidelines.",
        link: "https://alexmorgan.design/projects/brand-identity",
        type: "project",
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
  }

  const saveContact = () => {
    // In a real app, this would create a vCard or similar contact format
    // and trigger a download or add to contacts
    setContactSaved(true)

    // Create a vCard format string
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
TITLE:${profile.title}
TEL:${profile.phone}
EMAIL:${profile.email}
URL:${profile.website}
ADR:;;${profile.location};;;
END:VCARD`

    // Create a blob and download it
    const blob = new Blob([vCard], { type: "text/vcard" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${profile.name.replace(" ", "_")}.vcf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Show success message for 3 seconds
    setTimeout(() => {
      setContactSaved(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-black text-white p-6 relative">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center">
            <Avatar className="h-20 w-20 border-2 border-white mr-4">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback>
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-white/80">{profile.title}</p>
              <div className="mt-1 flex items-center">
                <MapPin className="h-3 w-3 mr-1 text-white/60" />
                <span className="text-sm text-white/60">{profile.location}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10"
              onClick={saveContact}
            >
              <Download className="h-4 w-4 mr-2" />
              Save Contact
            </Button>
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          {contactSaved && (
            <div className="absolute bottom-2 left-0 right-0 mx-auto w-max bg-green-500 text-white text-sm py-1 px-3 rounded-full flex items-center">
              <Check className="h-3 w-3 mr-1" />
              Contact saved to phone!
            </div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Tabs */}
        <Tabs defaultValue="about">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-3">About Me</h2>
                  <p className="text-gray-700">{profile.bio}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-3">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-100">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-3">Connect with {profile.name.split(" ")[0]}</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {profile.socialLinks.linkedin && (
                      <a
                        href={`https://${profile.socialLinks.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-3 border rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <Linkedin className="h-6 w-6 text-[#0077B5] mb-2" />
                        <span className="text-xs">LinkedIn</span>
                      </a>
                    )}

                    {profile.socialLinks.instagram && (
                      <a
                        href={`https://${profile.socialLinks.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-3 border rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <Instagram className="h-6 w-6 text-[#E4405F] mb-2" />
                        <span className="text-xs">Instagram</span>
                      </a>
                    )}

                    {profile.socialLinks.twitter && (
                      <a
                        href={`https://${profile.socialLinks.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-3 border rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <Twitter className="h-6 w-6 text-[#1DA1F2] mb-2" />
                        <span className="text-xs">Twitter</span>
                      </a>
                    )}

                    {profile.socialLinks.github && (
                      <a
                        href={`https://${profile.socialLinks.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-3 border rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <Github className="h-6 w-6 mb-2" />
                        <span className="text-xs">GitHub</span>
                      </a>
                    )}

                    {profile.website && (
                      <a
                        href={`https://${profile.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-3 border rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <Globe className="h-6 w-6 text-gray-700 mb-2" />
                        <span className="text-xs">Website</span>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Work Experience</h2>
                  <div className="space-y-6">
                    {profile.experiences.map((exp) => (
                      <div key={exp.id} className="border-b pb-6 last:border-0 last:pb-0">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{exp.title}</h3>
                            <p className="text-gray-600">{exp.company}</p>
                            <p className="text-sm text-gray-500">{exp.location}</p>
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(exp.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })} -{" "}
                            {exp.current
                              ? "Present"
                              : new Date(exp.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                          </div>
                        </div>
                        <p className="mt-2 text-gray-700">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Education</h2>
                  <div className="space-y-6">
                    {profile.education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">
                              {edu.degree} in {edu.field}
                            </h3>
                            <p className="text-gray-600">{edu.school}</p>
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(edu.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })} -{" "}
                            {edu.current
                              ? "Present"
                              : new Date(edu.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                          </div>
                        </div>
                        {edu.description && <p className="mt-2 text-gray-700">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio">
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profile.portfolioItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="aspect-video bg-gray-100">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        View Project
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <a
                  href={`https://${profile.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center"
                >
                  View Full Portfolio
                  <ChevronDown className="h-4 w-4 ml-1 rotate-270" />
                </a>
              </div>
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{profile.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{profile.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <a
                        href={`https://${profile.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:underline"
                      >
                        {profile.website}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{profile.location}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="font-medium">Save Contact</h3>
                  <p className="text-sm text-gray-600">
                    Save {profile.name}'s contact information to your phone for easy access.
                  </p>
                  <Button onClick={saveContact} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Save to Contacts
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Powered by THE PRO TAP</p>
          <p className="mt-1">
            <a href="/" className="text-primary hover:underline">
              Get your own digital business card
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
