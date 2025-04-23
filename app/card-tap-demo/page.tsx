"use client"

import { useState } from "react"
import {
  ArrowLeft,
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
  Home,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useMobile } from "@/hooks/use-mobile"

export default function CardTapDemoPage() {
  const [contactSaved, setContactSaved] = useState(false)
  const isMobile = useMobile()

  const saveContact = () => {
    setContactSaved(true)
    const timer = setTimeout(() => {
      setContactSaved(false)
    }, 3000)

    // Clean up the timeout to prevent memory leaks
    return () => clearTimeout(timer)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="font-semibold">Card Tap Demo</h1>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              {!isMobile && <span>Home</span>}
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold mb-2">What happens when someone taps your card</h2>
          <p className="text-gray-600">This is what people will see when they tap your Pro Tap NFC business card</p>
        </div>

        <div className="border rounded-lg overflow-hidden shadow-sm mb-8">
          <div className="bg-gray-100 p-2 border-b flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <div className="flex-1 text-center text-xs text-gray-500">Phone Browser</div>
          </div>

          {/* Profile Header */}
          <div className="bg-black text-white p-6 relative">
            <div className="flex items-center">
              <div className="w-20 h-20 rounded-full bg-white mr-4 flex items-center justify-center text-black text-2xl font-bold">
                AS
              </div>
              <div>
                <h2 className="text-xl font-bold">Alex Smith</h2>
                <p className="text-white/80">Product Designer</p>
                <div className="mt-1 flex items-center">
                  <MapPin className="h-3 w-3 mr-1 text-white/60" />
                  <span className="text-sm text-white/60">San Francisco, CA</span>
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
              <div className="absolute bottom-2 left-0 right-0 mx-auto w-max bg-green-500 text-white text-sm py-1 px-3 rounded-full">
                Contact saved to phone!
              </div>
            )}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="contact">
            <TabsList className="w-full justify-start px-4 pt-4">
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="resume">Resume</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            </TabsList>

            {/* Contact Tab */}
            <TabsContent value="contact" className="p-4">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">alex.smith@example.com</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <a href="#" className="font-medium text-primary">
                      alexsmith.design
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Social Media</h3>
                <div className="grid grid-cols-4 gap-2">
                  <a href="#" className="flex flex-col items-center p-2 border rounded-md hover:bg-gray-50">
                    <Linkedin className="h-6 w-6 text-[#0077B5] mb-1" />
                    <span className="text-xs">LinkedIn</span>
                  </a>
                  <a href="#" className="flex flex-col items-center p-2 border rounded-md hover:bg-gray-50">
                    <Instagram className="h-6 w-6 text-[#E4405F] mb-1" />
                    <span className="text-xs">Instagram</span>
                  </a>
                  <a href="#" className="flex flex-col items-center p-2 border rounded-md hover:bg-gray-50">
                    <Twitter className="h-6 w-6 text-[#1DA1F2] mb-1" />
                    <span className="text-xs">Twitter</span>
                  </a>
                  <a href="#" className="flex flex-col items-center p-2 border rounded-md hover:bg-gray-50">
                    <Github className="h-6 w-6 mb-1" />
                    <span className="text-xs">GitHub</span>
                  </a>
                </div>
              </div>
            </TabsContent>

            {/* About Tab */}
            <TabsContent value="about" className="p-4">
              <p className="text-gray-700 mb-4">
                Creative product designer with 8+ years of experience in UI/UX and digital product design. Passionate
                about creating intuitive and engaging user experiences that solve real problems.
              </p>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">UI Design</Badge>
                  <Badge variant="secondary">UX Research</Badge>
                  <Badge variant="secondary">Figma</Badge>
                  <Badge variant="secondary">Prototyping</Badge>
                  <Badge variant="secondary">User Testing</Badge>
                  <Badge variant="secondary">Design Systems</Badge>
                  <Badge variant="secondary">Product Strategy</Badge>
                </div>
              </div>
            </TabsContent>

            {/* Resume Tab */}
            <TabsContent value="resume" className="p-4">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Work Experience</h3>
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-medium">Senior Product Designer</h4>
                          <span className="text-sm text-gray-500">2020 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">TechCorp Inc., San Francisco</p>
                        <p className="text-sm text-gray-700">
                          Led design for flagship product, increasing user engagement by 35%. Managed a team of 3
                          designers and established design system.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-medium">UX Designer</h4>
                          <span className="text-sm text-gray-500">2017 - 2020</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">DesignHub, New York</p>
                        <p className="text-sm text-gray-700">
                          Designed user interfaces for various clients in fintech and healthcare sectors. Conducted user
                          research and usability testing.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Education</h3>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium">Bachelor of Design</h4>
                        <span className="text-sm text-gray-500">2013 - 2017</span>
                      </div>
                      <p className="text-sm text-gray-600">Rhode Island School of Design</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-center">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Full Resume
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Portfolio Tab */}
            <TabsContent value="portfolio" className="p-4">
              <div className="grid grid-cols-2 gap-3">
                <a href="#" className="block">
                  <div className="aspect-square bg-gray-200 rounded-md mb-1"></div>
                  <h4 className="font-medium text-sm">Finance App Redesign</h4>
                  <p className="text-xs text-gray-500">UX/UI Design</p>
                </a>

                <a href="#" className="block">
                  <div className="aspect-square bg-gray-200 rounded-md mb-1"></div>
                  <h4 className="font-medium text-sm">E-commerce Website</h4>
                  <p className="text-xs text-gray-500">Web Design</p>
                </a>

                <a href="#" className="block">
                  <div className="aspect-square bg-gray-200 rounded-md mb-1"></div>
                  <h4 className="font-medium text-sm">Health Tracker App</h4>
                  <p className="text-xs text-gray-500">Mobile App</p>
                </a>

                <a href="#" className="block">
                  <div className="aspect-square bg-gray-200 rounded-md mb-1"></div>
                  <h4 className="font-medium text-sm">Brand Identity</h4>
                  <p className="text-xs text-gray-500">Branding</p>
                </a>
              </div>

              <div className="mt-4 text-center">
                <a href="#" className="text-sm text-primary font-medium">
                  View All Projects
                </a>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="font-medium mb-2">How it works</h3>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 flex-shrink-0">
                1
              </span>
              <span>When someone taps your Pro Tap NFC card, their phone immediately opens this profile page</span>
            </li>
            <li className="flex items-start">
              <span className="bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 flex-shrink-0">
                2
              </span>
              <span>They can save your contact information directly to their phone with one tap</span>
            </li>
            <li className="flex items-start">
              <span className="bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 flex-shrink-0">
                3
              </span>
              <span>They can view your full profile, resume, portfolio, and social media links</span>
            </li>
            <li className="flex items-start">
              <span className="bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 flex-shrink-0">
                4
              </span>
              <span>All your information stays up-to-date as you make changes to your profile</span>
            </li>
          </ol>

          <div className="mt-4">
            <Link href="/create-card">
              <Button className="w-full">Create Your Card Now</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
