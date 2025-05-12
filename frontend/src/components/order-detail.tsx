"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Clock, CheckCircle, XCircle } from "lucide-react"
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
  updatedAt: string
  orderItems: OrderItem[]
}

export function OrderDetail({ orderId }: { orderId: string }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === "authenticated") {
      fetchOrder()
    } else if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router, orderId])

  const fetchOrder = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/orders/${orderId}`)

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Orden no encontrada")
        }
        throw new Error("Error al cargar los detalles de la orden")
      }

      const data = await response.json()
      setOrder(data)
      setError(null)
    } catch (err) {
      console.error("Error fetching order:", err)
      setError((err as Error).message || "No se pudo cargar los detalles de la orden")
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "PENDING":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "PROCESSING":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "COMPLETED":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "CANCELLED":
        return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "PENDING":
        return "Pendiente"
      case "PROCESSING":
        return "Procesando"
      case "COMPLETED":
        return "Completada"
      case "CANCELLED":
        return "Cancelada"
    }
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "PROCESSING":
        return "bg-blue-100 text-blue-800"
      case "COMPLETED":
        return "bg-green-100 text-green-800"
      case "CANCELLED":
        return "bg-red-100 text-red-800"
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
        <Button onClick={fetchOrder}>Reintentar</Button>
        <Button variant="outline" className="mt-2" onClick={() => router.push("/orders")}>
          Volver a mis órdenes
        </Button>
      </div>
    )
  }

  if (!order) {
    return null
  }

  const subtotal = order.orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const tax = order.total - subtotal

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="flex items-center" onClick={() => router.push("/orders")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a mis órdenes
        </Button>
        <Badge className={getStatusColor(order.status)} variant="secondary">
          <span className="flex items-center">
            {getStatusIcon(order.status)}
            <span className="ml-1">{getStatusText(order.status)}</span>
          </span>
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalles de la Orden #{order.id.slice(0, 8)}</CardTitle>
          <div className="text-sm text-muted-foreground">Realizada el {formatDate(new Date(order.createdAt))}</div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Productos</h3>
              <div className="space-y-4">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="relative h-16 w-16 bg-muted rounded overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-contain p-2"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} c/u</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">Resumen</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Impuestos</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}