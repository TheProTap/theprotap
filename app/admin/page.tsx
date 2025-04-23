"use client"

import { useState } from "react"
import { Users, CreditCard, Settings, Package, AlertTriangle, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import DashboardLayout from "@/components/admin-layout"

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-500">Manage users, cards, and system settings</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/admin/settings">
                <Settings className="h-4 w-4 mr-2" />
                System Settings
              </Link>
            </Button>
            <Button asChild>
              <Link href="/admin/users/new">
                <Users className="h-4 w-4 mr-2" />
                Add New User
              </Link>
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Users</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold">1,248</h3>
                    <Badge className="bg-green-100 text-green-800">
                      <span className="flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        12.5%
                      </span>
                    </Badge>
                  </div>
                </div>
                <div className="p-2 bg-blue-100 rounded-md">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Cards</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold">876</h3>
                    <Badge className="bg-green-100 text-green-800">
                      <span className="flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        8.3%
                      </span>
                    </Badge>
                  </div>
                </div>
                <div className="p-2 bg-green-100 rounded-md">
                  <CreditCard className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pending Orders</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold">42</h3>
                  </div>
                </div>
                <div className="p-2 bg-orange-100 rounded-md">
                  <Package className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">System Alerts</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold">3</h3>
                  </div>
                </div>
                <div className="p-2 bg-red-100 rounded-md">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent User Registrations</CardTitle>
                  <CardDescription>New users in the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: 1, name: "Jamie Smith", email: "jamie@example.com", date: "2 hours ago", plan: "Premium" },
                      { id: 2, name: "Taylor Reed", email: "taylor@example.com", date: "Yesterday", plan: "Basic" },
                      { id: 3, name: "Casey Jones", email: "casey@example.com", date: "2 days ago", plan: "Engraved" },
                      { id: 4, name: "Morgan Chen", email: "morgan@example.com", date: "3 days ago", plan: "Premium" },
                      { id: 5, name: "Alex Rivera", email: "alex@example.com", date: "5 days ago", plan: "Basic" },
                    ].map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={
                              user.plan === "Premium" ? "default" : user.plan === "Engraved" ? "secondary" : "outline"
                            }
                          >
                            {user.plan}
                          </Badge>
                          <div className="text-xs text-gray-400">{user.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/admin/users">View All Users</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest card orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        id: "ORD-1234",
                        user: "Jamie Smith",
                        type: "Premium Metal Card",
                        status: "Processing",
                        date: "2 hours ago",
                      },
                      {
                        id: "ORD-1233",
                        user: "Taylor Reed",
                        type: "Basic Plastic Card",
                        status: "Shipped",
                        date: "Yesterday",
                      },
                      {
                        id: "ORD-1232",
                        user: "Casey Jones",
                        type: "Engraved Plastic Card",
                        status: "Delivered",
                        date: "2 days ago",
                      },
                      {
                        id: "ORD-1231",
                        user: "Morgan Chen",
                        type: "Premium Metal Card",
                        status: "Processing",
                        date: "3 days ago",
                      },
                      {
                        id: "ORD-1230",
                        user: "Alex Rivera",
                        type: "Basic Plastic Card",
                        status: "Shipped",
                        date: "5 days ago",
                      },
                    ].map((order) => (
                      <div key={order.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{order.id}</div>
                          <div className="text-sm text-gray-500">{order.user}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={
                              order.status === "Processing"
                                ? "outline"
                                : order.status === "Shipped"
                                  ? "secondary"
                                  : "default"
                            }
                          >
                            {order.status}
                          </Badge>
                          <div className="text-xs text-gray-400">{order.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/admin/orders">View All Orders</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>Current system performance and alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="text-sm font-medium text-gray-500 mb-1">Server Load</div>
                        <div className="text-2xl font-bold">24%</div>
                        <div className="text-xs text-green-600 mt-1">Normal</div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="text-sm font-medium text-gray-500 mb-1">API Response Time</div>
                        <div className="text-2xl font-bold">128ms</div>
                        <div className="text-xs text-green-600 mt-1">Normal</div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="text-sm font-medium text-gray-500 mb-1">Database Status</div>
                        <div className="text-2xl font-bold">Healthy</div>
                        <div className="text-xs text-green-600 mt-1">All systems operational</div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-2">Active Alerts</h3>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3 p-3 bg-red-50 rounded-md">
                          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                          <div>
                            <div className="font-medium">Payment Gateway Connection Issue</div>
                            <div className="text-sm text-gray-600">
                              Intermittent connection issues with payment processor. Some transactions may be delayed.
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Detected 2 hours ago</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-md">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                          <div>
                            <div className="font-medium">Card Inventory Low</div>
                            <div className="text-sm text-gray-600">
                              Premium metal card inventory is running low. Consider ordering more stock.
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Detected 1 day ago</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-md">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                          <div>
                            <div className="font-medium">Database Backup Delayed</div>
                            <div className="text-sm text-gray-600">
                              Last scheduled database backup was delayed. Investigating cause.
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Detected 6 hours ago</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/admin/system">View System Status</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage user accounts and permissions</CardDescription>
                  </div>
                  <Button asChild>
                    <Link href="/admin/users/new">Add New User</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Plan
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        {
                          id: 1,
                          name: "Jamie Smith",
                          email: "jamie@example.com",
                          plan: "Premium",
                          status: "Active",
                          joined: "May 15, 2023",
                        },
                        {
                          id: 2,
                          name: "Taylor Reed",
                          email: "taylor@example.com",
                          plan: "Basic",
                          status: "Active",
                          joined: "Jun 3, 2023",
                        },
                        {
                          id: 3,
                          name: "Casey Jones",
                          email: "casey@example.com",
                          plan: "Engraved",
                          status: "Active",
                          joined: "Jul 12, 2023",
                        },
                        {
                          id: 4,
                          name: "Morgan Chen",
                          email: "morgan@example.com",
                          plan: "Premium",
                          status: "Inactive",
                          joined: "Aug 5, 2023",
                        },
                        {
                          id: 5,
                          name: "Alex Rivera",
                          email: "alex@example.com",
                          plan: "Basic",
                          status: "Active",
                          joined: "Sep 20, 2023",
                        },
                      ].map((user) => (
                        <tr key={user.id}>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                                {user.name.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <Badge
                              variant={
                                user.plan === "Premium" ? "default" : user.plan === "Engraved" ? "secondary" : "outline"
                              }
                            >
                              {user.plan}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/users/${user.id}`}>Edit</Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">Showing 5 of 1,248 users</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Order Management</CardTitle>
                    <CardDescription>Track and manage card orders</CardDescription>
                  </div>
                  <Button asChild>
                    <Link href="/admin/orders/new">Create Order</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        {
                          id: "ORD-1234",
                          customer: "Jamie Smith",
                          product: "Premium Metal Card",
                          status: "Processing",
                          date: "Oct 15, 2023",
                        },
                        {
                          id: "ORD-1233",
                          customer: "Taylor Reed",
                          product: "Basic Plastic Card",
                          status: "Shipped",
                          date: "Oct 14, 2023",
                        },
                        {
                          id: "ORD-1232",
                          customer: "Casey Jones",
                          product: "Engraved Plastic Card",
                          status: "Delivered",
                          date: "Oct 12, 2023",
                        },
                        {
                          id: "ORD-1231",
                          customer: "Morgan Chen",
                          product: "Premium Metal Card",
                          status: "Processing",
                          date: "Oct 10, 2023",
                        },
                        {
                          id: "ORD-1230",
                          customer: "Alex Rivera",
                          product: "Basic Plastic Card",
                          status: "Shipped",
                          date: "Oct 8, 2023",
                        },
                      ].map((order) => (
                        <tr key={order.id}>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{order.id}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{order.customer}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{order.product}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <Badge
                              variant={
                                order.status === "Processing"
                                  ? "outline"
                                  : order.status === "Shipped"
                                    ? "secondary"
                                    : "default"
                              }
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/orders/${order.id}`}>View</Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">Showing 5 of 156 orders</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>New user registrations over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <div className="flex h-full items-end gap-2">
                      {[
                        { month: "Jan", count: 45 },
                        { month: "Feb", count: 62 },
                        { month: "Mar", count: 78 },
                        { month: "Apr", count: 95 },
                        { month: "May", count: 110 },
                        { month: "Jun", count: 135 },
                        { month: "Jul", count: 158 },
                        { month: "Aug", count: 172 },
                        { month: "Sep", count: 190 },
                        { month: "Oct", count: 210 },
                        { month: "Nov", count: 235 },
                        { month: "Dec", count: 248 },
                      ].map((item, index) => (
                        <div key={index} className="relative flex flex-1 flex-col items-center">
                          <div
                            className="w-full bg-blue-100 rounded-sm"
                            style={{
                              height: `${(item.count / 248) * 100}%`,
                              minHeight: "1%",
                            }}
                          >
                            <div className="absolute bottom-full w-full text-center mb-1">
                              <span className="text-xs font-medium">{item.count}</span>
                            </div>
                          </div>
                          <span className="mt-2 text-xs">{item.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Card Orders</CardTitle>
                  <CardDescription>Card orders by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <div className="flex h-full items-end gap-2">
                      {[
                        { month: "Jan", basic: 15, engraved: 8, premium: 5 },
                        { month: "Feb", basic: 18, engraved: 10, premium: 7 },
                        { month: "Mar", basic: 20, engraved: 12, premium: 8 },
                        { month: "Apr", basic: 22, engraved: 15, premium: 10 },
                        { month: "May", basic: 25, engraved: 18, premium: 12 },
                        { month: "Jun", basic: 28, engraved: 20, premium: 15 },
                        { month: "Jul", basic: 30, engraved: 22, premium: 18 },
                        { month: "Aug", basic: 32, engraved: 25, premium: 20 },
                        { month: "Sep", basic: 35, engraved: 28, premium: 22 },
                        { month: "Oct", basic: 38, engraved: 30, premium: 25 },
                        { month: "Nov", basic: 40, engraved: 32, premium: 28 },
                        { month: "Dec", basic: 42, engraved: 35, premium: 30 },
                      ].map((item, index) => (
                        <div key={index} className="relative flex flex-1 flex-col items-center">
                          <div className="w-full flex flex-col-reverse">
                            <div
                              className="w-full bg-gray-200 rounded-sm"
                              style={{
                                height: `${(item.basic / 42) * 33}%`,
                                minHeight: "1%",
                              }}
                            />
                            <div
                              className="w-full bg-gray-400 rounded-sm"
                              style={{
                                height: `${(item.engraved / 35) * 33}%`,
                                minHeight: "1%",
                              }}
                            />
                            <div
                              className="w-full bg-black rounded-sm"
                              style={{
                                height: `${(item.premium / 30) * 33}%`,
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
                      <span className="text-xs">Basic</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
                      <span className="text-xs">Engraved</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-black rounded-sm"></div>
                      <span className="text-xs">Premium</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="text-sm font-medium text-gray-500 mb-1">Total Revenue</div>
                      <div className="text-2xl font-bold">$48,250</div>
                      <div className="text-xs text-green-600 mt-1">+12.5% from last month</div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="text-sm font-medium text-gray-500 mb-1">Average Order Value</div>
                      <div className="text-2xl font-bold">$36.75</div>
                      <div className="text-xs text-green-600 mt-1">+3.2% from last month</div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="text-sm font-medium text-gray-500 mb-1">Conversion Rate</div>
                      <div className="text-2xl font-bold">4.8%</div>
                      <div className="text-xs text-green-600 mt-1">+0.5% from last month</div>
                    </div>
                  </div>

                  <div className="h-[300px] w-full">
                    <div className="flex h-full items-end gap-2">
                      {[
                        { month: "Jan", revenue: 2800 },
                        { month: "Feb", revenue: 3200 },
                        { month: "Mar", revenue: 3600 },
                        { month: "Apr", revenue: 3900 },
                        { month: "May", revenue: 4200 },
                        { month: "Jun", revenue: 4500 },
                        { month: "Jul", revenue: 4800 },
                        { month: "Aug", revenue: 5100 },
                        { month: "Sep", revenue: 5400 },
                        { month: "Oct", revenue: 5700 },
                        { month: "Nov", revenue: 6000 },
                        { month: "Dec", revenue: 6250 },
                      ].map((item, index) => (
                        <div key={index} className="relative flex flex-1 flex-col items-center">
                          <div
                            className="w-full bg-green-100 rounded-sm"
                            style={{
                              height: `${(item.revenue / 6250) * 100}%`,
                              minHeight: "1%",
                            }}
                          >
                            <div className="absolute bottom-full w-full text-center mb-1">
                              <span className="text-xs font-medium">${item.revenue}</span>
                            </div>
                          </div>
                          <span className="mt-2 text-xs">{item.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
