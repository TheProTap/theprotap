"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Clipboard, ClipboardCheck, AlertCircle, CheckCircle2, Copy } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// GoDaddy's default nameservers
const GODADDY_NAMESERVERS = ["ns73.domaincontrol.com", "ns74.domaincontrol.com"]

// GoDaddy's international nameservers (for some regions)
const GODADDY_INTERNATIONAL_NAMESERVERS = ["ns53.domaincontrol.com", "ns54.domaincontrol.com"]

export function GoDaddyNameserverConfig() {
  const [domain, setDomain] = useState("")
  const [customNameservers, setCustomNameservers] = useState(["", ""])
  const [copied, setCopied] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "checking" | "success" | "error">("idle")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "Nameserver information has been copied to your clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleVerifyNameservers = async () => {
    if (!domain) {
      toast({
        title: "Domain required",
        description: "Please enter a domain name to verify nameservers.",
        variant: "destructive",
      })
      return
    }

    setVerificationStatus("checking")

    // In a real app, this would be an API call to check the nameservers
    // For demo purposes, we'll simulate a check after 2 seconds
    setTimeout(() => {
      // Randomly succeed or fail for demo purposes
      const success = Math.random() > 0.3
      setVerificationStatus(success ? "success" : "error")

      toast({
        title: success ? "Nameservers verified" : "Verification failed",
        description: success
          ? "Your domain is correctly pointing to GoDaddy nameservers."
          : "Your domain is not correctly configured with GoDaddy nameservers.",
        variant: success ? "default" : "destructive",
      })
    }, 2000)
  }

  const updateCustomNameserver = (index: number, value: string) => {
    const updated = [...customNameservers]
    updated[index] = value
    setCustomNameservers(updated)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>GoDaddy Nameserver Configuration</CardTitle>
        <CardDescription>Configure your domain to use GoDaddy's nameservers for DNS management</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="standard">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="standard">Standard</TabsTrigger>
            <TabsTrigger value="international">International</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>

          <TabsContent value="standard" className="space-y-4">
            <div className="mt-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>GoDaddy Standard Nameservers</AlertTitle>
                <AlertDescription>Use these nameservers for most domains registered with GoDaddy.</AlertDescription>
              </Alert>

              <div className="mt-4 space-y-2">
                {GODADDY_NAMESERVERS.map((ns, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                    <code className="bg-muted px-2 py-1 rounded">{ns}</code>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(ns)}>
                      {copied ? <ClipboardCheck className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                    </Button>
                  </div>
                ))}
                <Button className="w-full mt-2" onClick={() => copyToClipboard(GODADDY_NAMESERVERS.join("\n"))}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy All Nameservers
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="international" className="space-y-4">
            <div className="mt-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>GoDaddy International Nameservers</AlertTitle>
                <AlertDescription>Use these nameservers for domains in certain international regions.</AlertDescription>
              </Alert>

              <div className="mt-4 space-y-2">
                {GODADDY_INTERNATIONAL_NAMESERVERS.map((ns, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                    <code className="bg-muted px-2 py-1 rounded">{ns}</code>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(ns)}>
                      {copied ? <ClipboardCheck className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                    </Button>
                  </div>
                ))}
                <Button
                  className="w-full mt-2"
                  onClick={() => copyToClipboard(GODADDY_INTERNATIONAL_NAMESERVERS.join("\n"))}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy All Nameservers
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <div className="mt-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Custom Nameservers</AlertTitle>
                <AlertDescription>
                  If you're using custom nameservers provided by GoDaddy support, enter them here.
                </AlertDescription>
              </Alert>

              <div className="mt-4 space-y-4">
                {customNameservers.map((ns, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`ns-${index}`}>Nameserver {index + 1}</Label>
                    <Input
                      id={`ns-${index}`}
                      value={ns}
                      onChange={(e) => updateCustomNameserver(index, e.target.value)}
                      placeholder={`e.g., ns${index + 1}.example.com`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="domain">Verify Domain Configuration</Label>
            <div className="flex space-x-2">
              <Input id="domain" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="example.com" />
              <Button onClick={handleVerifyNameservers} disabled={verificationStatus === "checking" || !domain}>
                {verificationStatus === "checking" ? "Checking..." : "Verify"}
              </Button>
            </div>
          </div>

          {verificationStatus === "success" && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Nameservers Verified</AlertTitle>
              <AlertDescription className="text-green-700">
                Your domain {domain} is correctly configured with GoDaddy nameservers.
              </AlertDescription>
            </Alert>
          )}

          {verificationStatus === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Verification Failed</AlertTitle>
              <AlertDescription>
                Your domain {domain} is not correctly configured with GoDaddy nameservers. Please update your
                nameservers at your domain registrar and try again.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <h3 className="text-sm font-medium mb-2">How to update nameservers:</h3>
        <ol className="text-sm text-muted-foreground list-decimal pl-5 space-y-1">
          <li>Log in to your domain registrar account</li>
          <li>Find your domain and go to DNS or nameserver settings</li>
          <li>Replace the current nameservers with GoDaddy's nameservers</li>
          <li>Save your changes</li>
          <li>Wait 24-48 hours for the changes to propagate</li>
        </ol>
      </CardFooter>
    </Card>
  )
}
