import { Card, CardContent } from "@/components/ui/card"

interface TestimonialCardProps {
  name: string
  title: string
  quote: string
  initials: string
}

export default function TestimonialCard({ name, title, quote, initials }: TestimonialCardProps) {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-all">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-lg font-semibold">{initials}</span>
          </div>
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-gray-600">{title}</p>
            <div className="mt-3 text-gray-700">"{quote}"</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
