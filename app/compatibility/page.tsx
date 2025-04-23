"use client"

import { useState } from "react"
import { ArrowLeft, Check, X, AlertCircle, HelpCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function CompatibilityPage() {
  const [activeTab, setActiveTab] = useState("ios")

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="font-semibold">Device Compatibility</h1>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Pro Tap Compatibility Guide</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Check if your device is compatible with Pro Tap NFC cards and learn how to use them with different devices
          </p>
        </div>

        <Alert className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Pro Tap cards use NFC (Near Field Communication) technology. Most modern smartphones support NFC, but some
            older models may not. If your device doesn't support NFC, you can still use the QR code on the back of your
            card.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="ios" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ios">iOS (iPhone)</TabsTrigger>
            <TabsTrigger value="android">Android</TabsTrigger>
            <TabsTrigger value="windows">Windows</TabsTrigger>
          </TabsList>

          <TabsContent value="ios" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
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
                    className="h-5 w-5 mr-2"
                  >
                    <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
                    <path d="M10 2c1 .5 2 2 2 5"></path>
                  </svg>
                  iOS Compatibility
                </CardTitle>
                <CardDescription>iPhone compatibility and instructions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Compatible iPhone Models</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center p-3 bg-green-50 rounded-md">
                      <Check className="h-5 w-5 text-green-600 mr-2" />
                      <span>iPhone 7 and newer</span>
                    </div>
                    <div className="flex items-center p-3 bg-green-50 rounded-md">
                      <Check className="h-5 w-5 text-green-600 mr-2" />
                      <span>iOS 14 or higher</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Incompatible iPhone Models</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center p-3 bg-red-50 rounded-md">
                      <X className="h-5 w-5 text-red-600 mr-2" />
                      <span>iPhone 6S and older</span>
                    </div>
                    <div className="flex items-center p-3 bg-red-50 rounded-md">
                      <X className="h-5 w-5 text-red-600 mr-2" />
                      <span>iOS 13 or lower</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">How to Use Pro Tap with iPhone</h3>
                  <ol className="space-y-3 list-decimal pl-5">
                    <li>Make sure your iPhone is unlocked</li>
                    <li>Hold the Pro Tap card to the top back of your iPhone</li>
                    <li>Your iPhone will detect the card and open your profile automatically</li>
                    <li>No app installation is required</li>
                  </ol>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-3">Troubleshooting</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>My iPhone isn't detecting the card</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 list-disc pl-5">
                          <li>Make sure your iPhone is unlocked</li>
                          <li>
                            Try holding the card to different areas on the back of your iPhone (usually the top area
                            works best)
                          </li>
                          <li>Remove your phone case if it's too thick</li>
                          <li>Make sure your iPhone model is compatible (iPhone 7 or newer)</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Where is the NFC reader on my iPhone?</AccordionTrigger>
                      <AccordionContent>
                        The NFC reader on iPhones is located at the top back of the device. Try holding the card to this
                        area for best results.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Do I need to install an app?</AccordionTrigger>
                      <AccordionContent>
                        No, you don't need to install any app to use Pro Tap cards with your iPhone. The NFC
                        functionality is built into iOS 14 and higher.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="android" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
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
                    className="h-5 w-5 mr-2"
                  >
                    <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
                    <polygon points="12 15 17 21 7 21 12 15"></polygon>
                  </svg>
                  Android Compatibility
                </CardTitle>
                <CardDescription>Android device compatibility and instructions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Compatible Android Devices</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center p-3 bg-green-50 rounded-md">
                      <Check className="h-5 w-5 text-green-600 mr-2" />
                      <span>Most Android phones from 2015 onwards</span>
                    </div>
                    <div className="flex items-center p-3 bg-green-50 rounded-md">
                      <Check className="h-5 w-5 text-green-600 mr-2" />
                      <span>Android 5.0 (Lollipop) or higher</span>
                    </div>
                    <div className="flex items-center p-3 bg-green-50 rounded-md">
                      <Check className="h-5 w-5 text-green-600 mr-2" />
                      <span>Samsung, Google, OnePlus, etc.</span>
                    </div>
                    <div className="flex items-center p-3 bg-green-50 rounded-md">
                      <Check className="h-5 w-5 text-green-600 mr-2" />
                      <span>Device must have NFC hardware</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">How to Use Pro Tap with Android</h3>
                  <ol className="space-y-3 list-decimal pl-5">
                    <li>Make sure NFC is enabled in your phone settings</li>
                    <li>Hold the Pro Tap card to the back of your Android phone</li>
                    <li>Your phone will detect the card and prompt you to open your profile</li>
                    <li>No app installation is required</li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-medium mb-3">How to Enable NFC on Android</h3>
                  <ol className="space-y-3 list-decimal pl-5">
                    <li>Open your phone's Settings app</li>
                    <li>Tap "Connected devices" or "Connections"</li>
                    <li>Look for "NFC" and toggle it on</li>
                    <li>The exact steps may vary depending on your Android device</li>
                  </ol>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-3">Troubleshooting</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>My Android phone isn't detecting the card</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 list-disc pl-5">
                          <li>Make sure NFC is enabled in your phone settings</li>
                          <li>Try holding the card to different areas on the back of your phone</li>
                          <li>Remove your phone case if it's too thick</li>
                          <li>Make sure your Android device has NFC capability</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>How do I know if my Android phone has NFC?</AccordionTrigger>
                      <AccordionContent>
                        <p>You can check if your Android phone has NFC by:</p>
                        <ol className="list-decimal pl-5 mt-2">
                          <li>Opening your phone's Settings app</li>
                          <li>Tapping "Connected devices" or "Connections"</li>
                          <li>Looking for "NFC" in the list</li>
                        </ol>
                        <p className="mt-2">
                          If you don't see NFC in the settings, your phone might not have NFC capability.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Where is the NFC reader on my Android phone?</AccordionTrigger>
                      <AccordionContent>
                        The NFC reader location varies by Android phone model. It's typically located in the center or
                        upper portion of the back of the phone. Try moving the card around the back of your phone until
                        it's detected.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="windows" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
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
                    className="h-5 w-5 mr-2"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" x2="16" y1="21" y2="21"></line>
                    <line x1="12" x2="12" y1="17" y2="21"></line>
                  </svg>
                  Windows Compatibility
                </CardTitle>
                <CardDescription>Windows device compatibility and instructions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Compatible Windows Devices</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center p-3 bg-green-50 rounded-md">
                      <Check className="h-5 w-5 text-green-600 mr-2" />
                      <span>Windows 10 and 11 devices with NFC</span>
                    </div>
                    <div className="flex items-center p-3 bg-green-50 rounded-md">
                      <Check className="h-5 w-5 text-green-600 mr-2" />
                      <span>Surface devices with NFC capability</span>
                    </div>
                    <div className="flex items-center p-3 bg-green-50 rounded-md">
                      <Check className="h-5 w-5 text-green-600 mr-2" />
                      <span>Windows phones with NFC</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">How to Use Pro Tap with Windows Devices</h3>
                  <ol className="space-y-3 list-decimal pl-5">
                    <li>Make sure NFC is enabled in your device settings</li>
                    <li>Hold the Pro Tap card to the NFC reader area of your device</li>
                    <li>Your device will detect the card and open your profile</li>
                  </ol>
                </div>

                <Alert>
                  <HelpCircle className="h-4 w-4" />
                  <AlertTitle>Limited Compatibility</AlertTitle>
                  <AlertDescription>
                    Not all Windows devices have NFC capability. If your device doesn't support NFC, you can use the QR
                    code on the back of your Pro Tap card instead.
                  </AlertDescription>
                </Alert>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-3">Alternative: QR Code Method</h3>
                  <p className="text-gray-600 mb-4">
                    If your device doesn't support NFC, you can use the QR code on the back of your Pro Tap card:
                  </p>
                  <ol className="space-y-3 list-decimal pl-5">
                    <li>Open your device's camera app</li>
                    <li>Point the camera at the QR code on the back of your Pro Tap card</li>
                    <li>Tap the notification or link that appears</li>
                    <li>Your browser will open and display the profile</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
          <p className="text-gray-600 mb-6">
            If you're still having trouble with your Pro Tap card, our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/support">Contact Support</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Return to Dashboard</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
