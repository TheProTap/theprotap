import type { Metadata } from "next"
import { VercelGoDaddyConnector } from "@/components/vercel-godaddy-connector"

export const metadata: Metadata = {
  title: "Connect GoDaddy Domain to Vercel",
  description: "Configure your GoDaddy domain to work with your Vercel deployment",
}

export default function VercelGoDaddyPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Connect GoDaddy Domain to Vercel</h1>
      <p className="text-center text-muted-foreground mb-8">
        Follow these steps to connect your GoDaddy domain to your Vercel deployment
      </p>

      <VercelGoDaddyConnector />

      <div className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Why use Vercel with your GoDaddy domain?</h2>
        <ul className="space-y-2 list-disc pl-5">
          <li>Fast global CDN for your website</li>
          <li>Automatic HTTPS/SSL certificates</li>
          <li>Seamless deployments from Git</li>
          <li>Edge functions and serverless capabilities</li>
          <li>Analytics and performance monitoring</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Do I need to transfer my domain to Vercel?</h3>
            <p className="text-muted-foreground">
              No, you can keep your domain registered with GoDaddy. You only need to configure the DNS settings or
              nameservers to point to Vercel.
            </p>
          </div>

          <div>
            <h3 className="font-medium">Which method should I choose?</h3>
            <p className="text-muted-foreground">
              If you have other services using your domain (like email), use the DNS records method. If you want Vercel
              to manage everything, use the nameservers method.
            </p>
          </div>

          <div>
            <h3 className="font-medium">Will my email be affected?</h3>
            <p className="text-muted-foreground">
              If you use the DNS records method, your email won't be affected. If you use the nameservers method, you'll
              need to reconfigure your email MX records in the Vercel dashboard.
            </p>
          </div>

          <div>
            <h3 className="font-medium">How long until my domain works with Vercel?</h3>
            <p className="text-muted-foreground">
              DNS changes typically take 15 minutes to 48 hours to fully propagate. The DNS records method is usually
              faster than changing nameservers.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
