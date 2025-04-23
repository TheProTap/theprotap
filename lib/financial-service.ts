// Types for financial data
export interface Transaction {
  id: string
  date: string
  amount: number
  fee: number
  net: number
  type: "card_purchase" | "payout" | "refund"
  status: "completed" | "processing" | "failed"
  customer?: {
    name: string
    email: string
    id: string
  }
  payment?: {
    method: "credit_card" | "paypal" | "apple_pay" | "google_pay"
    last4?: string
    brand?: string
    email?: string
  }
  order?: {
    id: string
    items: {
      name: string
      quantity: number
      price: number
    }[]
    shipping: number
    tax: number
  }
  destination?: {
    type: "bank_account"
    bank: string
    last4: string
    name: string
  }
}

export interface BankAccount {
  id: string
  name: string
  bank: string
  type: string
  accountNumber: string
  routingNumber: string
  balance: number
  currency: string
  isDefault: boolean
}

export interface PaymentProcessor {
  id: string
  name: string
  status: "active" | "inactive"
  fee: string
  balance: number
  pendingTransfers: number
  lastPayout: string
  payoutSchedule: string
}

export interface FinancialMetrics {
  totalRevenue: number
  totalFees: number
  netRevenue: number
  totalPayouts: number
  revenueByCardType: {
    basic: number
    engraved: number
    premium: number
  }
  paymentMethodDistribution: {
    creditCard: number
    paypal: number
    applePay: number
    googlePay: number
  }
}

// Mock data for development
const mockTransactions: Transaction[] = [
  {
    id: "TRX-12345",
    date: "2023-10-15T14:32:00Z",
    amount: 54.0,
    fee: 1.62,
    net: 52.38,
    type: "card_purchase",
    status: "completed",
    customer: {
      name: "Jamie Smith",
      email: "jamie@example.com",
      id: "USR-001",
    },
    payment: {
      method: "credit_card",
      last4: "4242",
      brand: "Visa",
    },
    order: {
      id: "ORD-12345",
      items: [
        {
          name: "Premium Metal NFC Card",
          quantity: 1,
          price: 50.0,
        },
      ],
      shipping: 4.0,
      tax: 0.0,
    },
  },
  {
    id: "TRX-12346",
    date: "2023-10-16T09:15:00Z",
    amount: 37.8,
    fee: 1.13,
    net: 36.67,
    type: "card_purchase",
    status: "completed",
    customer: {
      name: "Taylor Reed",
      email: "taylor@example.com",
      id: "USR-002",
    },
    payment: {
      method: "paypal",
      email: "taylor@example.com",
    },
    order: {
      id: "ORD-12346",
      items: [
        {
          name: "Engraved Plastic NFC Card",
          quantity: 1,
          price: 35.0,
        },
      ],
      shipping: 2.8,
      tax: 0.0,
    },
  },
  {
    id: "TRX-12347",
    date: "2023-10-17T16:45:00Z",
    amount: 27.0,
    fee: 0.81,
    net: 26.19,
    type: "card_purchase",
    status: "completed",
    customer: {
      name: "Casey Jones",
      email: "casey@example.com",
      id: "USR-003",
    },
    payment: {
      method: "credit_card",
      last4: "1234",
      brand: "Mastercard",
    },
    order: {
      id: "ORD-12347",
      items: [
        {
          name: "Basic Plastic NFC Card",
          quantity: 1,
          price: 25.0,
        },
      ],
      shipping: 2.0,
      tax: 0.0,
    },
  },
  {
    id: "TRX-12348",
    date: "2023-10-18T11:22:00Z",
    amount: 108.0,
    fee: 3.24,
    net: 104.76,
    type: "card_purchase",
    status: "completed",
    customer: {
      name: "Morgan Chen",
      email: "morgan@example.com",
      id: "USR-004",
    },
    payment: {
      method: "credit_card",
      last4: "5678",
      brand: "Amex",
    },
    order: {
      id: "ORD-12348",
      items: [
        {
          name: "Premium Metal NFC Card",
          quantity: 2,
          price: 50.0,
        },
      ],
      shipping: 8.0,
      tax: 0.0,
    },
  },
  {
    id: "TRX-12349",
    date: "2023-10-19T13:10:00Z",
    amount: 27.0,
    fee: 0.81,
    net: 26.19,
    type: "card_purchase",
    status: "completed",
    customer: {
      name: "Alex Rivera",
      email: "alex@example.com",
      id: "USR-005",
    },
    payment: {
      method: "apple_pay",
    },
    order: {
      id: "ORD-12349",
      items: [
        {
          name: "Basic Plastic NFC Card",
          quantity: 1,
          price: 25.0,
        },
      ],
      shipping: 2.0,
      tax: 0.0,
    },
  },
  {
    id: "TRX-12350",
    date: "2023-10-20T10:05:00Z",
    amount: 54.0,
    fee: 1.62,
    net: 52.38,
    type: "card_purchase",
    status: "processing",
    customer: {
      name: "Jordan Lee",
      email: "jordan@example.com",
      id: "USR-006",
    },
    payment: {
      method: "credit_card",
      last4: "9012",
      brand: "Visa",
    },
    order: {
      id: "ORD-12350",
      items: [
        {
          name: "Premium Metal NFC Card",
          quantity: 1,
          price: 50.0,
        },
      ],
      shipping: 4.0,
      tax: 0.0,
    },
  },
  {
    id: "PAYOUT-001",
    date: "2023-10-15T00:00:00Z",
    amount: 246.57,
    fee: 0.0,
    net: 246.57,
    type: "payout",
    status: "completed",
    destination: {
      type: "bank_account",
      bank: "Chase Bank",
      last4: "6789",
      name: "Pro Tap Inc.",
    },
  },
]

