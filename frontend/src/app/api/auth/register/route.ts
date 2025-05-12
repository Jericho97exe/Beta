import { NextResponse } from "next/server"
import { createUser, getUserByEmail } from "@/lib/users"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email y contraseña son requeridos" }, { status: 400 })
    }

    // Verificar si el usuario ya existe
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "El email ya está registrado" }, { status: 409 })
    }

    // Crear el usuario
    const user = await createUser(email, password, name)

    // Eliminar la contraseña de la respuesta
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Error al registrar usuario:", error)
    return NextResponse.json({ error: "Error al registrar usuario" }, { status: 500 })
  }
}
