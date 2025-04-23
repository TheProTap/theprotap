export type DNSRecordType = "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "SRV" | "NS" | "CAA"

export interface DNSRecord {
  id?: string
  type: DNSRecordType
  name: string
  value: string
  ttl: number
  priority?: number // For MX and SRV records
  weight?: number // For SRV records
  port?: number // For SRV records
}

export interface DNSTemplate {
  id: string
  name: string
  description: string
  records: DNSRecord[]
  createdAt: string
  updatedAt: string
}

export interface Domain {
  id: string
  name: string
  expirationDate: string
  status: "Active" | "Expired" | "Pending"
}
