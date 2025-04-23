"use client"

import { Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { handleClick, navigateTo } from "@/lib/click-handler"

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  popular?: boolean
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  popular = false,
}: PricingCardProps) {
  return (
    <Card
      className={`${
        popular ? "border-2 border-black shadow-lg" : "border border-gray-200 hover:border-black/50"
      } transition-colors relative`}
    >
      {popular && (
        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
          <Badge className="bg-black">Popular</Badge>
        </div>
      )}
      <CardContent className="p-8">
        <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
        <div className="text-center mb-6">
          <span className="text-3xl font-bold">${price}</span>
        </div>
        <p className="text-gray-600 text-center mb-6">{description}</p>
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-4 w-4 text-black mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button className="w-full" onClick={handleClick(() => navigateTo("/create-card"))}>
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  )
}
