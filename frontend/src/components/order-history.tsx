"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Clock, CheckCircle, XCircle, ChevronRight } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface OrderItem {
  id: string
  productId: number
  title: string
  price: number
  quantity: number
  image?: string
}

interface Order {
  id: string
  total: number
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED"
  createdAt: string
  orderItems: OrderItem[]
}

export function OrderHistory() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === "authenticated") {
      fetchOrders()
    } else if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/orders")

      if (!response.ok) {
        throw new Error("Error al cargar el historial de compras")
      }

      const data = await response.json()
      setOrders(data)
      setError(null)
    } catch (err) {
      console.error("Error fetching orders:", err)
      setError("No se pudo cargar el historial de compras. Por favor, intenta de nuevo más tarde.")
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "PENDING":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "PROCESSING":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "COMPLETED":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "CANCELLED":
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "PROCESSING":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "COMPLETED":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "CANCELLED":
        return "bg-red-100 text-red-800 hover:bg-red-200"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-4">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={fetchOrders}>Reintentar</Button>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">No tienes compras anteriores</h2>
        <p className="text-muted-foreground mb-6">Cuando realices una compra, aparecerá aquí</p>
        <Button onClick={() => router.push("/")}>Explorar productos</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="pending">Pendientes</TabsTrigger>
          <TabsTrigger value="completed">Completadas</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4 mt-4">
          {orders
            .filter((order) => order.status === "PENDING" || order.status === "PROCESSING")
            .map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-4">
          {orders
            .filter((order) => order.status === "COMPLETED")
            .map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function OrderCard({ order }: { order: Order }) {
  const router = useRouter()

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Orden #{order.id.slice(0, 8)}</CardTitle>
            <CardDescription>{formatDate(new Date(order.createdAt))}</CardDescription>
          </div>
          <Badge className={getStatusColor(order.status)} variant="outline">
            <span className="flex items-center">
              {getStatusIcon(order.status)}
              <span className="ml-1">
                {order.status === "PENDING" && "Pendiente"}
                {order.status === "PROCESSING" && "Procesando"}
                {order.status === "COMPLETED" && "Completada"}
                {order.status === "CANCELLED" && "Cancelada"}
              </span>
            </span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {order.orderItems.slice(0, 2).map((item) => (
            <div key={item.id} className="flex items-center">
              <div className="h-10 w-10 bg-muted rounded overflow-hidden mr-3">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="h-full w-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  {item.quantity} x ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          {order.orderItems.length > 2 && (
            <p className="text-xs text-muted-foreground">+ {order.orderItems.length - 2} productos más</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div>
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center"
          onClick={() => router.push(`/orders/${order.id}`)}
        >
          Ver detalles
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

function getStatusIcon(status: Order["status"]) {
  switch (status) {
    case "PENDING":
      return <Clock className="h-4 w-4 text-yellow-500" />
    case "PROCESSING":
      return <Clock className="h-4 w-4 text-blue-500" />
    case "COMPLETED":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "CANCELLED":
      return <XCircle className="h-4 w-4 text-red-500" />
  }
}

function getStatusColor(status: Order["status"]) {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
    case "PROCESSING":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200"
    case "COMPLETED":
      return "bg-green-100 text-green-800 hover:bg-green-200"
    case "CANCELLED":
      return "bg-red-100 text-red-800 hover:bg-red-200"
  }
}
