"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const sessionId = searchParams.get("session_id")

    if (sessionId) {
      // In a real implementation, you would fetch order details from your database
      // based on the session ID
      setOrderDetails({
        id: "ORD-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
        date: new Date().toLocaleDateString(),
        total: "$50.00",
        items: [{ name: "ProTap Premium Card", quantity: 1, price: "$50.00" }],
      })
    }

    setLoading(false)
  }, [searchParams])

  if (loading) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <p>Loading order details...</p>
      </div>
    )
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle>Order Successful!</CardTitle>
          <CardDescription>Thank you for your purchase. Your order has been confirmed.</CardDescription>
        </CardHeader>

        {orderDetails && (
          <CardContent className="space-y-4">
            <div className="border-t border-b py-4">
              <p className="font-medium">Order #{orderDetails.id}</p>
              <p className="text-sm text-muted-foreground">Placed on {orderDetails.date}</p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Order Summary</h3>
              {orderDetails.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span>{item.price}</span>
                </div>
              ))}
              <div className="flex justify-between font-medium mt-4">
                <span>Total</span>
                <span>{orderDetails.total}</span>
              </div>
            </div>
          </CardContent>
        )}

        <CardFooter className="flex flex-col space-y-2">
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
