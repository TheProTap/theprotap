"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  getTransactions,
  getBankAccounts,
  getPaymentProcessors,
  getFinancialMetrics,
  type Transaction,
  type BankAccount,
  type PaymentProcessor,
  type FinancialMetrics,
} from "@/lib/financial-service"

interface FinancialContextType {
  transactions: Transaction[]
  bankAccounts: BankAccount[]
  paymentProcessors: PaymentProcessor[]
  metrics: FinancialMetrics | null
  loading: {
    transactions: boolean
    bankAccounts: boolean
    paymentProcessors: boolean
    metrics: boolean
  }
  error: {
    transactions: string | null
    bankAccounts: string | null
    paymentProcessors: string | null
    metrics: string | null
  }
  dateRange: string
  setDateRange: (range: string) => void
  refreshTransactions: (filters?: Record<string, any>) => Promise<void>
  refreshMetrics: () => Promise<void>
  totalTransactions: number
  currentPage: number
  setCurrentPage: (page: number) => void
}

const FinancialContext = createContext<FinancialContextType | undefined>(undefined)

export function FinancialProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([])
  const [paymentProcessors, setPaymentProcessors] = useState<PaymentProcessor[]>([])
  const [metrics, setMetrics] = useState<FinancialMetrics | null>(null)
  const [totalTransactions, setTotalTransactions] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [dateRange, setDateRange] = useState("last30")

  const [loading, setLoading] = useState({
    transactions: true,
    bankAccounts: true,
    paymentProcessors: true,
    metrics: true,
  })

  const [error, setError] = useState({
    transactions: null,
    bankAccounts: null,
    paymentProcessors: null,
    metrics: null,
  })

  const refreshTransactions = async (filters: Record<string, any> = {}) => {
    setLoading((prev) => ({ ...prev, transactions: true }))
    setError((prev) => ({ ...prev, transactions: null }))

    try {
      const result = await getTransactions(dateRange, currentPage, 10, filters)
      setTransactions(result.transactions)
      setTotalTransactions(result.total)
    } catch (err) {
      setError((prev) => ({ ...prev, transactions: "Failed to load transactions" }))
    } finally {
      setLoading((prev) => ({ ...prev, transactions: false }))
    }
  }

  const refreshMetrics = async () => {
    setLoading((prev) => ({ ...prev, metrics: true }))
    setError((prev) => ({ ...prev, metrics: null }))

    try {
      const data = await getFinancialMetrics(dateRange)
      setMetrics(data)
    } catch (err) {
      setError((prev) => ({ ...prev, metrics: "Failed to load financial metrics" }))
    } finally {
      setLoading((prev) => ({ ...prev, metrics: false }))
    }
  }

  const loadBankAccounts = async () => {
    setLoading((prev) => ({ ...prev, bankAccounts: true }))
    setError((prev) => ({ ...prev, bankAccounts: null }))

    try {
      const data = await getBankAccounts()
      setBankAccounts(data)
    } catch (err) {
      setError((prev) => ({ ...prev, bankAccounts: "Failed to load bank accounts" }))
    } finally {
      setLoading((prev) => ({ ...prev, bankAccounts: false }))
    }
  }

  const loadPaymentProcessors = async () => {
    setLoading((prev) => ({ ...prev, paymentProcessors: true }))
    setError((prev) => ({ ...prev, paymentProcessors: null }))

    try {
      const data = await getPaymentProcessors()
      setPaymentProcessors(data)
    } catch (err) {
      setError((prev) => ({ ...prev, paymentProcessors: "Failed to load payment processors" }))
    } finally {
      setLoading((prev) => ({ ...prev, paymentProcessors: false }))
    }
  }

  // Load initial data
  useEffect(() => {
    refreshTransactions()
    refreshMetrics()
    loadBankAccounts()
    loadPaymentProcessors()
  }, [])

  // Refresh data when date range changes
  useEffect(() => {
    refreshTransactions()
    refreshMetrics()
  }, [dateRange])

  // Refresh transactions when page changes
  useEffect(() => {
    refreshTransactions()
  }, [currentPage])

  const value = {
    transactions,
    bankAccounts,
    paymentProcessors,
    metrics,
    loading,
    error,
    dateRange,
    setDateRange,
    refreshTransactions,
    refreshMetrics,
    totalTransactions,
    currentPage,
    setCurrentPage,
  }

  return <FinancialContext.Provider value={value}>{children}</FinancialContext.Provider>
}

export function useFinancial() {
  const context = useContext(FinancialContext)
  if (context === undefined) {
    throw new Error("useFinancial must be used within a FinancialProvider")
  }
  return context
}
