import type { Metadata } from "next"
import Link from "next/link"
import { dnsTemplateService } from "@/lib/services/dns-template-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, PlusIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "DNS Templates | GoDaddy",
  description: "Manage your DNS templates for GoDaddy domains",
}

export default async function DNSTemplatesPage() {
  const templates = await dnsTemplateService.getTemplates()

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">DNS Templates</h1>
          <p className="text-muted-foreground">Create and manage DNS templates to quickly apply to your domains</p>
        </div>
        <Link href="/dns-templates/create">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Create Template
          </Button>
        </Link>
      </div>

      {templates.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground mb-4">You don't have any DNS templates yet</p>
          <Link href="/dns-templates/create">
            <Button>Create your first template</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id}>
              <CardHeader>
                <CardTitle>{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Updated {new Date(template.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {template.records.map((record, idx) => (
                      <Badge key={record.id || idx} variant="outline">
                        {record.type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/dns-templates/${template.id}`}>
                  <Button variant="outline">View</Button>
                </Link>
                <Link href={`/dns-templates/apply/${template.id}`}>
                  <Button>Apply</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
