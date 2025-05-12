import { db, executeQuery } from "./db"
import type { Product } from "@/types/product"


export type OrderStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED"

export interface OrderItem {
  id: string
  orderId: string
  productId: number
  title: string
  price: number
  quantity: number
  image?: string
}

export interface Order {
  id: string
  userId: string
  total: number
  status: OrderStatus
  createdAt: Date
  updatedAt: Date
  orderItems?: OrderItem[]
}

// Crear una nueva orden
export async function createOrder(userId: string, cartItems: Product[], total: number) {
    // Prisma generará automáticamente el ID si lo configuraste en el schema
    const now = new Date()
  
    const order = await db.$transaction(async (prisma) => {
      const order = await prisma.order.create({
        data: {
          userId,
          total,
          status: "PENDING",
          createdAt: now,
          updatedAt: now,
          orderItems: {
            create: cartItems.map(item => ({
              productId: item.id,
              title: item.title,
              price: item.price,
              quantity: item.quantity || 1,
              image: item.image
            }))
          }
        },
        include: {
          orderItems: true
        }
      })
      return order
    })
  
    return order
  }
// Obtener todas las órdenes de un usuario
export async function getOrdersByUserId(userId: string) {
  const orders = await db.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      orderItems: true
    }
  })

  return orders
}

// Obtener una orden por su ID
export async function getOrderById(orderId: string) {
  const order = await db.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: true
    }
  })

  return order
}

// Actualizar el estado de una orden
export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const order = await db.order.update({
    where: { id: orderId },
    data: {
      status,
      updatedAt: new Date()
    },
    include: {
      orderItems: true
    }
  })

  return order
}