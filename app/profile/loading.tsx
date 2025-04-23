import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <Skeleton className="h-8 w-48 mb-6" />

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <Skeleton className="h-32 w-full" />
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <Skeleton className="h-24 w-24 rounded-full -mt-12 relative z-10" />
              <div className="flex-1 mt-2 md:mt-0">
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-6">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Skeleton className="h-64 w-full rounded-md" />
            <Skeleton className="h-48 w-full rounded-md" />
          </div>
          <div className="md:col-span-2">
            <Skeleton className="h-10 w-64 mb-6" />
            <Skeleton className="h-96 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
