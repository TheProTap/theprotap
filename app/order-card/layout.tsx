"use client"

import type React from "react"

import { OrderProvider } from "@/contexts/order-context"

export default function OrderCardLayout({ children }: { children: React.ReactNode }) {
  return <OrderProvider>{children}</OrderProvider>
}
