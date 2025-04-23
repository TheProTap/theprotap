"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import type { DNSTemplate, Domain } from "@/lib/types/dns"
import { dnsTemplateService } from "@/lib/services/dns-template-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeftIcon, CheckIcon, AlertTriangleIcon } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface ApplyTemplatePageProps {
  params: {
    id: string
  }
}

export default function ApplyTemplatePage({ params }: ApplyTemplatePageProps) {
  const router = useRouter()
  const [template, setTemplate] = useState<DNSTemplate | null>(null)
  const [domains, setDomains] = useState<Domain[]>([])
  const [selectedDomains, setSelectedDomains] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isApplying, setIsApplying] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [templateData, domainsData] = await Promise.all([
          dnsTemplateService.getTemplate(params.id),
          dnsTemplateService.getDomains(),
        ])

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
        setDomains(domainsData)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.id, router])

  const toggleDomain = (domainId: string) => {
    setSelectedDomains((prev) => (prev.includes(domainId) ? prev.filter((id) => id !== domainId) : [...prev, domainId]))
  }

  const handleApplyTemplate = async () => {
    if (selectedDomains.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one domain",
        variant: "destructive",
      })
      return
    }

    setIsApplying(true)

    try {
      // Apply template to each selected domain
      await Promise.all(selectedDomains.map((domainId) => dnsTemplateService.applyTemplate(domainId, params.id)))

      toast({
        title: "Success",
        description: `Template applied to ${selectedDomains.length} domain(s)`,
      })

      router.push("/dns-templates")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to apply template to one or more domains",
        variant: "destructive",
      })
    } finally {
      setIsApplying(false)
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
      <Link href="/dns-templates" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back to Templates
      </Link>

      <h1 className="text-3xl font-bold mb-2">Apply Template</h1>
      <p className="text-muted-foreground mb-6">Apply "{template?.name}" to one or more domains</p>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Template Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="font-semibold">{template?.name}</h3>
            <p className="text-muted-foreground">{template?.description}</p>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>TTL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {template?.records.map((record, index) => (
                <TableRow key={record.id || index}>
                  <TableCell className="font-medium">{record.type}</TableCell>
                  <TableCell>{record.name}</TableCell>
                  <TableCell className="max-w-md truncate">{record.value}</TableCell>
                  <TableCell>{record.ttl}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select Domains</CardTitle>
        </CardHeader>
        <CardContent>
          {domains.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted-foreground">No domains found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Select</TableHead>
                  <TableHead>Domain Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expiration Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {domains.map((domain) => (
                  <TableRow key={domain.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedDomains.includes(domain.id)}
                        onCheckedChange={() => toggleDomain(domain.id)}
                        disabled={domain.status !== "Active"}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{domain.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {domain.status === "Active" ? (
                          <span className="flex items-center text-green-600">
                            <CheckIcon className="mr-1 h-4 w-4" />
                            Active
                          </span>
                        ) : (
                          <span className="flex items-center text-amber-600">
                            <AlertTriangleIcon className="mr-1 h-4 w-4" />
                            {domain.status}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(domain.expirationDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Link href="/dns-templates">
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </Link>
        <Button type="button" onClick={handleApplyTemplate} disabled={isApplying || selectedDomains.length === 0}>
          {isApplying ? "Applying..." : "Apply Template"}
        </Button>
      </div>
    </div>
  )
}
