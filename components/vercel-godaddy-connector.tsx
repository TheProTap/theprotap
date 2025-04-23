"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Clipboard, ClipboardCheck, AlertCircle, CheckCircle2, Copy, ExternalLink } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"

export function VercelGoDaddyConnector() {
  const [domain, setDomain] = useState("")
  const [vercelProjectName, setVercelProjectName] = useState("")
  const [vercelDomain, setVercelDomain] = useState("")
  const [copied, setCopied] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "checking" | "success" | "error">("idle")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "DNS record information has been copied to your clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleVerifyConnection = async () => {
    if (!domain) {
      toast({
        title: "Domain required",
        description: "Please enter a domain name to verify the connection.",
        variant: "destructive",
      })
      return
    }

    setVerificationStatus("checking")

    // In a real app, this would be an API call to check the DNS configuration
    // For demo purposes, we'll simulate a check after 2 seconds
    setTimeout(() => {
      // Randomly succeed or fail for demo purposes
      const success = Math.random() > 0.3
      setVerificationStatus(success ? "success" : "error")

      toast({
        title: success ? "Connection verified" : "Verification failed",
        description: success
          ? "Your domain is correctly connected to Vercel."
          : "Your domain is not correctly connected to Vercel.",
        variant: success ? "default" : "destructive",
      })
    }, 2000)
  }

  // Generate a sample Vercel domain if one isn't provided
  const getVercelDomain = () => {
    if (vercelDomain) return vercelDomain
    if (vercelProjectName) return `${vercelProjectName.toLowerCase().replace(/[^a-z0-9]/g, "-")}.vercel.app`
    return "your-project.vercel.app"
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Connect GoDaddy Domain to Vercel</CardTitle>
        <CardDescription>Configure your GoDaddy domain to work with your Vercel deployment</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="dns-records">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dns-records">Using GoDaddy DNS</TabsTrigger>
            <TabsTrigger value="nameservers">Using Vercel DNS</TabsTrigger>
          </TabsList>

          <TabsContent value="dns-records" className="space-y-4">
            <div className="mt-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Keep GoDaddy as your DNS provider</AlertTitle>
                <AlertDescription>
                  This method lets you keep using GoDaddy to manage your DNS records while pointing your domain to
                  Vercel.
                </AlertDescription>
              </Alert>

              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="domain-input">Your Domain Name</Label>
                  <Input
                    id="domain-input"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vercel-project">Vercel Project Name</Label>
                  <Input
                    id="vercel-project"
                    value={vercelProjectName}
                    onChange={(e) => setVercelProjectName(e.target.value)}
                    placeholder="my-awesome-project"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vercel-domain">Vercel Domain (optional)</Label>
                  <Input
                    id="vercel-domain"
                    value={vercelDomain}
                    onChange={(e) => setVercelDomain(e.target.value)}
                    placeholder="your-project.vercel.app"
                  />
                  <p className="text-xs text-muted-foreground">
                    If left blank, we'll use your project name to generate a Vercel domain.
                  </p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Required DNS Records</h3>
                <p className="text-sm text-muted-foreground">Add these records in your GoDaddy DNS management panel:</p>

                <div className="space-y-4">
                  {/* A Record */}
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">A Record (Root Domain)</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(`Type: A\nName: @\nValue: 76.76.21.21\nTTL: 600`)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      <div className="font-medium">Type</div>
                      <div className="font-medium">Name</div>
                      <div className="font-medium">Value</div>
                      <div className="font-medium">TTL</div>

                      <div>A</div>
                      <div>@</div>
                      <div>76.76.21.21</div>
                      <div>600</div>
                    </div>
                  </div>

                  {/* CNAME Record */}
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">CNAME Record (www subdomain)</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(`Type: CNAME\nName: www\nValue: ${domain || "example.com"}\nTTL: 3600`)
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      <div className="font-medium">Type</div>
                      <div className="font-medium">Name</div>
                      <div className="font-medium">Value</div>
                      <div className="font-medium">TTL</div>

                      <div>CNAME</div>
                      <div>www</div>
                      <div>{domain || "example.com"}</div>
                      <div>3600</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Vercel Domain Configuration</h3>
                <p className="text-sm text-muted-foreground">
                  After adding the DNS records, add your domain in Vercel:
                </p>

                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>Go to your Vercel project dashboard</li>
                  <li>Navigate to "Settings" → "Domains"</li>
                  <li>
                    Add your domain: <strong>{domain || "example.com"}</strong>
                  </li>
                  <li>Vercel will verify your DNS configuration</li>
                </ol>

                <div className="flex justify-center mt-4">
                  <Button
                    variant="outline"
                    onClick={() => window.open("https://vercel.com/dashboard", "_blank")}
                    className="flex items-center"
                  >
                    Open Vercel Dashboard
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="nameservers" className="space-y-4">
            <div className="mt-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Use Vercel as your DNS provider</AlertTitle>
                <AlertDescription>
                  This method transfers DNS management to Vercel, giving you access to additional features like
                  automatic SSL certificates.
                </AlertDescription>
              </Alert>

              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="domain-input-ns">Your Domain Name</Label>
                  <Input
                    id="domain-input-ns"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="example.com"
                  />
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Vercel Nameservers</h3>
                <p className="text-sm text-muted-foreground">
                  Update your domain's nameservers in GoDaddy to point to Vercel:
                </p>

                <div className="space-y-2">
                  {["ns1.vercel-dns.com", "ns2.vercel-dns.com"].map((ns, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                      <code className="bg-muted px-2 py-1 rounded">{ns}</code>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(ns)}>
                        {copied ? <ClipboardCheck className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                      </Button>
                    </div>
                  ))}
                  <Button
                    className="w-full mt-2"
                    onClick={() => copyToClipboard("ns1.vercel-dns.com\nns2.vercel-dns.com")}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy All Nameservers
                  </Button>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Steps to Update Nameservers</h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>Log in to your GoDaddy account</li>
                  <li>Go to "My Products" → "Domains"</li>
                  <li>Select your domain</li>
                  <li>Click on "Nameservers" under the DNS section</li>
                  <li>Select "I'll use my own nameservers"</li>
                  <li>Enter the Vercel nameservers listed above</li>
                  <li>Save your changes</li>
                </ol>

                <Alert className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important Note</AlertTitle>
                  <AlertDescription>
                    Nameserver changes can take 24-48 hours to fully propagate. During this time, your website might be
                    temporarily unavailable.
                  </AlertDescription>
                </Alert>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Vercel Domain Configuration</h3>
                <p className="text-sm text-muted-foreground">
                  After updating the nameservers, add your domain in Vercel:
                </p>

                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>Go to your Vercel project dashboard</li>
                  <li>Navigate to "Settings" → "Domains"</li>
                  <li>
                    Add your domain: <strong>{domain || "example.com"}</strong>
                  </li>
                  <li>Select "Vercel nameservers" as the configuration type</li>
                  <li>Vercel will verify your nameserver configuration</li>
                </ol>

                <div className="flex justify-center mt-4">
                  <Button
                    variant="outline"
                    onClick={() => window.open("https://vercel.com/dashboard", "_blank")}
                    className="flex items-center"
                  >
                    Open Vercel Dashboard
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="verify-domain">Verify Connection</Label>
            <div className="flex space-x-2">
              <Input
                id="verify-domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
              />
              <Button onClick={handleVerifyConnection} disabled={verificationStatus === "checking" || !domain}>
                {verificationStatus === "checking" ? "Checking..." : "Verify"}
              </Button>
            </div>
          </div>

          {verificationStatus === "success" && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Connection Verified</AlertTitle>
              <AlertDescription className="text-green-700">
                Your domain {domain} is correctly connected to Vercel.
              </AlertDescription>
            </Alert>
          )}

          {verificationStatus === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Verification Failed</AlertTitle>
              <AlertDescription>
                Your domain {domain} is not correctly connected to Vercel. Please check your DNS configuration and try
                again.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <h3 className="text-sm font-medium mb-2">Troubleshooting Tips:</h3>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
          <li>DNS changes can take up to 48 hours to fully propagate</li>
          <li>Verify that you've entered the correct DNS records or nameservers</li>
          <li>Check for typos in your domain name in the Vercel dashboard</li>
          <li>Make sure your domain is active and not expired</li>
          <li>If using Vercel nameservers, ensure all nameservers are updated</li>
        </ul>
      </CardFooter>
    </Card>
  )
}
