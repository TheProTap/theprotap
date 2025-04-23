import { notFound } from "next/navigation"
import Link from "next/link"
import { dnsTemplateService } from "@/lib/services/dns-template-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeftIcon, EditIcon, TrashIcon } from "lucide-react"

interface TemplateDetailPageProps {
  params: {
    id: string
  }
}

export default async function TemplateDetailPage({ params }: TemplateDetailPageProps) {
  const template = await dnsTemplateService.getTemplate(params.id)

  if (!template) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <Link href="/dns-templates" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back to Templates
      </Link>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{template.name}</h1>
          <p className="text-muted-foreground">{template.description}</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/dns-templates/edit/${template.id}`}>
            <Button variant="outline">
              <EditIcon className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Link href={`/dns-templates/apply/${template.id}`}>
            <Button>Apply Template</Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>DNS Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>TTL</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {template.records.map((record, idx) => (
                <TableRow key={record.id || idx}>
                  <TableCell className="font-medium">{record.type}</TableCell>
                  <TableCell>{record.name}</TableCell>
                  <TableCell className="max-w-md truncate">{record.value}</TableCell>
                  <TableCell>{record.ttl}</TableCell>
                  <TableCell>{record.priority || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-6">
        <Card className="bg-destructive/5 border-destructive/20">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Deleting this template cannot be undone.</p>
            <Link href={`/dns-templates/delete/${template.id}`}>
              <Button variant="destructive">
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete Template
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
