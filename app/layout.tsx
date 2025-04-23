import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "@/components/toaster"
import { AuthProvider } from "@/contexts/auth-context"

export const metadata: Metadata = {
  title: "ProTap - NFC Business Cards",
  description: "Share your contact info, social profiles, and portfolio with a single tap.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
