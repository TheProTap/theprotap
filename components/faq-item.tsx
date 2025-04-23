"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface FaqItemProps {
  question: string
  answer: string
}

export function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <button
          className="flex items-center justify-between w-full text-left"
          onClick={toggleOpen}
          aria-expanded={isOpen}
          type="button"
        >
          <h3 className="text-lg font-semibold">{question}</h3>
          {isOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
        </button>
        {isOpen && (
          <div className="mt-4 text-gray-600">
            <p>{answer}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
