import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function AutoLoginLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-6">
        <CardContent className="flex flex-col items-center justify-center space-y-4 pt-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-center text-lg">Loading...</p>
        </CardContent>
      </Card>
    </div>
  )
}
