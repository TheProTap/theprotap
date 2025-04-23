import { SupabaseConnectionTest } from "@/components/supabase-connection-test"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SupabaseDebugPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Supabase Connection Test</CardTitle>
          <CardDescription>This page tests your connection to Supabase and displays the result.</CardDescription>
        </CardHeader>
        <CardContent>
          <SupabaseConnectionTest />

          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h3 className="font-medium mb-2">Environment Variables</h3>
            <p className="text-sm text-gray-700">
              Make sure you have the following environment variables set in your .env.local file:
            </p>
            <pre className="bg-gray-800 text-white p-3 rounded mt-2 text-sm overflow-x-auto">
              {`NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
