"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check, CreditCard, User, Palette, ChevronRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMobile } from "@/hooks/use-mobile"
import ProfileDetails from "./profile-details"
import { handleClick, navigateTo } from "@/lib/click-handler"

const steps = [
  { id: "personal", label: "Profile Details", icon: <User className="h-5 w-5" /> },
  { id: "design", label: "Card Design", icon: <Palette className="h-5 w-5" /> },
  { id: "checkout", label: "Checkout", icon: <CreditCard className="h-5 w-5" /> },
]

export default function CreateCardPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    skills: [],
    experiences: [],
    education: [],
    socialLinks: {
      linkedin: "",
      instagram: "",
      twitter: "",
      youtube: "",
      github: "",
      website: "",
    },
    portfolioItems: [],
    cardColor: "black",
    cardStyle: "standard",
    cardTier: "basic",
  })
  const isMobile = useMobile()

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentStep === steps.length - 1) {
      // Submit the form
      window.alert("Order submitted! Your NFC card will be shipped soon.")
      // Navigate to success page
      setTimeout(() => {
        navigateTo("/")
      }, 1000)
    } else {
      // Move to next step
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="mr-4" onClick={handleClick(() => navigateTo("/"))}>
              <ArrowLeft className="h-5 w-5" />
            </a>
            <h1 className="font-semibold">Create Your Card</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleClick(() => navigateTo("/"))}
          >
            <Home className="h-4 w-4" />
            {!isMobile && <span>Home</span>}
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    index <= currentStep ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                  } ${index < currentStep ? "bg-primary" : ""}`}
                >
                  {index < currentStep ? <Check className="h-5 w-5" /> : step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 ${index < currentStep ? "bg-primary" : "bg-gray-200"}`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 px-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-sm ${index <= currentStep ? "text-primary font-medium" : "text-gray-500"}`}
              >
                {!isMobile ? step.label : ""}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <form onSubmit={handleSubmit}>
              {/* Step 1: Profile Details */}
              {currentStep === 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
                    <ProfileDetails formData={formData} updateFormData={updateFormData} />
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Card Design */}
              {currentStep === 1 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Card Design</h2>
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="block text-sm font-medium">Card Color</label>
                        <Tabs
                          defaultValue={formData.cardColor}
                          onValueChange={(value) => updateFormData("cardColor", value)}
                          className="w-full"
                        >
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="black">Black</TabsTrigger>
                            <TabsTrigger value="white">White</TabsTrigger>
                            <TabsTrigger value="gradient">Gradient</TabsTrigger>
                          </TabsList>
                          <TabsContent value="black" className="mt-4">
                            <div className="h-32 bg-black rounded-md flex items-center justify-center text-white">
                              <span>Elegant Black</span>
                            </div>
                          </TabsContent>
                          <TabsContent value="white" className="mt-4">
                            <div className="h-32 bg-white border rounded-md flex items-center justify-center">
                              <span>Minimalist White</span>
                            </div>
                          </TabsContent>
                          <TabsContent value="gradient" className="mt-4">
                            <div className="h-32 bg-gradient-to-r from-gray-900 to-gray-600 rounded-md flex items-center justify-center text-white">
                              <span>Professional Gradient</span>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-medium">Card Style</label>
                        <Tabs
                          defaultValue={formData.cardStyle}
                          onValueChange={(value) => updateFormData("cardStyle", value)}
                          className="w-full"
                        >
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="standard">Standard</TabsTrigger>
                            <TabsTrigger value="minimalist">Minimalist</TabsTrigger>
                          </TabsList>
                          <TabsContent value="standard" className="mt-4">
                            <div className="h-32 border rounded-xl flex items-center justify-center p-4">
                              <div className="text-center">
                                <p className="font-bold">Classic Design</p>
                                <p className="text-sm text-gray-500">Traditional business card layout</p>
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="minimalist" className="mt-4">
                            <div className="h-32 border rounded-md flex items-center justify-center p-4">
                              <div className="text-center">
                                <p className="font-bold">Minimalist Design</p>
                                <p className="text-sm text-gray-500">Clean, modern aesthetic</p>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-medium">Card Tier</label>
                        <Tabs
                          defaultValue={formData.cardTier}
                          onValueChange={(value) => updateFormData("cardTier", value)}
                          className="w-full"
                        >
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="basic">Basic</TabsTrigger>
                            <TabsTrigger value="engraved">Engraved</TabsTrigger>
                            <TabsTrigger value="premium">Premium</TabsTrigger>
                          </TabsList>
                          <TabsContent value="basic" className="mt-4">
                            <Card>
                              <CardContent className="p-4">
                                <h3 className="font-semibold">Basic - $25</h3>
                                <ul className="mt-2 space-y-1 text-sm">
                                  <li className="flex items-center">
                                    <Check className="h-4 w-4 mr-2 text-green-500" />
                                    Plastic NFC card
                                  </li>
                                  <li className="flex items-center">
                                    <Check className="h-4 w-4 mr-2 text-green-500" />
                                    Basic digital profile
                                  </li>
                                  <li className="flex items-center">
                                    <Check className="h-4 w-4 mr-2 text-green-500" />
                                    Contact information
                                  </li>
                                </ul>
                              </CardContent>
                            </Card>
                          </TabsContent>
                          <TabsContent value="engraved" className="mt-4">
                            <Card>
                              <CardContent className="p-4">
                                <h3 className="font-semibold">Engraved - $35</h3>
                                <ul className="mt-2 space-y-1 text-sm">
                                  <li className="flex items-center">
                                    <Check className="h-4 w-4 mr-2 text-green-500" />
                                    Premium plastic NFC card
                                  </li>
                                  <li className="flex items-center">
                                    <Check className="h-4 w-4 mr-2 text-green-500" />
                                    Custom engraving
                                  </li>
                                  <li className="flex items-center">
                                    <Check className="h-4 w-4 mr-2 text-green-500" />
                                    Enhanced digital profile
                                  </li>
                                  <li className="flex items-center">
                                    <Check className="h-4 w-4 mr-2 text-green-500" />
                                    Analytics dashboard
                                  </li>
                                </ul>
                              </CardContent>
                            </Card>
                          </TabsContent>
                          <TabsContent value="premium" className="mt-4">
                            <Card>
                              <CardContent className="p-4">
                                <h3 className="font-semibold">Premium - $50</h3>
                                <ul className="mt-2 space-y-1 text-sm">
                                  <li className="flex items-center">
                                    <Check className="h-4 w-4 mr-2 text-green-500" />
                                    Metal NFC card
                                  </li>
                                  <li className="flex items-center">
                                    <Check className="h-4 w-4 mr-2 text-green-500" />
                                    Premium engraving
                                  </li>
                                  <li className="flex items-center">
                                    <Check className="h-4 w-4 mr-2 text-green-500" />
                                    Full-featured profile
                                  </li>
                                  <li className="flex items-center">
                                    <Check className="h-4 w-4 mr-2 text-green-500" />
                                    Advanced analytics
                                  </li>
                                  <li className="flex items-center">
                                    <Check className="h-4 w-4 mr-2 text-green-500" />
                                    Multiple profile designs
                                  </li>
                                </ul>
                              </CardContent>
                            </Card>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Checkout */}
              {currentStep === 2 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Checkout</h2>
                    <div className="space-y-6">
                      <div className="border-b pb-4">
                        <h3 className="font-medium mb-2">Order Summary</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Card Type:</span>
                            <span className="font-medium capitalize">{formData.cardTier}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Card Style:</span>
                            <span className="font-medium capitalize">{formData.cardStyle}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Card Color:</span>
                            <span className="font-medium capitalize">{formData.cardColor}</span>
                          </div>
                        </div>
                      </div>

                      <div className="border-b pb-4">
                        <h3 className="font-medium mb-2">Shipping Information</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium">Address</label>
                            <input
                              type="text"
                              className="w-full rounded-md border border-input bg-background px-3 py-2"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="block text-sm font-medium">City</label>
                              <input
                                type="text"
                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-sm font-medium">ZIP Code</label>
                              <input
                                type="text"
                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-medium">Country</label>
                            <input
                              type="text"
                              className="w-full rounded-md border border-input bg-background px-3 py-2"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Payment Information</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium">Card Number</label>
                            <input
                              type="text"
                              className="w-full rounded-md border border-input bg-background px-3 py-2"
                              placeholder="1234 5678 9012 3456"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="block text-sm font-medium">Expiry Date</label>
                              <input
                                type="text"
                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                                placeholder="MM/YY"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-sm font-medium">CVV</label>
                              <input
                                type="text"
                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                                placeholder="123"
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-medium">Name on Card</label>
                            <input
                              type="text"
                              className="w-full rounded-md border border-input bg-background px-3 py-2"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Total:</span>
                          <span>
                            {formData.cardTier === "basic" ? "$25" : formData.cardTier === "engraved" ? "$35" : "$50"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="mt-6 flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button type="submit">
                  {currentStep === steps.length - 1 ? (
                    "Complete Order"
                  ) : (
                    <>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Preview Section */}
          <div className="hidden lg:block">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Card Preview</h2>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div
                    className={`w-64 h-40 rounded-xl shadow-md transform transition-all duration-300 ${
                      formData.cardStyle === "minimalist" ? "rounded-lg" : "rounded-xl"
                    } ${
                      formData.cardColor === "black"
                        ? "bg-black"
                        : formData.cardColor === "white"
                          ? "bg-white border border-gray-200"
                          : "bg-gradient-to-r from-gray-900 to-gray-600"
                    }`}
                  >
                    <div className="w-full h-full flex items-center justify-center text-white p-4">
                      <div className="text-center">
                        {formData.firstName || formData.lastName ? (
                          <p className={`font-bold text-xl ${formData.cardColor === "white" ? "text-black" : ""}`}>
                            {formData.firstName} {formData.lastName}
                          </p>
                        ) : (
                          <p className={`font-bold text-xl ${formData.cardColor === "white" ? "text-black" : ""}`}>
                            Your Name
                          </p>
                        )}
                        {formData.title ? (
                          <p className={`text-sm opacity-90 ${formData.cardColor === "white" ? "text-black" : ""}`}>
                            {formData.title}
                          </p>
                        ) : (
                          <p className={`text-sm opacity-90 ${formData.cardColor === "white" ? "text-black" : ""}`}>
                            Professional Title
                          </p>
                        )}
                        <div className="mt-2 flex justify-center">
                          <div
                            className={`w-8 h-8 rounded-full ${formData.cardColor === "white" ? "bg-black/10" : "bg-white/20"} flex items-center justify-center mx-1`}
                          >
                            <User size={16} className={formData.cardColor === "white" ? "text-black" : "text-white"} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-2">Card Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">NFC technology for instant profile sharing</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">Digital profile with contact info and social links</span>
                    </li>
                    {formData.cardTier !== "basic" && (
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm">Custom engraving with your name and logo</span>
                      </li>
                    )}
                    {formData.cardTier === "premium" && (
                      <>
                        <li className="flex items-start">
                          <ChevronRight className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                          <span className="text-sm">Premium metal construction for durability</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                          <span className="text-sm">Advanced analytics dashboard</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {currentStep === 0 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">What happens when someone taps your card?</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-100 p-2 border-b flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <div className="flex-1 text-center text-xs text-gray-500">Browser Preview</div>
                      </div>
                      <div className="p-4 bg-white">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-gray-200 mr-3"></div>
                          <div>
                            <p className="font-bold">
                              {formData.firstName || "Your"} {formData.lastName || "Name"}
                            </p>
                            <p className="text-sm text-gray-600">{formData.title || "Professional Title"}</p>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <span className="font-medium w-20">Email:</span>
                            <span className="text-gray-600">{formData.email || "your.email@example.com"}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium w-20">Phone:</span>
                            <span className="text-gray-600">{formData.phone || "+1 (555) 123-4567"}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium w-20">Location:</span>
                            <span className="text-gray-600">{formData.location || "City, Country"}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <Button size="sm" variant="outline">
                            Save Contact
                          </Button>
                          <Button size="sm">View Full Profile</Button>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      When someone taps your card, they'll see your basic info and can save your contact directly to
                      their phone.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
