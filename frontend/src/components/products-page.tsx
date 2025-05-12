"use client"

import { useEffect, useState } from "react"
import type { Product } from "@/types/product"
import { ProductCard } from "./product-card"

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        // Usamos la API de FakeStore para obtener productos reales
        const response = await fetch("https://fakestoreapi.com/products")

        if (!response.ok) {
          throw new Error("Error al cargar los productos")
        }

        const data = await response.json()

        interface ApiProduct {
          id: number
          title: string
          price: number
          description?: string
          category?: string
          image?: string
          rating?: {
            rate: number
            count: number
          }
        }

        // Adaptamos los datos para nuestra interfaz
        const formattedProducts = data.map((item: ApiProduct) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          description: item.description || "Sin descripción disponible",
          category: item.category || "Sin categoría",
          image: item.image || "/placeholder.svg?height=200&width=200",
          rating: item.rating || { rate: 0, count: 0 },
        }))

        setProducts(formattedProducts)
        setError(null)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("No se pudieron cargar los productos. Por favor, intenta de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </button>
      </div>
    )
  }

  // Filtrar categorías que no queremos mostrar
  const excludedCategories = ["men's clothing", "electronics"]

  // Filtrar productos para excluir categorías no deseadas
  const filteredProducts = products.filter((product) => !excludedCategories.includes(product.category))

  // Agrupar productos por categoría (solo las categorías permitidas)
  const categories = [...new Set(filteredProducts.map((product) => product.category))]

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Available Products</h1>

      {categories.map((category) => (
        <div key={category} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 capitalize">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts
              .filter((product) => product.category === category)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
