import type { DNSTemplate, Domain } from "../types/dns"

// This would be replaced with actual API calls to GoDaddy API
const mockTemplates: DNSTemplate[] = [
  {
    id: "1",
    name: "Basic Website",
    description: "Basic DNS setup for a website with www subdomain",
    records: [
      { id: "1", type: "A", name: "@", value: "192.168.1.1", ttl: 3600 },
      { id: "2", type: "CNAME", name: "www", value: "@", ttl: 3600 },
      { id: "3", type: "MX", name: "@", value: "mail.example.com", ttl: 3600, priority: 10 },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Email Setup",
    description: "DNS records for email services including SPF and DKIM",
    records: [
      { id: "1", type: "MX", name: "@", value: "mail.example.com", ttl: 3600, priority: 10 },
      { id: "2", type: "TXT", name: "@", value: "v=spf1 include:_spf.example.com ~all", ttl: 3600 },
      {
        id: "3",
        type: "TXT",
        name: "dkim._domainkey",
        value:
          "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3QEKyU1fSma0axspqYK5iAj+54lsAg4qRRCnpKK68hawSd8zpsDz77ntGCR0X2mHVvkf0WEOIqaspaG/A5IGxieiWer+wBX8lW2tE4NHTE0PLhHqL0uVox2vnXsXQ4rXU/0/bMaQE+3LiEYl7aSEy/QkAEKCQXx2L3EWbO3OKfQIDAQAB",
        ttl: 3600,
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const mockDomains: Domain[] = [
  { id: "1", name: "example.com", expirationDate: "2024-12-31", status: "Active" },
  { id: "2", name: "mywebsite.com", expirationDate: "2025-06-15", status: "Active" },
  { id: "3", name: "testdomain.org", expirationDate: "2023-10-01", status: "Expired" },
]

export const dnsTemplateService = {
  getTemplates: async (): Promise<DNSTemplate[]> => {
    // In a real app, this would be an API call to your backend
    return Promise.resolve(mockTemplates)
  },

  getTemplate: async (id: string): Promise<DNSTemplate | undefined> => {
    return Promise.resolve(mockTemplates.find((template) => template.id === id))
  },

  createTemplate: async (template: Omit<DNSTemplate, "id" | "createdAt" | "updatedAt">): Promise<DNSTemplate> => {
    const newTemplate: DNSTemplate = {
      ...template,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockTemplates.push(newTemplate)
    return Promise.resolve(newTemplate)
  },

  updateTemplate: async (id: string, template: Partial<DNSTemplate>): Promise<DNSTemplate | undefined> => {
    const index = mockTemplates.findIndex((t) => t.id === id)
    if (index === -1) return undefined

    mockTemplates[index] = {
      ...mockTemplates[index],
      ...template,
      updatedAt: new Date().toISOString(),
    }

    return Promise.resolve(mockTemplates[index])
  },

  deleteTemplate: async (id: string): Promise<boolean> => {
    const index = mockTemplates.findIndex((t) => t.id === id)
    if (index === -1) return false

    mockTemplates.splice(index, 1)
    return Promise.resolve(true)
  },

  getDomains: async (): Promise<Domain[]> => {
    return Promise.resolve(mockDomains)
  },

  applyTemplate: async (domainId: string, templateId: string): Promise<boolean> => {
    // In a real app, this would call the GoDaddy API to apply the DNS records
    console.log(`Applying template ${templateId} to domain ${domainId}`)
    return Promise.resolve(true)
  },
}
