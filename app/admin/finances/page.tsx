"use client"

import { useState } from "react"
import {
  DollarSign,
  CreditCard,
  ArrowDownRight,
  ArrowUpRight,
  Download,
  Calendar,
  Filter,
  ExternalLink,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import DashboardLayout from "@/components/admin-layout"
import { FinancialProvider, useFinancial } from "@/contexts/financial-context"
import Link from "next/link"

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function FinancialDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null)
  const [payoutAmount, setPayoutAmount] = useState<number>(100)

  const {
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
  } = useFinancial()

  // Handle initiating a payout
  const handleInitiatePayout = async () => {
    // In a real app, this would call the API to initiate a payout
    alert(`Initiating payout of ${formatCurrency(payoutAmount)} to default bank account`)
  }

  // Handle exporting data
  const handleExportData = () => {
    alert("Exporting financial data...")
    // In a real app, this would generate a CSV or PDF export
  }

  if (loading.metrics && loading.transactions && loading.bankAccounts && loading.paymentProcessors) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-gray-500">Loading financial data...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Financial Dashboard</h1>
          <p className="text-gray-500">Manage payments, payouts, and financial settings</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
          <div className="flex items-center border rounded-md p-1">
            <Button
              variant={dateRange === "last7" ? "default" : "ghost"}
              size="sm"
              onClick={() => setDateRange("last7")}
            >
              7 days
            </Button>
            <Button
              variant={dateRange === "last30" ? "default" : "ghost"}
              size="sm"
              onClick={() => setDateRange("last30")}
            >
              30 days
            </Button>
            <Button
              variant={dateRange === "last90" ? "default" : "ghost"}
              size="sm"
              onClick={() => setDateRange("last90")}
            >
              90 days
            </Button>
          </div>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Display errors if any */}
      {(error.metrics || error.transactions || error.bankAccounts || error.paymentProcessors) && (
        <Alert variant="destructive">
          <AlertDescription>
            {error.metrics || error.transactions || error.bankAccounts || error.paymentProcessors}
          </AlertDescription>
        </Alert>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold">
                    {loading.metrics ? (
                      <span className="animate-pulse">$0.00</span>
                    ) : (
                      formatCurrency(metrics?.totalRevenue || 0)
                    )}
                  </h3>
                  <Badge className="bg-green-100 text-green-800">
                    <span className="flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      12.5%
                    </span>
                  </Badge>
                </div>
              </div>
              <div className="p-2 bg-green-100 rounded-md">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Processing Fees</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold">
                    {loading.metrics ? (
                      <span className="animate-pulse">$0.00</span>
                    ) : (
                      formatCurrency(metrics?.totalFees || 0)
                    )}
                  </h3>
                  <Badge className="bg-red-100 text-red-800">
                    <span className="flex items-center">
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      3.0%
                    </span>
                  </Badge>
                </div>
              </div>
              <div className="p-2 bg-red-100 rounded-md">
                <CreditCard className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Net Revenue</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold">
                    {loading.metrics ? (
                      <span className="animate-pulse">$0.00</span>
                    ) : (
                      formatCurrency(metrics?.netRevenue || 0)
                    )}
                  </h3>
                </div>
              </div>
              <div className="p-2 bg-blue-100 rounded-md">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Payouts</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold">
                    {loading.metrics ? (
                      <span className="animate-pulse">$0.00</span>
                    ) : (
                      formatCurrency(metrics?.totalPayouts || 0)
                    )}
                  </h3>
                </div>
              </div>
              <div className="p-2 bg-purple-100 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-600"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Revenue breakdown by card type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <div className="flex h-full items-end gap-2">
                    {[
                      { month: "May", basic: 250, engraved: 350, premium: 500 },
                      { month: "Jun", basic: 280, engraved: 380, premium: 550 },
                      { month: "Jul", basic: 300, engraved: 400, premium: 600 },
                      { month: "Aug", basic: 320, engraved: 420, premium: 650 },
                      { month: "Sep", basic: 340, engraved: 440, premium: 700 },
                      { month: "Oct", basic: 360, engraved: 460, premium: 750 },
                    ].map((item, index) => (
                      <div key={index} className="relative flex flex-1 flex-col items-center">
                        <div className="w-full flex flex-col-reverse">
                          <div
                            className="w-full bg-gray-200 rounded-sm"
                            style={{
                              height: `${(item.basic / 360) * 33}%`,
                              minHeight: "1%",
                            }}
                          />
                          <div
                            className="w-full bg-gray-400 rounded-sm"
                            style={{
                              height: `${(item.engraved / 460) * 33}%`,
                              minHeight: "1%",
                            }}
                          />
                          <div
                            className="w-full bg-black rounded-sm"
                            style={{
                              height: `${(item.premium / 750) * 33}%`,
                              minHeight: "1%",
                            }}
                          />
                        </div>
                        <span className="mt-2 text-xs">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center mt-4 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-200 rounded-sm"></div>
                    <span className="text-xs">Basic ($25)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
                    <span className="text-xs">Engraved ($35)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-black rounded-sm"></div>
                    <span className="text-xs">Premium ($50)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Distribution by payment type</CardDescription>
              </CardHeader>
              <CardContent>
                {loading.metrics ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                          <span>Credit Card</span>
                        </div>
                        <span className="font-medium">{metrics?.paymentMethodDistribution.creditCard.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${metrics?.paymentMethodDistribution.creditCard || 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                          <span>PayPal</span>
                        </div>
                        <span className="font-medium">{metrics?.paymentMethodDistribution.paypal.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: `${metrics?.paymentMethodDistribution.paypal || 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          <span>Apple Pay</span>
                        </div>
                        <span className="font-medium">{metrics?.paymentMethodDistribution.applePay.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${metrics?.paymentMethodDistribution.applePay || 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                          <span>Google Pay</span>
                        </div>
                        <span className="font-medium">{metrics?.paymentMethodDistribution.googlePay.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${metrics?.paymentMethodDistribution.googlePay || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest financial activity</CardDescription>
              </CardHeader>
              <CardContent>
                {loading.transactions ? (
                  <div className="space-y-4 animate-pulse">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
                          <div>
                            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-32"></div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-20"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-md ${
                              transaction.type === "card_purchase" ? "bg-green-100" : "bg-blue-100"
                            }`}
                          >
                            {transaction.type === "card_purchase" ? (
                              <CreditCard
                                className={`h-5 w-5 ${
                                  transaction.type === "card_purchase" ? "text-green-600" : "text-blue-600"
                                }`}
                              />
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-blue-600"
                              >
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">
                              {transaction.type === "card_purchase"
                                ? `${transaction.customer?.name} - ${transaction.order?.items[0].name}`
                                : "Payout to Bank Account"}
                            </div>
                            <div className="text-sm text-gray-500">{formatDate(transaction.date)}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`font-medium ${
                              transaction.type === "card_purchase" ? "text-green-600" : "text-blue-600"
                            }`}
                          >
                            {transaction.type === "card_purchase"
                              ? `+${formatCurrency(transaction.amount)}`
                              : `-${formatCurrency(transaction.amount)}`}
                          </div>
                          <div className="text-sm text-gray-500">
                            {transaction.type === "card_purchase"
                              ? `Net: ${formatCurrency(transaction.net)}`
                              : transaction.destination?.bank}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("transactions")}>
                  View All Transactions
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>Payment processors and bank accounts</CardDescription>
              </CardHeader>
              <CardContent>
                {loading.paymentProcessors || loading.bankAccounts ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-20 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Payment Processors</h3>
                      <div className="space-y-3">
                        {paymentProcessors.map((processor) => (
                          <div key={processor.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                                {processor.name === "Stripe" ? (
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                      stroke="#6772E5"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M7 15L17 9"
                                      stroke="#6772E5"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                      stroke="#0070BA"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M6 12H18"
                                      stroke="#0070BA"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M12 6V18"
                                      stroke="#0070BA"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                )}
                              </div>
                              <div>
                                <div className="font-medium">{processor.name}</div>
                                <div className="text-xs text-gray-500">Fee: {processor.fee}</div>
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium mb-2">Bank Accounts</h3>
                      <div className="space-y-3">
                        {bankAccounts.map((account) => (
                          <div key={account.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3 21H21"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M3 10H21"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M5 6L12 3L19 6"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M4 10V21"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M20 10V21"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M8 14V17"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M12 14V17"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M16 14V17"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <div>
                                <div className="font-medium">{account.name}</div>
                                <div className="text-xs text-gray-500">
                                  {account.bank} - {account.accountNumber}
                                </div>
                              </div>
                            </div>
                            {account.isDefault && <Badge className="bg-blue-100 text-blue-800">Default</Badge>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("settings")}>
                  Manage Financial Accounts
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>View and manage all financial transactions</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleExportData}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading.transactions ? (
                <div className="border rounded-md p-8 flex justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="border rounded-md overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Transaction
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className={`hover:bg-gray-50 cursor-pointer ${selectedTransaction === transaction.id ? "bg-gray-50" : ""}`}
                          onClick={() => setSelectedTransaction(transaction.id)}
                        >
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div
                                className={`flex-shrink-0 h-10 w-10 rounded-md ${
                                  transaction.type === "card_purchase" ? "bg-green-100" : "bg-blue-100"
                                } flex items-center justify-center`}
                              >
                                {transaction.type === "card_purchase" ? (
                                  <CreditCard
                                    className={`h-5 w-5 ${
                                      transaction.type === "card_purchase" ? "text-green-600" : "text-blue-600"
                                    }`}
                                  />
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-blue-600"
                                  >
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                  </svg>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                                <div className="text-sm text-gray-500">
                                  {transaction.type === "card_purchase"
                                    ? `${transaction.order?.items[0].name}`
                                    : "Payout to Bank Account"}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {transaction.type === "card_purchase" ? transaction.customer?.name : "-"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {transaction.type === "card_purchase"
                                ? transaction.customer?.email
                                : transaction.destination?.bank}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatDate(transaction.date)}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div
                              className={`text-sm font-medium ${
                                transaction.type === "card_purchase" ? "text-green-600" : "text-blue-600"
                              }`}
                            >
                              {transaction.type === "card_purchase"
                                ? `+${formatCurrency(transaction.amount)}`
                                : `-${formatCurrency(transaction.amount)}`}
                            </div>
                            {transaction.type === "card_purchase" && (
                              <div className="text-xs text-gray-500">Net: {formatCurrency(transaction.net)}</div>
                            )}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <Badge
                              className={
                                transaction.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-500">
                Showing {transactions.length} of {totalTransactions} transactions
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={transactions.length < 10}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Payouts Tab */}
        <TabsContent value="payouts">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Payout History</CardTitle>
                      <CardDescription>View all transfers to your bank account</CardDescription>
                    </div>
                    <Button onClick={handleInitiatePayout}>Initiate Payout</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {loading.transactions ? (
                    <div className="space-y-4 animate-pulse">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="border rounded-md p-4">
                          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {transactions
                        .filter((t) => t.type === "payout")
                        .map((payout) => (
                          <div key={payout.id} className="border rounded-md p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-100 rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-blue-600"
                                >
                                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                              </div>
                              <div>
                                <div className="font-medium">Payout to {payout.destination?.bank}</div>
                                <div className="text-sm text-gray-500">{formatDate(payout.date)}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-blue-600">-{formatCurrency(payout.amount)}</div>
                              <div className="text-sm text-gray-500">{payout.status}</div>
                            </div>
                          </div>
                        ))}

                      {transactions.filter((t) => t.type === "payout").length === 0 && (
                        <div className="text-center py-8 text-gray-500">No payout history found</div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Payout Settings</CardTitle>
                  <CardDescription>Manage your payout preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="payoutSchedule">Payout Schedule</Label>
                    <select
                      id="payoutSchedule"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      defaultValue="weekly"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="manual">Manual</option>
                    </select>
                    <p className="text-xs text-gray-500">
                      Funds will be automatically transferred to your bank account on this schedule.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minimumPayout">Minimum Payout Amount</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                      <Input
                        id="minimumPayout"
                        className="pl-7"
                        defaultValue="100.00"
                        value={payoutAmount}
                        onChange={(e) => setPayoutAmount(Number.parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      Payouts will only be initiated when your balance exceeds this amount.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="defaultAccount">Default Payout Account</Label>
                    <select
                      id="defaultAccount"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      defaultValue={bankAccounts.find((a) => a.isDefault)?.id}
                    >
                      {bankAccounts.map((account) => (
                        <option key={account.id} value={account.id}>
                          {account.name} ({account.bank} {account.accountNumber})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full">Save Payout Settings</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Processors</CardTitle>
                  <CardDescription>Manage your payment processing integrations</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading.paymentProcessors ? (
                    <div className="space-y-6 animate-pulse">
                      {[1, 2].map((i) => (
                        <div key={i} className="border rounded-md p-4">
                          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="h-12 bg-gray-200 rounded"></div>
                            <div className="h-12 bg-gray-200 rounded"></div>
                            <div className="h-12 bg-gray-200 rounded"></div>
                          </div>
                          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {paymentProcessors.map((processor) => (
                        <div key={processor.id} className="border rounded-md p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                                {processor.name === "Stripe" ? (
                                  <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                      stroke="#6772E5"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M7 15L17 9"
                                      stroke="#6772E5"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                      stroke="#0070BA"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M6 12H18"
                                      stroke="#0070BA"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M12 6V18"
                                      stroke="#0070BA"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                )}
                              </div>
                              <div>
                                <div className="font-medium text-lg">{processor.name}</div>
                                <div className="text-sm text-gray-500">Connected since June 2023</div>
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="bg-gray-50 p-3 rounded-md">
                              <div className="text-sm text-gray-500">Current Balance</div>
                              <div className="font-medium">{formatCurrency(processor.balance)}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-md">
                              <div className="text-sm text-gray-500">Processing Fee</div>
                              <div className="font-medium">{processor.fee}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-md">
                              <div className="text-sm text-gray-500">Payout Schedule</div>
                              <div className="font-medium">{processor.payoutSchedule}</div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href="#" target="_blank">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Dashboard
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm">
                              Settings
                            </Button>
                          </div>
                        </div>
                      ))}

                      <div className="border border-dashed rounded-md p-4 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-400"
                          >
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </div>
                        <h3 className="font-medium">Add Payment Processor</h3>
                        <p className="text-sm text-gray-500 mb-3">Connect another payment processor</p>
                        <Button>Add Processor</Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Bank Accounts</CardTitle>
                  <CardDescription>Manage your connected bank accounts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loading.bankAccounts ? (
                    <div className="space-y-4 animate-pulse">
                      {[1, 2].map((i) => (
                        <div key={i} className="border rounded-md p-4">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      {bankAccounts.map((account) => (
                        <div key={account.id} className="border rounded-md p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3 21H21"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M3 10H21"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M5 6L12 3L19 6"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M4 10V21"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M20 10V21"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M8 14V17"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M12 14V17"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M16 14V17"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <div>
                                <div className="font-medium">{account.name}</div>
                                <div className="text-sm text-gray-500">
                                  {account.bank} - {account.accountNumber}
                                </div>
                              </div>
                            </div>
                            {account.isDefault && <Badge className="bg-blue-100 text-blue-800">Default</Badge>}
                          </div>
                          <div className="text-sm mb-3">
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-500">Account Type:</span>
                              <span>{account.type}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Current Balance:</span>
                              <span className="font-medium">{formatCurrency(account.balance)}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            {!account.isDefault && (
                              <Button variant="outline" size="sm">
                                Set as Default
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}

                      <div className="border border-dashed rounded-md p-4 flex flex-col items-center justify-center text-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-400"
                          >
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </div>
                        <h3 className="font-medium">Add Bank Account</h3>
                        <p className="text-sm text-gray-500 mb-3">Connect a new bank account</p>
                        <Button size="sm">Add Account</Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function FinancesPage() {
  return (
    <DashboardLayout>
      <FinancialProvider>
        <FinancialDashboard />
      </FinancialProvider>
    </DashboardLayout>
  )
}
