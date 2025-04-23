"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
}

function FeatureCard({ title, description, icon, className }: FeatureCardProps) {
  return (
    <Card className={cn("border-0 shadow-sm hover:shadow-md transition-all", className)}>
      <CardContent className="p-6">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}

export default FeatureCard
