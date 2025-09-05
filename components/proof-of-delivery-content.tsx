"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileCheck, Camera, PenTool, Download, Calendar, MapPin, User } from "lucide-react"

// Mock proof of delivery data
const mockProofData = [
  {
    orderId: "ORD-001",
    item: "Electronics Package",
    deliveryDate: "2024-01-15",
    deliveryTime: "14:30",
    recipientName: "John Doe",
    deliveryAddress: "123 Main St, New York, NY 10001",
    driverName: "Mike Johnson",
    photoUrl: "/delivered-package-at-doorstep.png",
    signatureUrl: "/customer-signature.png",
    deliveryNotes: "Package delivered to front door. Customer was present and verified identity.",
    status: "Delivered",
  },
  {
    orderId: "ORD-002",
    item: "Office Supplies",
    deliveryDate: "2024-01-16",
    deliveryTime: "11:45",
    recipientName: "Jane Smith",
    deliveryAddress: "456 Oak Ave, Los Angeles, CA 90210",
    driverName: "Sarah Wilson",
    photoUrl: "/office-supplies-package-delivered.png",
    signatureUrl: "/digital-signature-pad.png",
    deliveryNotes: "Left with receptionist at front desk as requested by customer.",
    status: "Delivered",
  },
  {
    orderId: "ORD-004",
    item: "Books Collection",
    deliveryDate: "2024-01-14",
    deliveryTime: "16:20",
    recipientName: "Alice Brown",
    deliveryAddress: "321 Elm St, Houston, TX 77001",
    driverName: "Tom Davis",
    photoUrl: "/books-package-delivered-safely.png",
    signatureUrl: "/handwritten-signature.png",
    deliveryNotes: "Package delivered successfully. Customer satisfied with condition.",
    status: "Delivered",
  },
]

export function ProofOfDeliveryContent() {
  const [selectedProof, setSelectedProof] = useState(mockProofData[0])

  const handleDownloadProof = () => {
    // Mock download functionality
    console.log(`Downloading proof of delivery for ${selectedProof.orderId}`)
    alert(`Proof of delivery for ${selectedProof.orderId} would be downloaded as PDF`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Proof of Delivery</h1>
        <p className="text-muted-foreground">View delivery confirmations and signatures</p>
      </div>

      {/* Order Selection */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            Select Delivered Order
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Select
              value={selectedProof.orderId}
              onValueChange={(value) => {
                const proof = mockProofData.find((p) => p.orderId === value)
                if (proof) setSelectedProof(proof)
              }}
            >
              <SelectTrigger className="w-full md:w-64 bg-input">
                <SelectValue placeholder="Select an order" />
              </SelectTrigger>
              <SelectContent>
                {mockProofData.map((proof) => (
                  <SelectItem key={proof.orderId} value={proof.orderId}>
                    {proof.orderId} - {proof.item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleDownloadProof} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Delivery Photo */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Delivery Photo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedProof.photoUrl || "/placeholder.svg"}
                  alt="Proof of delivery photo"
                  className="w-full h-64 object-cover rounded-lg border border-border"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-green-100 text-green-800 border-green-200">Verified</Badge>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Photo taken at delivery location</p>
                <p>
                  Timestamp: {selectedProof.deliveryDate} at {selectedProof.deliveryTime}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Signature */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <PenTool className="h-5 w-5" />
              Recipient Signature
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <div className="w-full h-40 bg-white border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                  <img
                    src={selectedProof.signatureUrl || "/placeholder.svg"}
                    alt="Recipient signature"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">Digital</Badge>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Signed by: {selectedProof.recipientName}</p>
                <p>
                  Date: {selectedProof.deliveryDate} at {selectedProof.deliveryTime}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delivery Details */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Delivery Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">Delivery Date & Time</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedProof.deliveryDate} at {selectedProof.deliveryTime}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">Delivery Address</p>
                  <p className="text-sm text-muted-foreground">{selectedProof.deliveryAddress}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">Recipient</p>
                  <p className="text-sm text-muted-foreground">{selectedProof.recipientName}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FileCheck className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">Order ID</p>
                  <p className="text-sm text-muted-foreground">{selectedProof.orderId}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">Driver</p>
                  <p className="text-sm text-muted-foreground">{selectedProof.driverName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-green-100 text-green-800 border-green-200 mt-0.5">{selectedProof.status}</Badge>
              </div>
            </div>
          </div>

          {/* Delivery Notes */}
          <div className="mt-6 pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-card-foreground mb-2">Delivery Notes</h4>
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">{selectedProof.deliveryNotes}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