const mockBankAccounts: BankAccount[] = [
  {
    id: "BANK-001",
    name: "Pro Tap Business Account",
    bank: "Chase Bank",
    type: "Checking",
    accountNumber: "****6789",
    routingNumber: "****4321",
    balance: 12458.92,
    currency: "USD",
    isDefault: true,
  },
  {
    id: "BANK-002",
    name: "Pro Tap Savings",
    bank: "Bank of America",
    type: "Savings",
    accountNumber: "****5432",
    routingNumber: "****8765",
    balance: 25000.0,
    currency: "USD",
    isDefault: false,
  },
]

const mockPaymentProcessors: PaymentProcessor[] = [
  {
    id: "PROC-001",
    name: "Stripe",
    status: "active",
    fee: "2.9% + $0.30",
    balance: 1245.67,
    pendingTransfers: 0.0,
    lastPayout: "2023-10-15T00:00:00Z",
    payoutSchedule: "Daily",
  },
  {
    id: "PROC-002",
    name: "PayPal",
    status: "active",
    fee: "3.49% + $0.49",
    balance: 358.21,
    pendingTransfers: 0.0,
    lastPayout: "2023-10-14T00:00:00Z",
    payoutSchedule: "Weekly",
  },
]

// Financial service functions
export async function getTransactions(
  dateRange = "last30",
  page = 1,
  limit = 10,
  filters: Record<string, any> = {},
): Promise<{ transactions: Transaction[]; total: number }> {
  // In a real app, this would be an API call
  // For now, we'll use the mock data
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay

  let filteredTransactions = [...mockTransactions]

  // Apply filters
  if (filters.type) {
    filteredTransactions = filteredTransactions.filter((t) => t.type === filters.type)
  }

  if (filters.status) {
    filteredTransactions = filteredTransactions.filter((t) => t.status === filters.status)
  }

  // Apply date range
  const now = new Date()
  const startDate = new Date()

  if (dateRange === "last7") {
    startDate.setDate(now.getDate() - 7)
  } else if (dateRange === "last30") {
    startDate.setDate(now.getDate() - 30)
  } else if (dateRange === "last90") {
    startDate.setDate(now.getDate() - 90)
  }

  filteredTransactions = filteredTransactions.filter((t) => new Date(t.date) >= startDate)

  // Pagination
  const start = (page - 1) * limit
  const end = start + limit
  const paginatedTransactions = filteredTransactions.slice(start, end)

  return {
    transactions: paginatedTransactions,
    total: filteredTransactions.length,
  }
}

export async function getBankAccounts(): Promise<BankAccount[]> {
  await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate API delay
  return mockBankAccounts
}

export async function getPaymentProcessors(): Promise<PaymentProcessor[]> {
  await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate API delay
  return mockPaymentProcessors
}

