"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import type { DNSRecord, DNSRecordType } from "@/lib/types/dns"
import { dnsTemplateService } from "@/lib/services/dns-template-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeftIcon, PlusIcon, TrashIcon } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

const recordTypes: DNSRecordType[] = ["A", "AAAA", "CNAME", "MX", "TXT", "SRV", "NS", "CAA"]

export default function CreateTemplatePage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [records, setRecords] = useState<DNSRecord[]>([{ type: "A", name: "@", value: "", ttl: 3600 }])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addRecord = () => {
    setRecords([...records, { type: "A", name: "", value: "", ttl: 3600 }])
  }

  const removeRecord = (index: number) => {
    setRecords(records.filter((_, i) => i !== index))
  }

  const updateRecord = (index: number, field: keyof DNSRecord, value: any) => {
    const updatedRecords = [...records]
    updatedRecords[index] = { ...updatedRecords[index], [field]: value }
    setRecords(updatedRecords)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name) {
      toast({
        title: "Error",
        description: "Template name is required",
        variant: "destructive",
      })
      return
    }

    if (records.length === 0) {
      toast({
        title: "Error",
        description: "At least one DNS record is required",
        variant: "destructive",
      })
      return
    }

    // Validate records
    for (const record of records) {
      if (!record.name || !record.value) {
        toast({
          title: "Error",
          description: "All DNS records must have a name and value",
          variant: "destructive",
        })
        return
      }
    }

    setIsSubmitting(true)

    try {
      await dnsTemplateService.createTemplate({
        name,
        description,
        records,
      })

      toast({
        title: "Success",
        description: "DNS template created successfully",
      })

      router.push("/dns-templates")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create DNS template",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Link href="/dns-templates" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back to Templates
      </Link>

      <h1 className="text-3xl font-bold mb-6">Create DNS Template</h1>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Template Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Template Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Basic Website Setup"
                required
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what this template is for..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>DNS Records</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addRecord}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Record
            </Button>
          </CardHeader>
          <CardContent>
            {records.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-muted-foreground mb-2">No DNS records added yet</p>
                <Button type="button" variant="outline" onClick={addRecord}>
                  Add your first record
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {records.map((record, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start p-4 border rounded-lg">
                    <div>
                      <Label htmlFor={`record-type-${index}`}>Type</Label>
                      <Select
                        value={record.type}
                        onValueChange={(value) => updateRecord(index, "type", value as DNSRecordType)}
                      >
                        <SelectTrigger id={`record-type-${index}`}>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {recordTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor={`record-name-${index}`}>Name</Label>
                      <Input
                        id={`record-name-${index}`}
                        value={record.name}
                        onChange={(e) => updateRecord(index, "name", e.target.value)}
                        placeholder="e.g., @ or www"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`record-value-${index}`}>Value</Label>
                      <Input
                        id={`record-value-${index}`}
                        value={record.value}
                        onChange={(e) => updateRecord(index, "value", e.target.value)}
                        placeholder="e.g., 192.168.1.1"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`record-ttl-${index}`}>TTL (seconds)</Label>
                      <Input
                        id={`record-ttl-${index}`}
                        type="number"
                        value={record.ttl}
                        onChange={(e) => updateRecord(index, "ttl", Number.parseInt(e.target.value))}
                        min={60}
                      />
                    </div>

                    {(record.type === "MX" || record.type === "SRV") && (
                      <div>
                        <Label htmlFor={`record-priority-${index}`}>Priority</Label>
                        <Input
                          id={`record-priority-${index}`}
                          type="number"
                          value={record.priority || 0}
                          onChange={(e) => updateRecord(index, "priority", Number.parseInt(e.target.value))}
                          min={0}
                        />
                      </div>
                    )}

                    <div className="flex items-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeRecord(index)}
                        className="text-destructive"
                      >
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">Remove record</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/dns-templates">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Template"}
          </Button>
        </div>
      </form>
    </div>
  )
}
