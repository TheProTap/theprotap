"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import type { DNSTemplate } from "@/lib/types/dns"
import { dnsTemplateService } from "@/lib/services/dns-template-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeftIcon, AlertTriangleIcon } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface DeleteTemplatePageProps {
  params: {
    id: string
  }
}

export default function DeleteTemplatePage({ params }: DeleteTemplatePageProps) {
  const router = useRouter()
  const [template, setTemplate] = useState<DNSTemplate | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const templateData = await dnsTemplateService.getTemplate(params.id)

        if (!templateData) {
          toast({
            title: "Error",
            description: "Template not found",
            variant: "destructive",
          })
          router.push("/dns-templates")
          return
        }

        setTemplate(templateData)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load template",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTemplate()
  }, [params.id, router])

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      const success = await dnsTemplateService.deleteTemplate(params.id)

      if (success) {
        toast({
          title: "Success",
          description: "Template deleted successfully",
        })

        router.push("/dns-templates")
      } else {
        throw new Error("Failed to delete template")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete template",
        variant: "destructive",
      })
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Link href={`/dns-templates/${params.id}`} className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back to Template
      </Link>

      <h1 className="text-3xl font-bold mb-6">Delete Template</h1>

      <Card className="mb-6 border-destructive/50">
        <CardHeader className="bg-destructive/5">
          <CardTitle className="flex items-center text-destructive">
            <AlertTriangleIcon className="mr-2 h-5 w-5" />
            Warning: This action cannot be undone
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4">
            You are about to delete the template <strong>"{template?.name}"</strong>. This will permanently remove the
            template and all its DNS records.
          </p>

          <p className="mb-6">Are you sure you want to continue?</p>

          <div className="flex justify-end gap-4">
            <Link href={`/dns-templates/${params.id}`}>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete Template"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
