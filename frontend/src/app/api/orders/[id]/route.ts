import { NextResponse } from "next/server"
import { getOrderById } from "@/lib/orders"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// Obtener una orden específica
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const orderId = params.id

    const order = await getOrderById(orderId)

    if (!order) {
      return NextResponse.json({ error: "Orden no encontrada" }, { status: 404 })
    }

    // Verificar que la orden pertenece al usuario actual
    if (order.userId !== session.user.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error al obtener orden:", error)
    return NextResponse.json({ error: "Error al obtener orden" }, { status: 500 })
  }
}
