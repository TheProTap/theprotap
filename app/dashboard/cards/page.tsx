"use client"

import { useState } from "react"
import { Plus, QrCode, Smartphone, MoreHorizontal, RefreshCw, Power, PowerOff, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DashboardLayout from "@/components/dashboard-layout"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CardsPage() {
  const [isLinkCardDialogOpen, setIsLinkCardDialogOpen] = useState(false)
  const [cardCode, setCardCode] = useState("")
  const [isLinking, setIsLinking] = useState(false)

  const handleLinkCard = () => {
    setIsLinking(true)
    // Simulate API call
    setTimeout(() => {
      setIsLinking(false)
      setIsLinkCardDialogOpen(false)
      setCardCode("")
      // Here you would typically update the UI to show the newly linked card
    }, 1500)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Your NFC Cards</h1>
            <p className="text-gray-500">Manage your physical NFC business cards</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isLinkCardDialogOpen} onOpenChange={setIsLinkCardDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Link Existing Card
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Link a Physical Card</DialogTitle>
                  <DialogDescription>
                    Enter the unique code printed on your NFC card to link it to your profile.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="card-code" className="mb-2 block">
                    Card Code
                  </Label>
                  <Input
                    id="card-code"
                    placeholder="e.g. PT-12345-ABC"
                    value={cardCode}
                    onChange={(e) => setCardCode(e.target.value)}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    The code can be found on the back of your card or on the packaging.
                  </p>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsLinkCardDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleLinkCard} disabled={!cardCode || isLinking}>
                    {isLinking ? "Linking..." : "Link Card"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Order New Card
            </Button>
          </div>
        </div>

        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active Cards</TabsTrigger>
            <TabsTrigger value="inactive">Inactive Cards</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Premium Metal Card */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Premium Metal Card</CardTitle>
                      <CardDescription>Linked on May 15, 2023</CardDescription>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-10 bg-black rounded-md flex items-center justify-center text-white text-xs">
                      PRO TAP
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Card ID</div>
                      <div className="font-medium">PT-12345-ABC</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold">42</div>
                      <div className="text-sm text-gray-500">Card taps</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold">18</div>
                      <div className="text-sm text-gray-500">Contacts saved</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <QrCode className="mr-2 h-4 w-4" />
                    View QR
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Card Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reset Analytics
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <PowerOff className="mr-2 h-4 w-4" />
                        Deactivate Card
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Card
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>

              {/* Basic Plastic Card */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Basic Plastic Card</CardTitle>
                      <CardDescription>Linked on June 3, 2023</CardDescription>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-10 bg-white border rounded-md flex items-center justify-center text-black text-xs">
                      PRO TAP
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Card ID</div>
                      <div className="font-medium">PT-67890-XYZ</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold">15</div>
                      <div className="text-sm text-gray-500">Card taps</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold">7</div>
                      <div className="text-sm text-gray-500">Contacts saved</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <QrCode className="mr-2 h-4 w-4" />
                    View QR
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Card Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reset Analytics
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <PowerOff className="mr-2 h-4 w-4" />
                        Deactivate Card
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Card
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>

              {/* Add New Card */}
              <Card className="border-dashed">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[250px]">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Add a New Card</h3>
                  <p className="text-gray-500 text-center mb-4">Order a new NFC card or link an existing one</p>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsLinkCardDialogOpen(true)}>
                      Link Card
                    </Button>
                    <Button>Order New</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="inactive" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Inactive Card */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Engraved Plastic Card</CardTitle>
                      <CardDescription>Deactivated on July 10, 2023</CardDescription>
                    </div>
                    <Badge variant="outline">Inactive</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-xs">
                      PRO TAP
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Card ID</div>
                      <div className="font-medium">PT-24680-DEF</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold">23</div>
                      <div className="text-sm text-gray-500">Card taps</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold">11</div>
                      <div className="text-sm text-gray-500">Contacts saved</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Power className="mr-2 h-4 w-4" />
                    Reactivate
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Card Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Power className="mr-2 h-4 w-4" />
                        Reactivate Card
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Card
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Card Information Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">How to Link Your Physical Card</h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold">1</span>
                </div>
                <h3 className="font-medium mb-2">Find Your Card Code</h3>
                <p className="text-sm text-gray-600">
                  Locate the unique code printed on the back of your NFC card or on the packaging.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold">2</span>
                </div>
                <h3 className="font-medium mb-2">Enter the Code</h3>
                <p className="text-sm text-gray-600">
                  Click "Link Existing Card" and enter your unique card code in the dialog.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold">3</span>
                </div>
                <h3 className="font-medium mb-2">Start Using Your Card</h3>
                <p className="text-sm text-gray-600">
                  Once linked, your physical card will direct people to your digital profile when tapped.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
