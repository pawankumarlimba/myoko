"use client"

import { useState } from "react"
import Image from "next/image"
import {
  User,
  Package,
  Heart,
  CreditCard,
  Bell,
  Settings,
  Clock,
  CheckCircle,
  Truck,
  HelpCircle,
  Edit,
  LogOut,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample user data
const userData = {
  name: "Ananya Sharma",
  email: "ananya.sharma@example.com",
  avatar: "/placeholder.svg?height=100&width=100",
  joinedDate: "January 2025",
  orders: [
    {
      id: "ORD-001",
      date: "Mar 15, 2025",
      items: [
        {
          name: "Golden Muga Silk Mekhela Chador with Traditional Motifs",
          price: 15000,
          quantity: 1,
          image: "/placeholder.svg?height=60&width=60",
          artisan: "Lakshmi Devi",
        },
      ],
      total: 15000,
      status: "Processing",
      estimatedDelivery: "Mar 25-28, 2025",
    },
    {
      id: "ORD-002",
      date: "Mar 5, 2025",
      items: [
        {
          name: "Longpi Black Pottery Serving Bowl Set",
          price: 3800,
          quantity: 1,
          image: "/placeholder.svg?height=60&width=60",
          artisan: "Thangi Muivah",
        },
        {
          name: "Traditional Longpi Cooking Pot",
          price: 2500,
          quantity: 1,
          image: "/placeholder.svg?height=60&width=60",
          artisan: "Thangi Muivah",
        },
      ],
      total: 6300,
      status: "Shipped",
      estimatedDelivery: "Mar 18-20, 2025",
      trackingNumber: "IND123456789",
    },
    {
      id: "ORD-003",
      date: "Feb 20, 2025",
      items: [
        {
          name: "Bamboo and Cane Room Divider",
          price: 12000,
          quantity: 1,
          image: "/placeholder.svg?height=60&width=60",
          artisan: "Mohan Rabha",
        },
      ],
      total: 12000,
      status: "Delivered",
      deliveryDate: "Mar 1, 2025",
    },
  ],
  wishlist: [
    {
      id: "p10",
      name: "Hand-carved Mahakala Wooden Mask",
      price: 18500,
      image: "/placeholder.svg?height=80&width=80",
      artisan: "Tashi Wangchuk",
      inStock: true,
    },
    {
      id: "p14",
      name: "Naturally Dyed Table Runner with Naga Patterns",
      price: 3200,
      image: "/placeholder.svg?height=80&width=80",
      artisan: "Rengma Jamir",
      inStock: true,
    },
    {
      id: "p9",
      name: "Longpi Tea Set with Bamboo Tray",
      price: 5500,
      image: "/placeholder.svg?height=80&width=80",
      artisan: "Thangi Muivah",
      inStock: false,
    },
  ],
  paymentMethods: [
    {
      id: "card1",
      type: "Credit Card",
      name: "HDFC Bank",
      number: "•••• •••• •••• 4567",
      expiry: "09/27",
      isDefault: true,
    },
    {
      id: "card2",
      type: "Debit Card",
      name: "SBI Bank",
      number: "•••• •••• •••• 8901",
      expiry: "12/26",
      isDefault: false,
    },
  ],
  addresses: [
    {
      id: "addr1",
      type: "Home",
      name: "Ananya Sharma",
      line1: "42 Lakeside Apartments",
      line2: "MG Road",
      city: "Guwahati",
      state: "Assam",
      pincode: "781005",
      phone: "+91 98765 43210",
      isDefault: true,
    },
    {
      id: "addr2",
      type: "Office",
      name: "Ananya Sharma",
      line1: "Tech Hub, 3rd Floor",
      line2: "Beltola",
      city: "Guwahati",
      state: "Assam",
      pincode: "781028",
      phone: "+91 98765 43210",
      isDefault: false,
    },
  ],
  notifications: {
    orderUpdates: true,
    promotions: true,
    artisanStories: true,
    newsletter: false,
  },
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("orders")

  return (
    <div className="container mx-auto px-4 py-8">
      {/* User Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <Avatar className="h-20 w-20 border-4 border-primary/10">
          <AvatarImage src={userData.avatar} alt={userData.name} />
          <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{userData.name}</h1>
              <p className="text-muted-foreground">
                {userData.email} • Member since {userData.joinedDate}
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="h-4 w-4 mr-2" />
                    Notification Preferences
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main Account Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                <button
                  className={`flex items-center gap-3 p-4 text-left hover:bg-muted/50 transition-colors ${activeTab === "orders" ? "bg-muted font-medium" : ""}`}
                  onClick={() => setActiveTab("orders")}
                >
                  <Package className="h-5 w-5" />
                  <span>Orders & Tracking</span>
                </button>
                <Separator />
                <button
                  className={`flex items-center gap-3 p-4 text-left hover:bg-muted/50 transition-colors ${activeTab === "wishlist" ? "bg-muted font-medium" : ""}`}
                  onClick={() => setActiveTab("wishlist")}
                >
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                </button>
                <Separator />
                <button
                  className={`flex items-center gap-3 p-4 text-left hover:bg-muted/50 transition-colors ${activeTab === "payment" ? "bg-muted font-medium" : ""}`}
                  onClick={() => setActiveTab("payment")}
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Methods</span>
                </button>
                <Separator />
                <button
                  className={`flex items-center gap-3 p-4 text-left hover:bg-muted/50 transition-colors ${activeTab === "addresses" ? "bg-muted font-medium" : ""}`}
                  onClick={() => setActiveTab("addresses")}
                >
                  <Truck className="h-5 w-5" />
                  <span>Addresses</span>
                </button>
                <Separator />
                <button
                  className={`flex items-center gap-3 p-4 text-left hover:bg-muted/50 transition-colors ${activeTab === "notifications" ? "bg-muted font-medium" : ""}`}
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </button>
              </nav>
            </CardContent>
          </Card>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg border">
            <div className="flex items-start gap-3">
              <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="text-sm font-medium">Need Help?</h3>
                <p className="text-xs text-muted-foreground mt-1 mb-3">
                  Our support team is available to assist you with any questions about your orders or account.
                </p>
                <Button variant="link" className="p-0 h-auto text-xs text-primary">
                  Contact Customer Support
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3">
          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">Your Orders</h2>
                <p className="text-sm text-muted-foreground">Track, manage, and review your purchases</p>
              </div>

              {userData.orders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/30 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-base">Order #{order.id}</CardTitle>
                        <CardDescription>Placed on {order.date}</CardDescription>
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
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="p-4 border-b">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex gap-4 py-2">
                          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-medium line-clamp-1">{item.name}</h3>
                            <p className="text-xs text-muted-foreground">By {item.artisan}</p>
                            <div className="flex justify-between mt-1">
                              <p className="text-sm">Qty: {item.quantity}</p>
                              <p className="text-sm font-medium">₹{item.price.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex items-center gap-3">
                        {order.status === "Processing" && (
                          <>
                            <Clock className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Estimated Delivery</p>
                              <p className="text-xs text-muted-foreground">{order.estimatedDelivery}</p>
                            </div>
                          </>
                        )}

                        {order.status === "Shipped" && (
                          <>
                            <Truck className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Tracking Number</p>
                              <p className="text-xs text-muted-foreground">{order.trackingNumber}</p>
                            </div>
                          </>
                        )}

                        {order.status === "Delivered" && (
                          <>
                            <CheckCircle className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Delivered On</p>
                              <p className="text-xs text-muted-foreground">{order.deliveryDate}</p>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Order Total</p>
                        <p className="text-lg font-semibold">₹{order.total.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === "wishlist" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">Your Wishlist</h2>
                <p className="text-sm text-muted-foreground">
                  Save items for later and get notified about special offers
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userData.wishlist.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="flex p-4">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 ml-4">
                        <h3 className="text-sm font-medium line-clamp-2">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">By {item.artisan}</p>
                        <p className="text-sm font-medium mt-1">₹{item.price.toLocaleString()}</p>

                        <div className="mt-2">
                          {item.inStock ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              In Stock
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                              Out of Stock
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="border-t p-3 flex justify-between">
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        Remove
                      </Button>
                      <Button size="sm" disabled={!item.inStock}>
                        {item.inStock ? "Add to Cart" : "Notify Me"}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Payment Methods Tab */}
          {activeTab === "payment" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">Payment Methods</h2>
                <p className="text-sm text-muted-foreground">Manage your saved payment options</p>
              </div>

              <div className="space-y-4">
                {userData.paymentMethods.map((method) => (
                  <Card key={method.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            <CreditCard className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium">
                              {method.name} {method.type}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {method.number} • Expires {method.expiry}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {method.isDefault && <Badge variant="outline">Default</Badge>}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                Actions
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              {!method.isDefault && <DropdownMenuItem>Set as Default</DropdownMenuItem>}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button className="gap-2">
                <CreditCard className="h-4 w-4" />
                Add Payment Method
              </Button>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === "addresses" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">Your Addresses</h2>
                <p className="text-sm text-muted-foreground">Manage your shipping and billing addresses</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userData.addresses.map((address) => (
                  <Card key={address.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-medium">{address.type}</h3>
                          {address.isDefault && <Badge variant="outline">Default</Badge>}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            {!address.isDefault && <DropdownMenuItem>Set as Default</DropdownMenuItem>}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="space-y-1 text-sm">
                        <p className="font-medium">{address.name}</p>
                        <p>{address.line1}</p>
                        <p>{address.line2}</p>
                        <p>
                          {address.city}, {address.state} {address.pincode}
                        </p>
                        <p>Phone: {address.phone}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button className="gap-2">
                <Truck className="h-4 w-4" />
                Add New Address
              </Button>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">Notification Preferences</h2>
                <p className="text-sm text-muted-foreground">Manage how and when we contact you</p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Order Updates</h3>
                        <p className="text-xs text-muted-foreground">Receive notifications about your order status</p>
                      </div>
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked={userData.notifications.orderUpdates}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Promotions & Discounts</h3>
                        <p className="text-xs text-muted-foreground">Get notified about special offers and sales</p>
                      </div>
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked={userData.notifications.promotions}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Artisan Stories</h3>
                        <p className="text-xs text-muted-foreground">
                          Learn about the artisans behind your favorite crafts
                        </p>
                      </div>
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked={userData.notifications.artisanStories}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Monthly Newsletter</h3>
                        <p className="text-xs text-muted-foreground">
                          Receive our monthly newsletter with craft trends and stories
                        </p>
                      </div>
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300"
                          defaultChecked={userData.notifications.newsletter}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button>Save Preferences</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

