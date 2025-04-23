"use client"

import { useState } from "react"
import { Package, Truck, CheckCircle, ExternalLink, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import DashboardLayout from "@/components/dashboard-layout"

// Mock order data - in a real app, this would come from an API
const orders = [
  {
    id: "ORD-12345",
    date: "2023-10-15",
    status: "delivered",
    items: [
      {
        id: "CARD-001",
        name: "Premium Metal NFC Card",
        price: 50.0,
        quantity: 1,
        color: "Black",
        style: "Minimalist",
      },
    ],
    shipping: {
      method: "Priority",
      cost: 10.0,
      address: "123 Main St, San Francisco, CA 94105",
      carrier: "USPS",
      trackingNumber: "PT123456789",
      estimatedDelivery: "2023-10-25",
      deliveredDate: "2023-10-23",
    },
    payment: {
      method: "Credit Card",
      last4: "4242",
      total: 64.0,
    },
  },
  {
    id: "ORD-67890",
    date: "2023-11-05",
    status: "shipped",
    items: [
      {
        id: "CARD-002",
        name: "Engraved Plastic NFC Card",
        price: 35.0,
        quantity: 2,
        color: "White",
        style: "Standard",
      },
    ],
    shipping: {
      method: "Express",
      cost: 15.0,
      address: "456 Market St, San Francisco, CA 94105",
      carrier: "FedEx",
      trackingNumber: "FX987654321",
      estimatedDelivery: "2023-11-15",
    },
    payment: {
      method: "PayPal",
      email: "user@example.com",
      total: 92.7,
    },
  },
]

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(orders[0])

  // Calculate progress based on status
  const getProgress = (status) => {
    switch (status) {
      case "processing":
        return 25
      case "shipped":
        return 75
      case "delivered":
        return 100
      default:
        return 0
    }
  }

  // Get status badge variant
  const getStatusBadge = (status) => {
    switch (status) {
      case "processing":
        return { variant: "outline", className: "bg-blue-50 text-blue-700 hover:bg-blue-50" }
      case "shipped":
        return { variant: "outline", className: "bg-yellow-50 text-yellow-700 hover:bg-yellow-50" }
      case "delivered":
        return { variant: "outline", className: "bg-green-50 text-green-700 hover:bg-green-50" }
      default:
        return { variant: "outline" }
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Orders</h1>
            <p className="text-gray-500">Track and manage your Pro Tap card orders</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View and track your orders</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedOrder.id === order.id ? "bg-gray-50" : ""}`}
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{order.id}</h3>
                          <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <Badge
                          variant={getStatusBadge(order.status).variant}
                          className={getStatusBadge(order.status).className}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="text-sm">
                        {order.items.map((item) => (
                          <div key={item.id}>
                            {item.name} × {item.quantity}
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 text-sm font-medium">${order.payment.total.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Order {selectedOrder.id}</CardTitle>
                    <CardDescription>Placed on {new Date(selectedOrder.date).toLocaleDateString()}</CardDescription>
                  </div>
                  <Badge
                    variant={getStatusBadge(selectedOrder.status).variant}
                    className={getStatusBadge(selectedOrder.status).className}
                  >
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Order Placed</span>
                    <span>Shipped</span>
                    <span>Delivered</span>
                  </div>
                  <Progress value={getProgress(selectedOrder.status)} className="h-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Shipping Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Shipping Address</p>
                          <p className="text-sm text-gray-500">{selectedOrder.shipping.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Truck className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Shipping Method</p>
                          <p className="text-sm text-gray-500">
                            {selectedOrder.shipping.method} (${selectedOrder.shipping.cost.toFixed(2)})
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Estimated Delivery</p>
                          <p className="text-sm text-gray-500">
                            {new Date(selectedOrder.shipping.estimatedDelivery).toLocaleDateString()}
                            {selectedOrder.status === "delivered" &&
                              ` (Delivered on ${new Date(selectedOrder.shipping.deliveredDate).toLocaleDateString()})`}
                          </p>
                        </div>
                      </div>
                      {selectedOrder.shipping.trackingNumber && (
                        <div className="flex items-start">
                          <Package className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Tracking Information</p>
                            <p className="text-sm text-gray-500">
                              {selectedOrder.shipping.carrier}: {selectedOrder.shipping.trackingNumber}
                            </p>
                            <Button variant="link" size="sm" className="h-auto p-0 text-primary" asChild>
                              <Link
                                href={`https://track.example.com/${selectedOrder.shipping.trackingNumber}`}
                                target="_blank"
                              >
                                Track Package <ExternalLink className="h-3 w-3 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Payment Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="h-5 w-5 text-gray-400 mr-2 mt-0.5">
                          {selectedOrder.payment.method === "Credit Card" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect width="20" height="14" x="2" y="5" rx="2" />
                              <line x1="2" x2="22" y1="10" y2="10" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7" />
                              <circle cx="16" cy="16" r="2" />
                              <circle cx="19" cy="19" r="2" />
                              <path d="M14 14h2v2" />
                              <path d="M19 14v2h-2" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">Payment Method</p>
                          <p className="text-sm text-gray-500">
                            {selectedOrder.payment.method}
                            {selectedOrder.payment.last4 && ` ending in ${selectedOrder.payment.last4}`}
                            {selectedOrder.payment.email && ` (${selectedOrder.payment.email})`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Order Summary</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium">
                            {item.name} × {item.quantity}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.color}, {item.style}
                          </p>
                        </div>
                        <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Subtotal</p>
                      <p className="text-sm">
                        ${selectedOrder.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Shipping</p>
                      <p className="text-sm">${selectedOrder.shipping.cost.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Tax</p>
                      <p className="text-sm">
                        $
                        {(
                          selectedOrder.payment.total -
                          selectedOrder.shipping.cost -
                          selectedOrder.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
                        ).toFixed(2)}
                      </p>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <p>Total</p>
                      <p>${selectedOrder.payment.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {selectedOrder.status === "delivered" && (
                  <Button asChild>
                    <Link href="/dashboard/link-card">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Link Your Card
                    </Link>
                  </Button>
                )}
                {selectedOrder.status !== "delivered" && (
                  <Button variant="outline" asChild>
                    <Link href={`https://track.example.com/${selectedOrder.shipping.trackingNumber}`} target="_blank">
                      <Package className="mr-2 h-4 w-4" />
                      Track Shipment
                    </Link>
                  </Button>
                )}
                <Button variant="outline">Need Help?</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
