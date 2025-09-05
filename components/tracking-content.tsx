"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Truck, Package, CheckCircle, Clock, Navigation } from "lucide-react"

// Mock tracking data
const mockTrackingData = [
  {
    orderId: "ORD-001",
    item: "Electronics Package",
    currentStatus: "Delivered",
    driverName: "Mike Johnson",
    driverPhone: "+1 (555) 123-4567",
    estimatedDelivery: "2024-01-15 14:30",
    currentLocation: "123 Main St, New York, NY",
    timeline: [
      { status: "Ordered", time: "2024-01-14 09:00", completed: true },
      { status: "Packed", time: "2024-01-14 11:30", completed: true },
      { status: "In Transit", time: "2024-01-15 08:00", completed: true },
      { status: "Delivered", time: "2024-01-15 14:30", completed: true },
    ],
  },
  {
    orderId: "ORD-002",
    item: "Office Supplies",
    currentStatus: "In Transit",
    driverName: "Sarah Wilson",
    driverPhone: "+1 (555) 987-6543",
    estimatedDelivery: "2024-01-17 16:00",
    currentLocation: "Highway 101, approaching Los Angeles",
    timeline: [
      { status: "Ordered", time: "2024-01-16 10:15", completed: true },
      { status: "Packed", time: "2024-01-16 14:20", completed: true },
      { status: "In Transit", time: "2024-01-17 07:45", completed: true },
      { status: "Delivered", time: "Estimated: 2024-01-17 16:00", completed: false },
    ],
  },
  {
    orderId: "ORD-003",
    item: "Medical Equipment",
    currentStatus: "Packed",
    driverName: "Not assigned",
    driverPhone: "N/A",
    estimatedDelivery: "2024-01-18 12:00",
    currentLocation: "Warehouse - Chicago Distribution Center",
    timeline: [
      { status: "Ordered", time: "2024-01-17 08:30", completed: true },
      { status: "Packed", time: "2024-01-17 15:45", completed: true },
      { status: "In Transit", time: "Pending", completed: false },
      { status: "Delivered", time: "Estimated: 2024-01-18 12:00", completed: false },
    ],
  },
]

const statusIcons = {
  Ordered: Package,
  Packed: Package,
  "In Transit": Truck,
  Delivered: CheckCircle,
}

const statusColors = {
  Ordered: "text-blue-600",
  Packed: "text-yellow-600",
  "In Transit": "text-orange-600",
  Delivered: "text-green-600",
}

export function TrackingContent() {
  const [selectedOrder, setSelectedOrder] = useState(mockTrackingData[0])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Order Tracking</h1>
        <p className="text-muted-foreground">Track your orders in real-time</p>
      </div>

      {/* Order Selection */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Select Order to Track</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={selectedOrder.orderId}
            onValueChange={(value) => {
              const order = mockTrackingData.find((o) => o.orderId === value)
              if (order) setSelectedOrder(order)
            }}
          >
            <SelectTrigger className="w-full md:w-64 bg-input">
              <SelectValue placeholder="Select an order" />
            </SelectTrigger>
            <SelectContent>
              {mockTrackingData.map((order) => (
                <SelectItem key={order.orderId} value={order.orderId}>
                  {order.orderId} - {order.item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Map Section */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Live Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Map Placeholder */}
            <div className="relative h-64 bg-muted rounded-lg border border-border overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
                <div className="text-center space-y-2">
                  <Navigation className="h-12 w-12 text-primary mx-auto" />
                  <p className="text-sm font-medium text-card-foreground">Google Maps Integration</p>
                  <p className="text-xs text-muted-foreground">Live tracking would appear here</p>
                </div>
              </div>
              {/* Mock location marker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
              </div>
            </div>

            {/* Driver Info */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-card-foreground">Current Location:</span>
                <span className="text-sm text-muted-foreground">{selectedOrder.currentLocation}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-card-foreground">Driver:</span>
                <span className="text-sm text-muted-foreground">{selectedOrder.driverName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-card-foreground">Contact:</span>
                <span className="text-sm text-muted-foreground">{selectedOrder.driverPhone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-card-foreground">ETA:</span>
                <span className="text-sm text-muted-foreground">{selectedOrder.estimatedDelivery}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline Section */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Delivery Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedOrder.timeline.map((step, index) => {
                const Icon = statusIcons[step.status as keyof typeof statusIcons]
                const isCompleted = step.completed
                const isLast = index === selectedOrder.timeline.length - 1

                return (
                  <div key={step.status} className="relative">
                    {/* Timeline line */}
                    {!isLast && (
                      <div className={`absolute left-4 top-8 w-0.5 h-8 ${isCompleted ? "bg-primary" : "bg-border"}`} />
                    )}

                    {/* Timeline item */}
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                          isCompleted
                            ? "bg-primary border-primary text-primary-foreground"
                            : "bg-background border-border text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4
                            className={`text-sm font-medium ${
                              isCompleted ? "text-card-foreground" : "text-muted-foreground"
                            }`}
                          >
                            {step.status}
                          </h4>
                          {step.status === selectedOrder.currentStatus && (
                            <Badge className="bg-accent text-accent-foreground">Current</Badge>
                          )}
                        </div>
                        <p className={`text-xs ${isCompleted ? "text-muted-foreground" : "text-muted-foreground/70"}`}>
                          {step.time}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Order Summary */}
            <div className="mt-6 pt-4 border-t border-border">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-card-foreground">Order ID:</span>
                  <span className="text-sm text-muted-foreground">{selectedOrder.orderId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-card-foreground">Item:</span>
                  <span className="text-sm text-muted-foreground">{selectedOrder.item}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-card-foreground">Status:</span>
                  <Badge
                    className={`${
                      selectedOrder.currentStatus === "Delivered"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : selectedOrder.currentStatus === "In Transit"
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : "bg-yellow-100 text-yellow-800 border-yellow-200"
                    }`}
                  >
                    {selectedOrder.currentStatus}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
