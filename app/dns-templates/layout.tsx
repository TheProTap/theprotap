import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "DNS Templates | GoDaddy",
  description: "Manage your DNS templates for GoDaddy domains",
}

export default function DNSTemplatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-background">{children}</div>
}