export async function getFinancialMetrics(dateRange = "last30"): Promise<FinancialMetrics> {
  await new Promise((resolve) => setTimeout(resolve, 400)) // Simulate API delay

  // Get transactions for the date range
  const { transactions } = await getTransactions(dateRange)

  // Calculate metrics
  const totalRevenue = transactions
    .filter((t) => t.type === "card_purchase" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalFees = transactions
    .filter((t) => t.type === "card_purchase" && t.status === "completed")
    .reduce((sum, t) => sum + t.fee, 0)

  const netRevenue = transactions
    .filter((t) => t.type === "card_purchase" && t.status === "completed")
    .reduce((sum, t) => sum + t.net, 0)

  const totalPayouts = transactions
    .filter((t) => t.type === "payout" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  // Calculate revenue by card type
  const revenueByCardType = {
    basic: 0,
    engraved: 0,
    premium: 0,
  }

  transactions
    .filter((t) => t.type === "card_purchase" && t.status === "completed" && t.order)
    .forEach((t) => {
      t.order?.items.forEach((item) => {
        if (item.name.toLowerCase().includes("basic")) {
          revenueByCardType.basic += item.price * item.quantity
        } else if (item.name.toLowerCase().includes("engraved")) {
          revenueByCardType.engraved += item.price * item.quantity
        } else if (item.name.toLowerCase().includes("premium")) {
          revenueByCardType.premium += item.price * item.quantity
        }
      })
    })

  // Calculate payment method distribution
  const paymentMethods = {
    creditCard: 0,
    paypal: 0,
    applePay: 0,
    googlePay: 0,
  }

  transactions
    .filter((t) => t.type === "card_purchase" && t.status === "completed" && t.payment)
    .forEach((t) => {
      if (t.payment?.method === "credit_card") {
        paymentMethods.creditCard++
      } else if (t.payment?.method === "paypal") {
        paymentMethods.paypal++
      } else if (t.payment?.method === "apple_pay") {
        paymentMethods.applePay++
      } else if (t.payment?.method === "google_pay") {
        paymentMethods.googlePay++
      }
    })

  const total = Object.values(paymentMethods).reduce((sum, count) => sum + count, 0)

  const paymentMethodDistribution = {
    creditCard: total > 0 ? (paymentMethods.creditCard / total) * 100 : 0,
    paypal: total > 0 ? (paymentMethods.paypal / total) * 100 : 0,
    applePay: total > 0 ? (paymentMethods.applePay / total) * 100 : 0,
    googlePay: total > 0 ? (paymentMethods.googlePay / total) * 100 : 0,
  }

  return {
    totalRevenue,
    totalFees,
    netRevenue,
    totalPayouts,
    revenueByCardType,
    paymentMethodDistribution,
  }
}

// Payment processing functions
export async function processPayment(
  paymentData: any,
): Promise<{ success: boolean; transactionId?: string; error?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate payment processing

  // Simulate success with 95% probability
  const isSuccess = Math.random() < 0.95

  if (isSuccess) {
    return {
      success: true,
      transactionId: `TRX-${Math.floor(Math.random() * 100000)}`,
    }
  } else {
    return {
      success: false,
      error: "Payment processing failed. Please try again.",
    }
  }
}

export async function initiatePayoutToBank(
  amount: number,
  bankAccountId: string,
): Promise<{ success: boolean; payoutId?: string; error?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 800)) // Simulate payout processing

  // Simulate success with 90% probability
  const isSuccess = Math.random() < 0.9

  if (isSuccess) {
    return {
      success: true,
      payoutId: `PAYOUT-${Math.floor(Math.random() * 10000)}`,
    }
  } else {
    return {
      success: false,
      error: "Payout initiation failed. Please try again.",
    }
  }
}

export async function updatePayoutSettings(settings: any): Promise<{ success: boolean; error?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 600)) // Simulate API delay

  // Simulate success with 95% probability
  const isSuccess = Math.random() < 0.95

  if (isSuccess) {
    return {
      success: true,
    }
  } else {
    return {
      success: false,
      error: "Failed to update payout settings. Please try again.",
    }
  }
}

export async function setDefaultBankAccount(bankAccountId: string): Promise<{ success: boolean; error?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay

  // Simulate success with 95% probability
  const isSuccess = Math.random() < 0.95

  if (isSuccess) {
    return {
      success: true,
    }
  } else {
    return {
      success: false,
      error: "Failed to set default bank account. Please try again.",
    }
  }
}
