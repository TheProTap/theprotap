"use client"

import { ArrowLeft, ArrowRight, Check, CreditCard, Palette, Package, Home, Info, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useMobile } from "@/hooks/use-mobile"
import { PaymentFlow } from "@/components/payment-flow"
import { useOrder } from "@/contexts/order-context"
import { useToast } from "@/components/ui/use-toast"
import Logo from "@/components/logo"

const steps = [
  { id: "design", label: "Card Design", icon: <Palette className="h-5 w-5" /> },
  { id: "shipping", label: "Shipping", icon: <Package className="h-5 w-5" /> },
  { id: "payment", label: "Payment", icon: <CreditCard className="h-5 w-5" /> },
]

export default function OrderCardPage() {
  const {
    formData,
    updateFormData,
    currentStep,
    nextStep,
    prevStep,
    subtotal,
    shipping,
    tax,
    total,
    processing,
    submitOrder,
    orderComplete,
    transactionId,
  } = useOrder()

  const isMobile = useMobile()
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (currentStep === steps.length - 1) {
      // Submit the form
      const success = await submitOrder()

      if (success) {
        // Show success message
        toast({
          title: "Order Successful!",
          description: "Your NFC card will be shipped soon.",
        })
      }
    } else {
      // Move to next step
      nextStep()
    }
  }

  // Show order confirmation if complete
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
            <CardDescription>Your NFC card is on its way</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-b pb-4">
              <p className="text-sm text-gray-500 mb-1">Order Number</p>
              <p className="font-medium">{transactionId}</p>
            </div>

            <div className="border-b pb-4">
              <p className="text-sm text-gray-500 mb-1">Order Summary</p>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {formData.cardType.charAt(0).toUpperCase() + formData.cardType.slice(1)} Card × {formData.quantity}
                  </span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {formData.shippingMethod.charAt(0).toUpperCase() + formData.shippingMethod.slice(1)} Shipping
                  </span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Shipping Information</p>
              <p className="font-medium">{formData.name}</p>
              <p className="text-gray-600">{formData.address}</p>
              <p className="text-gray-600">
                {formData.city}, {formData.state} {formData.zipCode}
              </p>
              <p className="text-gray-600">{formData.country}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
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
            <h1 className="font-semibold">Order Your Card</h1>
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
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
                    index <= currentStep ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                  } ${index < currentStep ? "bg-primary" : ""}`}
                >
                  {index < currentStep ? <Check className="h-4 w-4" /> : step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 sm:w-16 h-1 ${index < currentStep ? "bg-primary" : "bg-gray-200"}`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 px-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-xs sm:text-sm ${index <= currentStep ? "text-primary font-medium" : "text-gray-500"}`}
              >
                {!isMobile ? step.label : ""}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Card Design */}
              {currentStep === 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Card Design</CardTitle>
                    <CardDescription>Choose your card type and design preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label>Card Type</Label>
                      <RadioGroup
                        value={formData.cardType}
                        onValueChange={(value) => updateFormData("cardType", value)}
                        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                      >
                        <div>
                          <RadioGroupItem value="basic" id="basic" className="peer sr-only" />
                          <Label
                            htmlFor="basic"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <div className="mb-3 w-full h-24 bg-gray-100 rounded-md flex items-center justify-center">
                              <div className="w-16 h-10 bg-black rounded-md flex items-center justify-center text-white text-xs">
                                <Logo size="sm" />
                              </div>
                            </div>
                            <div className="text-center">
                              <p className="font-medium">Basic</p>
                              <p className="text-sm text-gray-500">$25</p>
                            </div>
                            <div className="mt-2 text-xs text-gray-500">
                              <ul className="space-y-1">
                                <li className="flex items-start">
                                  <Check className="h-3 w-3 text-primary mt-0.5 mr-1" />
                                  <span>Black NFC card</span>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-3 w-3 text-primary mt-0.5 mr-1" />
                                  <span>Basic digital profile</span>
                                </li>
                              </ul>
                            </div>
                          </Label>
                        </div>

                        <div>
                          <RadioGroupItem value="premium" id="premium" className="peer sr-only" />
                          <Label
                            htmlFor="premium"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <div className="mb-3 w-full h-24 bg-gray-100 rounded-md flex items-center justify-center">
                              <div className="w-16 h-10 bg-gray-800 rounded-md flex items-center justify-center text-white text-xs">
                                <Logo size="sm" />
                              </div>
                            </div>
                            <div className="text-center">
                              <p className="font-medium">Premium Metal</p>
                              <p className="text-sm text-gray-500">$50</p>
                            </div>
                            <div className="mt-2 text-xs text-gray-500">
                              <ul className="space-y-1">
                                <li className="flex items-start">
                                  <Check className="h-3 w-3 text-primary mt-0.5 mr-1" />
                                  <span>Metal NFC card</span>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-3 w-3 text-primary mt-0.5 mr-1" />
                                  <span>Premium engraving</span>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-3 w-3 text-primary mt-0.5 mr-1" />
                                  <span>Full-featured profile</span>
                                </li>
                              </ul>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label>Card Color</Label>
                      <RadioGroup
                        value={formData.cardColor}
                        onValueChange={(value) => updateFormData("cardColor", value)}
                        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                      >
                        <div>
                          <RadioGroupItem value="black" id="black" className="peer sr-only" />
                          <Label
                            htmlFor="black"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <div className="mb-3 w-full h-16 bg-black rounded-md"></div>
                            <div className="text-center">
                              <p className="font-medium">Black</p>
                              <p className="text-sm text-gray-500">Elegant & Professional</p>
                            </div>
                          </Label>
                        </div>

                        <div>
                          <RadioGroupItem value="gradient" id="gradient" className="peer sr-only" />
                          <Label
                            htmlFor="gradient"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <div className="mb-3 w-full h-16 bg-gradient-to-r from-gray-900 to-gray-600 rounded-md"></div>
                            <div className="text-center">
                              <p className="font-medium">Gradient</p>
                              <p className="text-sm text-gray-500">Modern & Stylish</p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label>Card Style</Label>
                      <RadioGroup
                        value={formData.cardStyle}
                        onValueChange={(value) => updateFormData("cardStyle", value)}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <div>
                          <RadioGroupItem value="standard" id="standard" className="peer sr-only" />
                          <Label
                            htmlFor="standard"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <div className="mb-3 w-full h-24 bg-gray-100 rounded-md flex items-center justify-center">
                              <div className="w-32 h-20 bg-black rounded-xl flex items-center justify-center text-white">
                                <div className="text-center">
                                  <Logo size="sm" />
                                </div>
                              </div>
                            </div>
                            <div className="text-center">
                              <p className="font-medium">Standard</p>
                              <p className="text-sm text-gray-500">Traditional business card layout</p>
                            </div>
                          </Label>
                        </div>

                        <div>
                          <RadioGroupItem value="minimalist" id="minimalist" className="peer sr-only" />
                          <Label
                            htmlFor="minimalist"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <div className="mb-3 w-full h-24 bg-gray-100 rounded-md flex items-center justify-center">
                              <div className="w-32 h-20 bg-black rounded-md flex items-center justify-center text-white">
                                <div className="text-center">
                                  <Logo size="sm" />
                                </div>
                              </div>
                            </div>
                            <div className="text-center">
                              <p className="font-medium">Minimalist</p>
                              <p className="text-sm text-gray-500">Clean, modern aesthetic</p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="quantity">Quantity</Label>
                      <div className="flex items-center">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => updateFormData("quantity", Math.max(1, formData.quantity - 1))}
                          className="rounded-r-none"
                        >
                          -
                        </Button>
                        <Input
                          id="quantity"
                          type="number"
                          min="1"
                          max="10"
                          value={formData.quantity}
                          onChange={(e) => updateFormData("quantity", Number.parseInt(e.target.value) || 1)}
                          className="w-16 text-center rounded-none"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => updateFormData("quantity", Math.min(10, formData.quantity + 1))}
                          className="rounded-l-none"
                        >
                          +
                        </Button>
                        <div className="ml-4 text-sm text-gray-500 flex items-center">
                          <Info className="h-4 w-4 mr-1" />
                          Maximum 10 cards per order
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button type="button" onClick={nextStep}>
                      Next: Shipping
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Step 2: Shipping */}
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                    <CardDescription>Enter your shipping details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => updateFormData("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => updateFormData("address", e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => updateFormData("city", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => updateFormData("state", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => updateFormData("zipCode", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <select
                          id="country"
                          value={formData.country}
                          onChange={(e) => updateFormData("country", e.target.value)}
                          className="w-full rounded-md border border-input bg-background px-3 py-2"
                          required
                        >
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                          <option value="JP">Japan</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Shipping Method</Label>
                      <RadioGroup
                        value={formData.shippingMethod}
                        onValueChange={(value) => updateFormData("shippingMethod", value)}
                        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
                      >
                        <div>
                          <RadioGroupItem value="standard" id="shipping-standard" className="peer sr-only" />
                          <Label
                            htmlFor="shipping-standard"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <div className="text-center">
                              <p className="font-medium">Standard</p>
                              <p className="text-sm text-gray-500">$5.00</p>
                              <p className="text-xs text-gray-500 mt-1">5-7 business days</p>
                            </div>
                          </Label>
                        </div>

                        <div>
                          <RadioGroupItem value="priority" id="shipping-priority" className="peer sr-only" />
                          <Label
                            htmlFor="shipping-priority"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <div className="text-center">
                              <p className="font-medium">Priority</p>
                              <p className="text-sm text-gray-500">$10.00</p>
                              <p className="text-xs text-gray-500 mt-1">2-3 business days</p>
                            </div>
                          </Label>
                        </div>

                        <div>
                          <RadioGroupItem value="express" id="shipping-express" className="peer sr-only" />
                          <Label
                            htmlFor="shipping-express"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <div className="text-center">
                              <p className="font-medium">Express</p>
                              <p className="text-sm text-gray-500">$15.00</p>
                              <p className="text-xs text-gray-500 mt-1">1-2 business days</p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back: Card Design
                    </Button>
                    <Button type="button" onClick={nextStep}>
                      Next: Payment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Step 3: Payment */}
              {currentStep === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                    <CardDescription>Enter your payment details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => updateFormData("cardNumber", e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardExpiry">Expiry Date</Label>
                        <Input
                          id="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={(e) => updateFormData("cardExpiry", e.target.value)}
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardCvc">CVC</Label>
                        <Input
                          id="cardCvc"
                          value={formData.cardCvc}
                          onChange={(e) => updateFormData("cardCvc", e.target.value)}
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nameOnCard">Name on Card</Label>
                      <Input
                        id="nameOnCard"
                        value={formData.nameOnCard}
                        onChange={(e) => updateFormData("nameOnCard", e.target.value)}
                        required
                      />
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-3">Order Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            {formData.cardType.charAt(0).toUpperCase() + formData.cardType.slice(1)} Card ×{" "}
                            {formData.quantity}
                          </span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            {formData.shippingMethod.charAt(0).toUpperCase() + formData.shippingMethod.slice(1)}{" "}
                            Shipping
                          </span>
                          <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={processing}
                      className="w-full sm:w-auto"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back: Shipping
                    </Button>
                    <Button type="submit" disabled={processing} className="w-full sm:w-auto">
                      {processing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Complete Order
                          <Check className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="hidden lg:block">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your order details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div
                    className={`w-64 h-40 rounded-xl shadow-md transform transition-all duration-300 ${
                      formData.cardStyle === "minimalist" ? "rounded-lg" : "rounded-xl"
                    } ${formData.cardColor === "black" ? "bg-black" : "bg-gradient-to-r from-gray-900 to-gray-600"}`}
                  >
                    <div className="w-full h-full flex items-center justify-center text-white p-4">
                      <div className="text-center">
                        <Logo size="lg" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Card Details</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium capitalize">{formData.cardType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Color:</span>
                        <span className="font-medium capitalize">{formData.cardColor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Style:</span>
                        <span className="font-medium capitalize">{formData.cardStyle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quantity:</span>
                        <span className="font-medium">{formData.quantity}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Price Breakdown</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {formData.cardType.charAt(0).toUpperCase() + formData.cardType.slice(1)} Card ×{" "}
                          {formData.quantity}
                        </span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {formData.shippingMethod.charAt(0).toUpperCase() + formData.shippingMethod.slice(1)} Shipping
                        </span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">What's Included</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-0.5 mr-2" />
                      <span>NFC technology for instant profile sharing</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-0.5 mr-2" />
                      <span>Digital profile with contact info and social links</span>
                    </li>
                    {formData.cardType === "premium" && (
                      <>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-primary mt-0.5 mr-2" />
                          <span>Premium metal construction for durability</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-primary mt-0.5 mr-2" />
                          <span>Advanced analytics dashboard</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                {/* Add the PaymentFlow component to the Order Summary section */}
                <div className="mt-6">
                  <PaymentFlow />
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-gray-500">
                  Need help?{" "}
                  <a href="#" className="text-primary hover:underline">
                    Contact support
                  </a>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
