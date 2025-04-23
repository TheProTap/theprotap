import type { Metadata } from "next"
import { GoDaddyNameserverConfig } from "@/components/godaddy-nameserver-config"

export const metadata: Metadata = {
  title: "GoDaddy Nameserver Configuration",
  description: "Configure your domain to use GoDaddy nameservers",
}

export default function NameserverConfigPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">GoDaddy Nameserver Configuration</h1>
      <p className="text-center text-muted-foreground mb-8">
        Configure your domain to use GoDaddy's nameservers for DNS management
      </p>

      <GoDaddyNameserverConfig />

      <div className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Why use GoDaddy nameservers?</h2>
        <ul className="space-y-2 list-disc pl-5">
          <li>Access to GoDaddy's DNS management tools</li>
          <li>Ability to use GoDaddy's DNS templates</li>
          <li>Integration with other GoDaddy services</li>
          <li>Reliable and fast DNS resolution</li>
          <li>Protection against DNS-based attacks</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Troubleshooting</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Nameserver changes not taking effect?</h3>
            <p className="text-muted-foreground">
              DNS changes can take 24-48 hours to propagate globally. If it's been longer than that, verify that your
              nameservers were entered correctly at your domain registrar.
            </p>
          </div>

          <div>
            <h3 className="font-medium">Domain not resolving?</h3>
            <p className="text-muted-foreground">
              After changing nameservers, you'll need to set up DNS records in your GoDaddy account. At minimum, you'll
              need an A record pointing to your web server's IP address.
            </p>
          </div>

          <div>
            <h3 className="font-medium">Email not working?</h3>
            <p className="text-muted-foreground">
              Don't forget to set up MX records for your email service after changing nameservers. Without proper MX
              records, email delivery will fail.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
