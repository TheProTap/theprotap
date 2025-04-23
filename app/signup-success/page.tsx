import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function SignupSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>

        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Account Created Successfully!</h2>

        <p className="mt-2 text-gray-600">
          Your ProTap account has been created. You can now log in to access your dashboard.
        </p>

        <div className="mt-6">
          <Button asChild className="w-full">
            <Link href="/login">Log in to your account</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
