import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ArrowRight, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "GoDaddy Nameserver Guide",
  description: "Step-by-step guide for configuring GoDaddy nameservers",
}

export default function NameserverGuidePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">GoDaddy Nameserver Guide</h1>
      <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
        Follow this step-by-step guide to configure your domain to use GoDaddy nameservers, whether your domain is
        registered with GoDaddy or another registrar.
      </p>

      <Tabs defaultValue="godaddy" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="godaddy">Domain at GoDaddy</TabsTrigger>
          <TabsTrigger value="other">Domain at Another Registrar</TabsTrigger>
        </TabsList>

        <TabsContent value="godaddy" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Using GoDaddy Nameservers with a GoDaddy Domain</CardTitle>
              <CardDescription>
                If your domain is already registered with GoDaddy, it's likely already using GoDaddy nameservers. Here's
                how to verify and update if needed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Good News!</AlertTitle>
                <AlertDescription>
                  Domains registered with GoDaddy use GoDaddy nameservers by default. You likely don't need to make any
                  changes.
                </AlertDescription>
              </Alert>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Step 1: Log in to your GoDaddy account</h3>
                  <p className="text-muted-foreground">
                    Go to{" "}
                    <a
                      href="https://godaddy.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      GoDaddy.com
                    </a>{" "}
                    and sign in to your account.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Step 2: Go to your domains</h3>
                  <p className="text-muted-foreground">
                    Click on "My Products" and then select "Domains" to see a list of your domains.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Step 3: Select your domain</h3>
                  <p className="text-muted-foreground">
                    Find the domain you want to check and click on it to manage its settings.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Step 4: Check nameserver settings</h3>
                  <p className="text-muted-foreground">
                    Click on "Nameservers" under the DNS section. If you see "GoDaddy nameservers" selected, your domain
                    is already using GoDaddy nameservers.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Step 5: Update if needed</h3>
                  <p className="text-muted-foreground">
                    If your domain is using custom nameservers, you can switch back to GoDaddy nameservers by selecting
                    "GoDaddy nameservers" and saving your changes.
                  </p>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <Link href="/nameserver-config">
                  <Button>
                    Go to Nameserver Configuration
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="other" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Using GoDaddy Nameservers with a Domain from Another Registrar</CardTitle>
              <CardDescription>
                If your domain is registered with another company, follow these steps to point it to GoDaddy
                nameservers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Step 1: Get GoDaddy nameservers</h3>
                  <p className="text-muted-foreground">GoDaddy's standard nameservers are:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <code className="bg-muted px-2 py-1 rounded">ns73.domaincontrol.com</code>
                    </li>
                    <li>
                      <code className="bg-muted px-2 py-1 rounded">ns74.domaincontrol.com</code>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Step 2: Log in to your domain registrar</h3>
                  <p className="text-muted-foreground">
                    Sign in to the account where your domain is currently registered (e.g., Namecheap, Network
                    Solutions, etc.).
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Step 3: Find nameserver settings</h3>
                  <p className="text-muted-foreground">
                    Locate the domain management area and find the option to change nameservers. This is often labeled
                    as "Nameservers," "DNS Settings," or "Domain Settings."
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Step 4: Update nameservers</h3>
                  <p className="text-muted-foreground">
                    Replace the current nameservers with GoDaddy's nameservers listed in Step 1. Make sure to save your
                    changes.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Step 5: Wait for propagation</h3>
                  <p className="text-muted-foreground">
                    Nameserver changes can take 24-48 hours to fully propagate across the internet. Be patient during
                    this time.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Step 6: Set up DNS in GoDaddy</h3>
                  <p className="text-muted-foreground">
                    Once the nameserver change has propagated, you'll need to set up your DNS records in your GoDaddy
                    account to ensure your website, email, and other services work correctly.
                  </p>
                </div>
              </div>

              <Alert className="mt-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Common Registrar Instructions</AlertTitle>
                <AlertDescription>
                  <p className="mb-2">Here are quick links to nameserver change instructions for common registrars:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <a
                        href="https://www.namecheap.com/support/knowledgebase/article.aspx/767/10/how-to-change-dns-for-a-domain/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        Namecheap
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://help.hover.com/hc/en-us/articles/217282457-Managing-DNS-records-"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        Hover
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.name.com/support/articles/205188538-Changing-Nameservers"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        Name.com
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.networksolutions.com/support/how-to-change-your-name-servers-dns/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        Network Solutions
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="flex justify-center mt-6">
                <Link href="/nameserver-config">
                  <Button>
                    Go to Nameserver Configuration
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
