export interface NameserverCheckResult {
  domain: string
  nameservers: string[]
  isUsingGoDaddy: boolean
  expectedNameservers: string[]
  propagationComplete: boolean
}

// GoDaddy's standard nameservers
const GODADDY_NAMESERVERS = ["ns73.domaincontrol.com", "ns74.domaincontrol.com"]

// GoDaddy's international nameservers
const GODADDY_INTERNATIONAL_NAMESERVERS = ["ns53.domaincontrol.com", "ns54.domaincontrol.com"]

// All GoDaddy nameservers (including regional variations)
const ALL_GODADDY_NAMESERVERS = [
  ...GODADDY_NAMESERVERS,
  ...GODADDY_INTERNATIONAL_NAMESERVERS,
  "ns69.domaincontrol.com",
  "ns70.domaincontrol.com",
  "ns71.domaincontrol.com",
  "ns72.domaincontrol.com",
  "ns75.domaincontrol.com",
  "ns76.domaincontrol.com",
]

export const nameserverService = {
  /**
   * Check if a domain is using GoDaddy nameservers
   * In a real implementation, this would make an API call to check the nameservers
   */
  checkNameservers: async (domain: string): Promise<NameserverCheckResult> => {
    // This is a mock implementation
    // In a real app, you would make an API call to a DNS lookup service

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For demo purposes, randomly determine if the domain is using GoDaddy nameservers
    const isUsingGoDaddy = Math.random() > 0.3

    // Generate random nameservers for the demo
    const nameservers = isUsingGoDaddy ? [...GODADDY_NAMESERVERS] : ["ns1.example.com", "ns2.example.com"]

    return {
      domain,
      nameservers,
      isUsingGoDaddy,
      expectedNameservers: GODADDY_NAMESERVERS,
      propagationComplete: isUsingGoDaddy && Math.random() > 0.2,
    }
  },

  /**
   * Get all GoDaddy nameservers
   */
  getGoDaddyNameservers: () => {
    return {
      standard: GODADDY_NAMESERVERS,
      international: GODADDY_INTERNATIONAL_NAMESERVERS,
      all: ALL_GODADDY_NAMESERVERS,
    }
  },

  /**
   * Check if a nameserver is a GoDaddy nameserver
   */
  isGoDaddyNameserver: (nameserver: string): boolean => {
    return ALL_GODADDY_NAMESERVERS.includes(nameserver.toLowerCase())
  },
}
