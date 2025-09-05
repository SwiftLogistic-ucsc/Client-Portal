"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, FileText, Download, Search, Eye, DollarSign, Calendar, AlertCircle } from "lucide-react"

// Mock billing data
const mockInvoices = [
  {
    invoiceNo: "INV-2024-001",
    date: "2024-01-15",
    amount: 1250.0,
    status: "Paid",
    dueDate: "2024-01-30",
    description: "Delivery services for January 2024",
    orderId: "ORD-001",
  },
  {
    invoiceNo: "INV-2024-002",
    date: "2024-01-20",
    amount: 875.5,
    status: "Pending",
    dueDate: "2024-02-05",
    description: "Express delivery and handling fees",
    orderId: "ORD-002",
  },
  {
    invoiceNo: "INV-2024-003",
    date: "2024-01-10",
    amount: 2100.75,
    status: "Paid",
    dueDate: "2024-01-25",
    description: "Bulk delivery services - Medical equipment",
    orderId: "ORD-003",
  },
  {
    invoiceNo: "INV-2024-004",
    date: "2024-01-25",
    amount: 450.0,
    status: "Overdue",
    dueDate: "2024-02-10",
    description: "Standard delivery services",
    orderId: "ORD-004",
  },
  {
    invoiceNo: "INV-2024-005",
    date: "2024-01-28",
    amount: 1680.25,
    status: "Pending",
    dueDate: "2024-02-15",
    description: "Premium delivery with tracking",
    orderId: "ORD-005",
  },
]

const mockContracts = [
  {
    contractNo: "CON-2024-001",
    title: "Annual Delivery Service Agreement",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    value: 15000.0,
    status: "Active",
    type: "Service Agreement",
  },
  {
    contractNo: "CON-2023-005",
    title: "Express Delivery Package Deal",
    startDate: "2023-06-01",
    endDate: "2024-05-31",
    value: 8500.0,
    status: "Active",
    type: "Package Deal",
  },
  {
    contractNo: "CON-2023-003",
    title: "Medical Equipment Transport Contract",
    startDate: "2023-03-15",
    endDate: "2023-12-15",
    value: 12000.0,
    status: "Expired",
    type: "Specialized Service",
  },
]

const statusColors = {
  Paid: "bg-green-100 text-green-800 border-green-200",
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Overdue: "bg-red-100 text-red-800 border-red-200",
  Active: "bg-blue-100 text-blue-800 border-blue-200",
  Expired: "bg-gray-100 text-gray-800 border-gray-200",
}

export function BillingContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("invoices")

  const filteredInvoices = mockInvoices.filter(
    (invoice) =>
      invoice.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.orderId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredContracts = mockContracts.filter(
    (contract) =>
      contract.contractNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPaid = mockInvoices.filter((inv) => inv.status === "Paid").reduce((sum, inv) => sum + inv.amount, 0)
  const totalPending = mockInvoices.filter((inv) => inv.status === "Pending").reduce((sum, inv) => sum + inv.amount, 0)
  const totalOverdue = mockInvoices.filter((inv) => inv.status === "Overdue").reduce((sum, inv) => sum + inv.amount, 0)

  const handleDownloadInvoice = (invoiceNo: string) => {
    console.log(`Downloading invoice ${invoiceNo}`)
    alert(`Invoice ${invoiceNo} would be downloaded as PDF`)
  }

  const handleViewContract = (contractNo: string) => {
    console.log(`Viewing contract ${contractNo}`)
    alert(`Contract ${contractNo} details would be displayed`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Billing & Contracts</h1>
        <p className="text-muted-foreground">Manage your invoices and service contracts</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Total Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalPaid.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Completed payments</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Pending</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">${totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalOverdue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Past due date</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="bg-card">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search invoices or contracts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-input"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Invoices and Contracts */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="invoices" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Invoices
          </TabsTrigger>
          <TabsTrigger value="contracts" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Contracts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Invoice History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-card-foreground">Invoice No</th>
                      <th className="text-left py-3 px-4 font-medium text-card-foreground">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-card-foreground">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-card-foreground">Due Date</th>
                      <th className="text-left py-3 px-4 font-medium text-card-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-card-foreground">Description</th>
                      <th className="text-left py-3 px-4 font-medium text-card-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.map((invoice) => (
                      <tr key={invoice.invoiceNo} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium text-card-foreground">{invoice.invoiceNo}</td>
                        <td className="py-3 px-4 text-card-foreground">{invoice.date}</td>
                        <td className="py-3 px-4 font-medium text-card-foreground">
                          ${invoice.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-card-foreground">{invoice.dueDate}</td>
                        <td className="py-3 px-4">
                          <Badge className={statusColors[invoice.status as keyof typeof statusColors]}>
                            {invoice.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-card-foreground max-w-xs truncate" title={invoice.description}>
                          {invoice.description}
                        </td>
                        <td className="py-3 px-4">
                          <Button size="sm" variant="outline" onClick={() => handleDownloadInvoice(invoice.invoiceNo)}>
                            <Download className="h-3 w-3 mr-1" />
                            PDF
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredInvoices.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">No invoices found matching your search.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Service Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-card-foreground">Contract No</th>
                      <th className="text-left py-3 px-4 font-medium text-card-foreground">Title</th>
                      <th className="text-left py-3 px-4 font-medium text-card-foreground">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-card-foreground">Start Date</th>
                      <th className="text-left py-3 px-4 font-medium text-card-foreground">End Date</th>
                      <th className="text-left py-3 px-4 font-medium text-card-foreground">Value</th>
                      <th className="text-left py-3 px-4 font-medium text-card-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-card-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContracts.map((contract) => (
                      <tr key={contract.contractNo} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium text-card-foreground">{contract.contractNo}</td>
                        <td className="py-3 px-4 text-card-foreground max-w-xs truncate" title={contract.title}>
                          {contract.title}
                        </td>
                        <td className="py-3 px-4 text-card-foreground">{contract.type}</td>
                        <td className="py-3 px-4 text-card-foreground">{contract.startDate}</td>
                        <td className="py-3 px-4 text-card-foreground">{contract.endDate}</td>
                        <td className="py-3 px-4 font-medium text-card-foreground">
                          ${contract.value.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={statusColors[contract.status as keyof typeof statusColors]}>
                            {contract.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button size="sm" variant="outline" onClick={() => handleViewContract(contract.contractNo)}>
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredContracts.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">No contracts found matching your search.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
