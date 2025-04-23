"use client"

import { ArrowLeft, Check, ChevronRight, Home, Smartphone, Palette, Share2, BarChart, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMobile } from "@/hooks/use-mobile"

export default function LearnMorePage() {
  const isMobile = useMobile()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="font-semibold">Learn More</h1>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              {!isMobile && <span>Home</span>}
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="h-48 bg-gradient-to-r from-primary to-primary/70 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">The Future of Networking</h1>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Discover how Pro Tap is revolutionizing professional connections
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="features" className="mb-8">
          <TabsList className="w-full justify-start mb-6 overflow-x-auto">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          {/* Features Tab */}
          <TabsContent value="features">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Digital Profile</h3>
                  <p className="text-gray-600 mb-4">
                    Create a comprehensive digital profile that showcases your professional identity, including contact
                    information, social links, portfolio, and more.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Customizable profile layout</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Social media integration</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Portfolio showcase</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Custom NFC Cards</h3>
                  <p className="text-gray-600 mb-4">
                    Choose from a variety of high-quality NFC card options, including different materials, designs, and
                    personalization options.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Multiple material options</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Custom engraving</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Color customization</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Share2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Networking Tools</h3>
                  <p className="text-gray-600 mb-4">
                    Build and manage your professional network with our suite of networking tools designed to help you
                    make meaningful connections.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Connection tracking</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Location-based networking map</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Follow and connection system</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <BarChart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
                  <p className="text-gray-600 mb-4">
                    Gain insights into your networking activities with our comprehensive analytics dashboard.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Profile view tracking</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Connection statistics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Engagement metrics</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Privacy Controls</h3>
                  <p className="text-gray-600 mb-4">
                    Maintain control over your data with our robust privacy settings and security features.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Granular privacy settings</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Data encryption</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">GDPR compliance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Instant Updates</h3>
                  <p className="text-gray-600 mb-4">
                    Keep your information current with instant profile updates that reflect across all your connections.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Real-time profile changes</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Automatic contact updates</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Status notifications</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* How It Works Tab */}
          <TabsContent value="how-it-works">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">How Pro Tap Works</h2>
              <p className="text-gray-600 mb-6">
                Pro Tap combines NFC technology with a powerful digital platform to create a seamless networking
                experience. Here's how it works:
              </p>

              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">1</span>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-semibold mb-2">Create Your Digital Profile</h3>
                    <p className="text-gray-600">
                      Sign up for Pro Tap and build your comprehensive digital profile. Add your contact information,
                      social media links, portfolio, resume, and more. Customize the appearance to match your personal
                      brand.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">2</span>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-semibold mb-2">Design Your NFC Card</h3>
                    <p className="text-gray-600">
                      Choose from our selection of card materials, designs, and customization options. Select a color
                      scheme, add your name and logo, and preview your physical NFC card before ordering.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">3</span>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-semibold mb-2">Receive Your Card</h3>
                    <p className="text-gray-600">
                      We'll produce and ship your custom NFC card directly to your door. Each card is programmed with
                      your unique profile link and tested for quality before shipping.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">4</span>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-semibold mb-2">Share Your Profile</h3>
                    <p className="text-gray-600">
                      When you meet someone, simply have them tap your card with their smartphone. Their phone will
                      instantly open your digital profile, allowing them to view your information and connect with you.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">5</span>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-semibold mb-2">Build Your Network</h3>
                    <p className="text-gray-600">
                      As you connect with people, your network grows. Track your connections, see where you've networked
                      on the map, and maintain relationships through our platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-4">Technical Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">NFC Technology</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">NFC Type: NTAG216</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Memory: 888 bytes</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Compatible with all modern smartphones</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Card Specifications</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Dimensions: 85.60 × 53.98 mm (standard)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Materials: PVC, Metal, or Bamboo</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Waterproof and durable construction</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Comparison Tab */}
          <TabsContent value="comparison">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Pro Tap vs. Traditional Business Cards</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Feature</th>
                      <th className="text-center py-3 px-4">Pro Tap</th>
                      <th className="text-center py-3 px-4">Traditional Cards</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Updatable Information</td>
                      <td className="py-3 px-4 text-center text-green-600">
                        <Check className="h-5 w-5 mx-auto" />
                      </td>
                      <td className="py-3 px-4 text-center text-red-500">✕</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Environmental Impact</td>
                      <td className="py-3 px-4 text-center">Minimal (one card)</td>
                      <td className="py-3 px-4 text-center">High (multiple prints)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Information Capacity</td>
                      <td className="py-3 px-4 text-center">Unlimited</td>
                      <td className="py-3 px-4 text-center">Limited to card size</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Analytics</td>
                      <td className="py-3 px-4 text-center text-green-600">
                        <Check className="h-5 w-5 mx-auto" />
                      </td>
                      <td className="py-3 px-4 text-center text-red-500">✕</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Networking Features</td>
                      <td className="py-3 px-4 text-center text-green-600">
                        <Check className="h-5 w-5 mx-auto" />
                      </td>
                      <td className="py-3 px-4 text-center text-red-500">✕</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Initial Cost</td>
                      <td className="py-3 px-4 text-center">Higher</td>
                      <td className="py-3 px-4 text-center">Lower</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Long-term Cost</td>
                      <td className="py-3 px-4 text-center">Lower</td>
                      <td className="py-3 px-4 text-center">Higher (reprints)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-4">Pro Tap Tiers Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Feature</th>
                      <th className="text-center py-3 px-4">Basic ($25)</th>
                      <th className="text-center py-3 px-4">Engraved ($35)</th>
                      <th className="text-center py-3 px-4">Premium ($50)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Material</td>
                      <td className="py-3 px-4 text-center">Plastic</td>
                      <td className="py-3 px-4 text-center">Premium Plastic</td>
                      <td className="py-3 px-4 text-center">Metal</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Custom Engraving</td>
                      <td className="py-3 px-4 text-center text-red-500">✕</td>
                      <td className="py-3 px-4 text-center text-green-600">
                        <Check className="h-5 w-5 mx-auto" />
                      </td>
                      <td className="py-3 px-4 text-center text-green-600">
                        <Check className="h-5 w-5 mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Digital Profile</td>
                      <td className="py-3 px-4 text-center">Basic</td>
                      <td className="py-3 px-4 text-center">Enhanced</td>
                      <td className="py-3 px-4 text-center">Full-featured</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Analytics</td>
                      <td className="py-3 px-4 text-center">Basic</td>
                      <td className="py-3 px-4 text-center">Advanced</td>
                      <td className="py-3 px-4 text-center">Premium</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Multiple Designs</td>
                      <td className="py-3 px-4 text-center text-red-500">✕</td>
                      <td className="py-3 px-4 text-center text-red-500">✕</td>
                      <td className="py-3 px-4 text-center text-green-600">
                        <Check className="h-5 w-5 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Support</td>
                      <td className="py-3 px-4 text-center">Standard</td>
                      <td className="py-3 px-4 text-center">Priority</td>
                      <td className="py-3 px-4 text-center">VIP</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-lg font-semibold">JD</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">John Doe</h3>
                      <p className="text-sm text-gray-600">Marketing Director, TechCorp</p>
                      <div className="mt-3 text-gray-700">
                        "Pro Tap has completely transformed how I network at industry events. I no longer worry about
                        running out of business cards, and I love being able to update my information instantly."
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-lg font-semibold">SJ</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Sarah Johnson</h3>
                      <p className="text-sm text-gray-600">Freelance Designer</p>
                      <div className="mt-3 text-gray-700">
                        "As a freelancer, making a good impression is crucial. My premium metal Pro Tap always gets a
                        positive reaction, and I've secured several clients through connections made with it."
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-lg font-semibold">MR</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Michael Rodriguez</h3>
                      <p className="text-sm text-gray-600">Startup Founder</p>
                      <div className="mt-3 text-gray-700">
                        "The analytics feature has been invaluable for our startup. Being able to see who's viewed our
                        profile and track connections has helped us focus our networking efforts more effectively."
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-lg font-semibold">EL</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Emma Lee</h3>
                      <p className="text-sm text-gray-600">Sales Executive</p>
                      <div className="mt-3 text-gray-700">
                        "In sales, follow-up is everything. The connection map feature helps me remember where and when
                        I met each prospect, making my follow-up conversations much more personal and effective."
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 bg-primary/5 rounded-xl p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Join Thousands of Satisfied Professionals</h3>
              <p className="text-gray-600 mb-4">
                Pro Tap is trusted by professionals across industries to make meaningful connections.
              </p>
              <Link href="/create-card">
                <Button size="lg">
                  Create Your Card
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

              <div>
                <h3 className="text-lg font-medium mb-2">How does the NFC technology work?</h3>
                <p className="text-gray-600">
                  NFC (Near Field Communication) is a technology that allows two devices to communicate when they're
                  close together. Our Pro Tap contain an NFC chip programmed with a unique URL that points to your
                  digital profile. When someone taps your card with their smartphone, their phone reads this URL and
                  opens your profile in their browser.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Is Pro Tap compatible with all smartphones?</h3>
                <p className="text-gray-600">
                  Most modern smartphones (both Android and iPhone) support NFC technology. For iPhone users, models
                  from iPhone XS and newer support background NFC reading. For older devices or those without NFC
                  capabilities, we include a QR code on the back of the card as a fallback option.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Can I update my profile after purchasing?</h3>
                <p className="text-gray-600">
                  Yes! You can update your digital profile anytime through our web dashboard. The physical card will
                  always direct to your latest profile information. This is one of the key advantages of Pro Tap over
                  traditional business cards.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">How long does it take to receive my card?</h3>
                <p className="text-gray-600">
                  Standard shipping typically takes 5-7 business days within the United States. International shipping
                  may take 10-14 business days. We also offer expedited shipping options at checkout.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">What happens if I lose my card?</h3>
                <p className="text-gray-600">
                  If you lose your card, you can order a replacement through your dashboard. Your digital profile and
                  all your connections remain intact, and the new card will link to the same profile. We recommend
                  deactivating your lost card through your dashboard for security purposes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">How is my data protected?</h3>
                <p className="text-gray-600">
                  We take data security seriously. All data is encrypted both in transit and at rest. You have complete
                  control over what information is visible on your profile and who can see it. Our platform is GDPR
                  compliant, and we never sell your personal information to third parties.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Is there a subscription fee?</h3>
                <p className="text-gray-600">
                  The basic digital profile is included with your card purchase with no additional subscription fees.
                  Premium features like advanced analytics and multiple profile designs are available with our Premium
                  tier or as add-ons to other tiers.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary/90 to-primary rounded-xl shadow-sm p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Ready to Revolutionize Your Networking?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Join thousands of professionals who are making meaningful connections with Pro Tap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create-card">
              <Button size="lg" variant="secondary">
                Create Your Card
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
