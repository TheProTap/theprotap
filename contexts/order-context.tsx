"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { processPayment } from "@/lib/financial-service"
import { useToast } from "@/components/ui/use-toast"

interface OrderFormData {
  cardType: "basic" | "engraved" | "premium"
  cardColor: "black" | "white" | "gradient"
  cardStyle: "standard" | "minimalist"
  quantity: number
  name: string
  email: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  cardNumber: string
  cardExpiry: string
  cardCvc: string
  nameOnCard: string
  shippingMethod: "standard" | "priority" | "express"
}

interface OrderContextType {
  formData: OrderFormData
  updateFormData: (field: keyof OrderFormData, value: any) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  subtotal: number
  shipping: number
  tax: number
  total: number
  processing: boolean
  submitOrder: () => Promise<boolean>
  orderComplete: boolean
  transactionId: string | null
}

const defaultFormData: OrderFormData = {
  cardType: "premium",
  cardColor: "black",
  cardStyle: "standard",
  quantity: 1,
  name: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "US",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
  nameOnCard: "",
  shippingMethod: "standard",
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<OrderFormData>(defaultFormData)
  const [currentStep, setCurrentStep] = useState(0)
  const [processing, setProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [transactionId, setTransactionId] = useState<string | null>(null)
  const { toast } = useToast()

  const updateFormData = (field: keyof OrderFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const nextStep = () => {
    if (currentStep < 2) {
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

  // Calculate order summary
  const getCardPrice = () => {
    switch (formData.cardType) {
      case "basic":
        return 25
      case "engraved":
        return 35
      case "premium":
        return 50
      default:
        return 25
    }
  }

  const getShippingPrice = () => {
    switch (formData.shippingMethod) {
      case "express":
        return 15
      case "priority":
        return 10
      case "standard":
        return 5
      default:
        return 5
    }
  }

  const subtotal = getCardPrice() * formData.quantity
  const shipping = getShippingPrice()
  const tax = Math.round(subtotal * 0.08 * 100) / 100
  const total = subtotal + shipping + tax

  const submitOrder = async (): Promise<boolean> => {
    setProcessing(true)

    try {
      // Process payment
      const paymentResult = await processPayment({
        amount: total,
        cardNumber: formData.cardNumber,
        cardExpiry: formData.cardExpiry,
        cardCvc: formData.cardCvc,
        nameOnCard: formData.nameOnCard,
      })

      if (paymentResult.success) {
        setTransactionId(paymentResult.transactionId || null)
        setOrderComplete(true)

        toast({
          title: "Order Successful!",
          description: `Your order has been placed. Transaction ID: ${paymentResult.transactionId}`,
        })

        return true
      } else {
        toast({
          title: "Payment Failed",
          description: paymentResult.error || "There was an error processing your payment. Please try again.",
          variant: "destructive",
        })

        return false
      }
    } catch (error) {
      toast({
        title: "Order Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })

      return false
    } finally {
      setProcessing(false)
    }
  }

  const value = {
    formData,
    updateFormData,
    currentStep,
    setCurrentStep,
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
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrder() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider")
  }
  return context
}
