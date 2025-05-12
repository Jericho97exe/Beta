import { NextResponse } from "next/server"
import { getOrdersByUserId, createOrder } from "@/lib/orders"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// Obtener todas las órdenes del usuario actual
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const orders = await getOrdersByUserId(session.user.id)

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error al obtener órdenes:", error)
    return NextResponse.json({ error: "Error al obtener órdenes" }, { status: 500 })
  }
}

// Crear una nueva orden
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { cartItems, total } = await request.json()

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json({ error: "Carrito vacío o inválido" }, { status: 400 })
    }

    // Crear la orden con sus items
    const order = await createOrder(session.user.id, cartItems, total)

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error al crear orden:", error)
    return NextResponse.json({ error: "Error al crear orden" }, { status: 500 })
  }
}
