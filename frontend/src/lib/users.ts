import { db } from "./db"
import bcrypt from "bcryptjs"

export interface User {
  id: string
  email: string
  name?: string | null
  password: string
  createdAt: Date
  updatedAt: Date
}

// Crear un nuevo usuario
export async function createUser(email: string, password: string, name?: string) {
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await db.user.create({
    data: {
      email,
      name: name || null,
      password: hashedPassword
    }
  })

  return getUserById(user.id)
}

// Obtener un usuario por su ID (sin password)
export async function getUserById(userId: string) {
  return await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true
    }
  })
}

// Obtener un usuario por su email (con password para verificación)
export async function getUserByEmail(email: string) {
  return await db.user.findUnique({
    where: { email }
  })
}

// Verificar credenciales de usuario
export async function verifyUserCredentials(email: string, password: string) {
  const user = await getUserByEmail(email)

  if (!user) {
    return null
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return null
  }

  // Excluir el password del objeto retornado
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}