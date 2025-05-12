import { PrismaClient } from '@prisma/client'

// Inicializa Prisma Client
const prisma = new PrismaClient()

// Middleware para manejar errores de Prisma
// Puedes agregar más lógica aquí si es necesario
//   try {
//     const result = await next(params)
//     return result
//   } catch (error) {
//     console.error("Prisma error:", error)
//     throw error
//   }
// })
//   } catch (error) {
//     console.error("Error fetching orders:", error)
//     setError("No se pudo cargar el historial de compras. Por favor, intenta de nuevo más tarde.")
//   } finally {
//     setLoading(false)
//   }
//   }
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="loader"></div>
//     </div>
//   }
//   }
//   return (
//     <div className="container mx-auto py-6 px-4">
//       <h1 className="text-3xl font-bold mb-6">Order History</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 border-b">Order ID</th>
//               <th className="px-4 py-2 border-b">Date</th>
//               <th className="px-4 py-2 border-b">Total</th>
//               <th className="px-4 py-2 border-b">Status</th>
//               <th className="px-4 py-2 border-b">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order.id} className="hover:bg-gray-100">
//                 <td className="px-4 py-2 border-b">{order.id}</td>
//                 <td className="px-4 py-2 border-b">{new Date(order.createdAt).toLocaleDateString()}</td>
//                 <td className="px-4 py-2 border-b">{order.total}</td>
//                 <td className="px-4 py-2 border-b">
//                   <span className={`px-2 py-1 rounded ${getStatusColor(order.status)}`}>
//                     {getStatusText(order.status)}
//                   </span>
//                 </td>
//                 <td className="px-4 py-2 border-b">
//                   <Link href={`/orders/${order.id}`}>
//                     <Button variant="link">View</Button>
//                   </Link>


// Exporta la instancia de Prisma para usarla en tu aplicación
export const db = prisma

// Función para ejecutar consultas SQL directamente (si es necesario)
export async function executeQuery(query: string, params: any[] = []) {
  try {
    // Prisma tiene dos métodos para queries raw:
    // - $queryRaw para consultas de selección
    // - $executeRaw para consultas de modificación
    if (query.trim().toLowerCase().startsWith('select')) {
      return await prisma.$queryRawUnsafe(query, ...params)
    } else {
      return await prisma.$executeRawUnsafe(query, ...params)
    }
  } catch (error) {
    console.error("Error executing query:", error)
    throw error
  }
}

// Conexión y desconexión (opcional, para manejo explícito)
export async function connect() {
  await prisma.$connect()
}

export async function disconnect() {
  await prisma.$disconnect()
}