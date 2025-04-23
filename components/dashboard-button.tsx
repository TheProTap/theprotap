"use client"

import { Button } from "@/components/ui/button"
import { redirectToDashboard } from "@/lib/redirect"

export function DashboardButton() {
  return <Button onClick={redirectToDashboard}>Dashboard</Button>
}
