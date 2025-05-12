"use client"

import { useState } from "react"
import type React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types/product"
import { useSidebar } from "./sidebar-provider"
import { ShoppingCart, Star, Eye, Check } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const { setSelectedProduct, addToCart } = useSidebar()
  const [isAdded, setIsAdded] = useState(false)

  const handleViewDetails = () => {
    setSelectedProduct(product)
    router.push("/product")
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product)

    // Mostrar animación de confirmación
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
    }, 1500)
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="relative pt-[100%] bg-white">
        {/* Usar img en lugar de Image */}
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-contain p-4"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
          <Button variant="secondary" size="sm" className="mx-1" onClick={handleViewDetails}>
            <Eye className="h-4 w-4 mr-1" />
            See
          </Button>
          <Button variant="secondary" size="sm" className="mx-1" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-semibold text-lg line-clamp-1 mb-1">{product.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
          <span>
            {product.rating.rate} ({product.rating.count} reviews)
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 border-t mt-auto">
        <div className="w-full flex justify-between items-center">
          <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
          <Button
            variant={isAdded ? "default" : "outline"}
            size="icon"
            onClick={handleAddToCart}
            className={`transition-all ${isAdded ? "bg-green-500 text-white border-green-500" : ""}`}
          >
            {isAdded ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
