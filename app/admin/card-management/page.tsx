"use client"

import { useState } from "react"
import { Smartphone, Upload, Download, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DashboardLayout from "@/components/dashboard-layout"

export default function CardManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data for card inventory
  const cardInventory = [
    { id: "PT-12345-ABC", type: "Premium Metal", status: "Unassigned", dateAdded: "2023-05-10" },
    {
      id: "PT-67890-XYZ",
      type: "Basic Plastic",
      status: "Assigned",
      dateAdded: "2023-06-15",
      assignedTo: "alex@example.com",
    },
    { id: "PT-24680-DEF", type: "Engraved Plastic", status: "Unassigned", dateAdded: "2023-07-20" },
    {
      id: "PT-13579-GHI",
      type: "Premium Metal",
      status: "Assigned",
      dateAdded: "2023-08-05",
      assignedTo: "jamie@example.com",
    },
    { id: "PT-97531-JKL", type: "Basic Plastic", status: "Unassigned", dateAdded: "2023-09-12" },
  ]

  const filteredCards = cardInventory.filter(
    (card) =>
      card.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (card.assignedTo && card.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Card Management</h1>
            <p className="text-gray-500">Manage NFC card inventory and assignments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import Cards
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Cards
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Cards</CardTitle>
              <CardDescription>All cards in inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">125</div>
              <div className="text-sm text-gray-500 mt-1">+12 this month</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Assigned Cards</CardTitle>
              <CardDescription>Cards linked to profiles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">87</div>
              <div className="text-sm text-gray-500 mt-1">69.6% of total</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Available Cards</CardTitle>
              <CardDescription>Cards ready to be assigned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">38</div>
              <div className="text-sm text-gray-500 mt-1">30.4% of total</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="inventory">
          <TabsList>
            <TabsTrigger value="inventory">Card Inventory</TabsTrigger>
            <TabsTrigger value="programming">Card Programming</TabsTrigger>
            <TabsTrigger value="technical">Technical Documentation</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Card Inventory</CardTitle>
                    <CardDescription>Manage your NFC card inventory</CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search cards..."
                      className="pl-10 w-full md:w-[300px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Card ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCards.map((card) => (
                      <TableRow key={card.id}>
                        <TableCell className="font-medium">{card.id}</TableCell>
                        <TableCell>{card.type}</TableCell>
                        <TableCell>
                          <Badge variant={card.status === "Assigned" ? "outline" : "secondary"}>{card.status}</Badge>
                        </TableCell>
                        <TableCell>{card.dateAdded}</TableCell>
                        <TableCell>{card.assignedTo || "-"}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="programming" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Card Programming</CardTitle>
                <CardDescription>Program and configure NFC cards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Batch Programming</h3>
                      <p className="text-gray-600 mb-4">
                        Upload a CSV file with card IDs and URLs to program multiple cards at once.
                      </p>
                      <div className="space-y-4">
                        <div className="border-2 border-dashed rounded-md p-6 text-center">
                          <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">
                            Drag and drop a CSV file, or <span className="text-primary">browse</span>
                          </p>
                        </div>
                        <Button className="w-full">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload and Program
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Single Card Programming</h3>
                      <p className="text-gray-600 mb-4">
                        Program an individual NFC card with a specific URL or identifier.
                      </p>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-id">Card ID</Label>
                          <Input id="card-id" placeholder="e.g. PT-12345-ABC" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="card-url">Card URL or Identifier</Label>
                          <Input id="card-url" placeholder="e.g. https://theprotap.com/profile/12345" />
                        </div>
                        <Button className="w-full">
                          <Smartphone className="mr-2 h-4 w-4" />
                          Program Card
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Programming History</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Card ID</TableHead>
                          <TableHead>Programmed By</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>2023-09-15</TableCell>
                          <TableCell>PT-12345-ABC</TableCell>
                          <TableCell>admin@theprotap.com</TableCell>
                          <TableCell>
                            <Badge variant="secondary">Success</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2023-09-10</TableCell>
                          <TableCell>PT-67890-XYZ</TableCell>
                          <TableCell>admin@theprotap.com</TableCell>
                          <TableCell>
                            <Badge variant="secondary">Success</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Technical Documentation</CardTitle>
                <CardDescription>Technical details about NFC card linking and programming</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-semibold mb-2">NFC Card Technical Specifications</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <ul className="space-y-2">
                        <li>
                          <strong>NFC Type:</strong> NTAG216
                        </li>
                        <li>
                          <strong>Memory:</strong> 888 bytes
                        </li>
                        <li>
                          <strong>Frequency:</strong> 13.56 MHz
                        </li>
                        <li>
                          <strong>Protocol:</strong> ISO/IEC 14443A
                        </li>
                        <li>
                          <strong>Read Range:</strong> Up to 5cm
                        </li>
                        <li>
                          <strong>Data Retention:</strong> 10 years
                        </li>
                        <li>
                          <strong>Write Endurance:</strong> 100,000 cycles
                        </li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-2">Card Programming Process</h3>
                    <p className="text-gray-600 mb-4">
                      Each THE PRO TAP card goes through the following programming process:
                    </p>
                    <ol className="space-y-4">
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-sm font-medium">1</span>
                        </div>
                        <div>
                          <p className="font-medium">Card Manufacturing</p>
                          <p className="text-gray-600">
                            Cards are manufactured with embedded NFC chips. Each chip has a unique hardware ID.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-sm font-medium">2</span>
                        </div>
                        <div>
                          <p className="font-medium">Initial Programming</p>
                          <p className="text-gray-600">
                            During production, each card is programmed with a unique identifier (PT-XXXXX-XXX) and a URL
                            that points to our card activation system.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-sm font-medium">3</span>
                        </div>
                        <div>
                          <p className="font-medium">QR Code Generation</p>
                          <p className="text-gray-600">
                            A QR code containing the same URL is generated and printed on the back of the card as a
                            fallback for devices without NFC capabilities.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-sm font-medium">4</span>
                        </div>
                        <div>
                          <p className="font-medium">Database Registration</p>
                          <p className="text-gray-600">
                            Each card's unique identifier is registered in our database as "unassigned" and ready for
                            user activation.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-sm font-medium">5</span>
                        </div>
                        <div>
                          <p className="font-medium">User Activation</p>
                          <p className="text-gray-600">
                            When a user links a card to their profile, our system updates the database to associate that
                            card's unique identifier with the user's profile ID.
                          </p>
                        </div>
                      </li>
                    </ol>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-2">Card Linking System Architecture</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-gray-600 mb-4">
                        The THE PRO TAP card linking system uses a redirect-based architecture:
                      </p>
                      <ol className="space-y-2">
                        <li>
                          <strong>1. NFC Tap:</strong> When a card is tapped, the phone reads the URL from the NFC chip
                          (e.g., https://tap.theprotap.com/c/PT-12345-ABC)
                        </li>
                        <li>
                          <strong>2. Server Request:</strong> The phone's browser sends a request to our server with the
                          card's unique identifier
                        </li>
                        <li>
                          <strong>3. Database Lookup:</strong> Our server looks up the card ID in the database to find
                          the associated user profile
                        </li>
                        <li>
                          <strong>4. Redirect:</strong> The server redirects the browser to the user's profile page
                        </li>
                        <li>
                          <strong>5. Analytics:</strong> The tap is recorded in our analytics system for the card owner
                          to view
                        </li>
                      </ol>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-2">Security Considerations</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-sm font-medium">1</span>
                        </div>
                        <div>
                          <p className="font-medium">Card Authentication</p>
                          <p className="text-gray-600">
                            Each card has a unique identifier that cannot be easily duplicated. The system verifies that
                            the card ID exists in our database before processing any requests.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-sm font-medium">2</span>
                        </div>
                        <div>
                          <p className="font-medium">Deactivation System</p>
                          <p className="text-gray-600">
                            Users can deactivate their cards at any time through their dashboard. Deactivated cards will
                            no longer redirect to the user's profile.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-sm font-medium">3</span>
                        </div>
                        <div>
                          <p className="font-medium">Rate Limiting</p>
                          <p className="text-gray-600">
                            The system implements rate limiting to prevent abuse and protect against brute force attacks
                            attempting to guess valid card IDs.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-sm font-medium">4</span>
                        </div>
                        <div>
                          <p className="font-medium">Data Encryption</p>
                          <p className="text-gray-600">
                            All data is encrypted both in transit (HTTPS) and at rest in our database.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Technical Documentation
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
