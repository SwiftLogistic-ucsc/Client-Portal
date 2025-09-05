"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Package, Search } from "lucide-react"

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-001",
    item: "Electronics Package",
    quantity: 2,
    address: "123 Main St, New York, NY 10001",
    status: "Delivered",
    date: "2024-01-15",
    customer: "John Doe",
  },
  {
    id: "ORD-002",
    item: "Office Supplies",
    quantity: 1,
    address: "456 Oak Ave, Los Angeles, CA 90210",
    status: "In-Transit",
    date: "2024-01-16",
    customer: "Jane Smith",
  },
  {
    id: "ORD-003",
    item: "Medical Equipment",
    quantity: 3,
    address: "789 Pine Rd, Chicago, IL 60601",
    status: "Pending",
    date: "2024-01-17",
    customer: "Bob Johnson",
  },
  {
    id: "ORD-004",
    item: "Books Collection",
    quantity: 5,
    address: "321 Elm St, Houston, TX 77001",
    status: "Failed",
    date: "2024-01-14",
    customer: "Alice Brown",
  },
]

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  "In-Transit": "bg-blue-100 text-blue-800 border-blue-200",
  Delivered: "bg-green-100 text-green-800 border-green-200",
  Failed: "bg-red-100 text-red-800 border-red-200",
}

export function OrdersContent() {
  const [orders, setOrders] = useState(mockOrders)
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    orderId: "",
    item: "",
    quantity: "",
    address: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newOrder = {
      id: formData.orderId || `ORD-${String(orders.length + 1).padStart(3, "0")}`,
      item: formData.item,
      quantity: Number.parseInt(formData.quantity),
      address: formData.address,
      status: "Pending" as const,
      date: new Date().toISOString().split("T")[0],
      customer: "Current User",
    }
    setOrders([newOrder, ...orders])
    setFormData({ orderId: "", item: "", quantity: "", address: "" })
    setShowForm(false)
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground">Manage your orders and track deliveries</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </div>

      {/* New Order Form */}
      {showForm && (
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Package className="h-5 w-5" />
              Create New Order
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="orderId" className="text-card-foreground">
                    Order ID (Optional)
                  </Label>
                  <Input
                    id="orderId"
                    placeholder="Auto-generated if empty"
                    value={formData.orderId}
                    onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                    className="bg-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-card-foreground">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Enter quantity"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    required
                    className="bg-input"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="item" className="text-card-foreground">
                  Item
                </Label>
                <Input
                  id="item"
                  placeholder="Enter item description"
                  value={formData.item}
                  onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                  required
                  className="bg-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-card-foreground">
                  Delivery Address
                </Label>
                <Input
                  id="address"
                  placeholder="Enter full delivery address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                  className="bg-input"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Create Order
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <Card className="bg-card">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders by ID, item, or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-input"
            />
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-card-foreground">Order ID</th>
                  <th className="text-left py-3 px-4 font-medium text-card-foreground">Item</th>
                  <th className="text-left py-3 px-4 font-medium text-card-foreground">Quantity</th>
                  <th className="text-left py-3 px-4 font-medium text-card-foreground">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-card-foreground">Address</th>
                  <th className="text-left py-3 px-4 font-medium text-card-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-card-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium text-card-foreground">{order.id}</td>
                    <td className="py-3 px-4 text-card-foreground">{order.item}</td>
                    <td className="py-3 px-4 text-card-foreground">{order.quantity}</td>
                    <td className="py-3 px-4 text-card-foreground">{order.customer}</td>
                    <td className="py-3 px-4 text-card-foreground max-w-xs truncate" title={order.address}>
                      {order.address}
                    </td>
                    <td className="py-3 px-4 text-card-foreground">{order.date}</td>
                    <td className="py-3 px-4">
                      <Badge className={statusColors[order.status]}>{order.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredOrders.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">No orders found matching your search.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
