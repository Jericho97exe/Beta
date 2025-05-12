"use client"

import { useState } from "react"
import type { Product } from "@/types/product"
import { useSidebar } from "./sidebar-provider"
import { ShoppingCart, Star, ArrowLeft, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useSidebar()
  const router = useRouter()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)

    // Mostrar animación de confirmación
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto py-6">
      <Button variant="ghost" className="mb-6 flex items-center" onClick={() => router.push("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Return to products
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
          {/* Usar img en lugar de Image */}
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-full object-contain p-6"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>

          <div className="flex items-center mt-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-medium">{product.rating.rate}</span>
            </div>
            <span className="mx-2 text-muted-foreground">•</span>
            <span className="text-muted-foreground">{product.rating.count} reviews</span>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-bold">${product.price.toFixed(2)}</h2>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Description:</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Category:</h3>
            <div className="inline-block bg-muted px-3 py-1 rounded-full text-sm">{product.category}</div>
          </div>

          <div className="mt-8 flex gap-4">
            <Button
              size="lg"
              onClick={handleAddToCart}
              className={`flex items-center transition-all ${isAdded ? "bg-green-500 hover:bg-green-600" : ""}`}
            >
              {isAdded ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  Added to cart
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Added to cart
                </>
              )}
            </Button>

            <Button size="lg" variant="outline">
            Buy now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
