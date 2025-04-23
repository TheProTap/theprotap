"use client"

import { ArrowLeft, Home, Smartphone, QrCode, LinkIcon, Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useMobile } from "@/hooks/use-mobile"

export default function NfcLinkingPage() {
  const isMobile = useMobile()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/how-it-works" className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="font-semibold">How NFC Card Linking Works</h1>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              {!isMobile && <span>Home</span>}
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="h-48 bg-gradient-to-r from-primary to-primary/70 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Linking NFC Cards to Your Profile</h1>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Understanding how THE PRO TAP connects physical cards to digital profiles
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">How NFC Technology Works</h2>
            <p className="text-gray-700 mb-4">
              NFC (Near Field Communication) is a technology that allows two devices to communicate when they're close
              together. THE PRO TAP cards contain an NFC chip that stores a unique identifier or URL. When someone taps
              your card with their smartphone, their phone reads this information and opens your digital profile in
              their browser.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">NFC-Enabled Devices</h3>
                  <p className="text-gray-600">
                    Most modern smartphones (both Android and iPhone) support NFC technology. For iPhone users, models
                    from iPhone XS and newer support background NFC reading.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <QrCode className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">QR Backup</h3>
                  <p className="text-gray-600">
                    For older devices or those without NFC capabilities, we include a QR code on the back of the card as
                    a fallback option.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <LinkIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Instant Connection</h3>
                  <p className="text-gray-600">
                    The NFC chip creates an instant connection between your physical card and digital profile, allowing
                    for seamless information sharing.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Linking Your Physical Card to Your Profile</h2>
            <p className="text-gray-700 mb-4">
              When you receive your THE PRO TAP card, you'll need to link it to your digital profile. This process is
              simple and only takes a few minutes.
            </p>
            <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="font-bold">1</span>
                  </div>
                  <h3 className="font-medium mb-2">Create Your Profile</h3>
                  <p className="text-sm text-gray-600">
                    Sign up for THE PRO TAP and create your digital profile with all your professional information.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="font-bold">2</span>
                  </div>
                  <h3 className="font-medium mb-2">Find Your Card Code</h3>
                  <p className="text-sm text-gray-600">
                    Locate the unique code printed on the back of your NFC card or on the packaging.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="font-bold">3</span>
                  </div>
                  <h3 className="font-medium mb-2">Enter the Code</h3>
                  <p className="text-sm text-gray-600">
                    Go to the "Cards" section in your dashboard and click "Link Existing Card" to enter your unique card
                    code.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="font-bold">4</span>
                  </div>
                  <h3 className="font-medium mb-2">Start Using Your Card</h3>
                  <p className="text-sm text-gray-600">
                    Once linked, your physical card will direct people to your digital profile when tapped.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Technical Details</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">How the Linking Process Works</h3>
              <ol className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-sm font-medium">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Card Manufacturing</p>
                    <p className="text-gray-600">
                      Each THE PRO TAP card is manufactured with an embedded NFC chip. During production, each chip is
                      programmed with a unique identifier and QR code is printed on the back.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-sm font-medium">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Card Registration</p>
                    <p className="text-gray-600">
                      When you enter your card's unique code in your dashboard, our system associates that specific card
                      with your user account in our database.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-sm font-medium">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Card Activation</p>
                    <p className="text-gray-600">
                      Once linked, the card is activated and ready to use. The NFC chip now points to your specific
                      profile URL.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-sm font-medium">4</span>
                  </div>
                  <div>
                    <p className="font-medium">Using the Card</p>
                    <p className="text-gray-600">
                      When someone taps your card with their smartphone, their phone reads the unique identifier from
                      the NFC chip and sends a request to our servers.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-sm font-medium">5</span>
                  </div>
                  <div>
                    <p className="font-medium">Profile Retrieval</p>
                    <p className="text-gray-600">
                      Our server looks up the unique identifier, finds your associated profile, and returns your current
                      profile data to the person who tapped your card.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Security and Privacy</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Secure Linking</p>
                    <p className="text-gray-600">
                      Each card has a unique code that can only be linked to one profile at a time, ensuring security
                      and preventing unauthorized use.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Deactivation Option</p>
                    <p className="text-gray-600">
                      If your card is lost or stolen, you can immediately deactivate it from your dashboard, preventing
                      anyone from accessing your profile through that card.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Data Control</p>
                    <p className="text-gray-600">
                      You have complete control over what information is displayed on your profile, and you can update
                      it at any time.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Analytics Privacy</p>
                    <p className="text-gray-600">
                      While we provide analytics on card taps and profile views, we respect user privacy and only
                      collect anonymous usage data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-black text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Order your THE PRO TAP NFC business card today and revolutionize your networking experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Order Your Card
              </Button>
              <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" size="lg">
                Learn More
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
