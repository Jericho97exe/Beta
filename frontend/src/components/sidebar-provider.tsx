"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Product } from "@/types/product"

// Actualizar el tipo SidebarContextType para incluir las nuevas funciones
type SidebarContextType = {
  selectedProduct: Product | null
  setSelectedProduct: (product: Product | null) => void
  cartItems: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  increaseQuantity: (productId: number) => void
  decreaseQuantity: (productId: number) => void
  clearCart: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

// Añadir las nuevas funciones al SidebarProvider
export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cartItems, setCartItems] = useState<Product[]>([])

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart")

      if (storedCart) {
        try {
          setCartItems(JSON.parse(storedCart))
        } catch {
          // Error silencioso, solo registramos en consola
          console.error("Error parsing cart data from localStorage")
        }
      }
    }
  }, [])

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cartItems))
    }
  }, [cartItems])

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      // Verificar si el producto ya está en el carrito
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        // Si ya existe, incrementar la cantidad
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item))
      } else {
        // Si no existe, agregarlo con cantidad 1
        return [...prev, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  // Nueva función para incrementar la cantidad
  const increaseQuantity = (productId: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: (item.quantity || 1) + 1 } : item)),
    )
  }

  // Nueva función para decrementar la cantidad
  const decreaseQuantity = (productId: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const newQuantity = (item.quantity || 1) - 1
          // Si la cantidad llega a 0, mantenemos 1 como mínimo
          return { ...item, quantity: newQuantity < 1 ? 1 : newQuantity }
        }
        return item
      }),
    )
  }

  // Nueva función para limpiar el carrito
  const clearCart = () => {
    setCartItems([])
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart")
    }
  }
  
  // Nueva función para limpiar el producto seleccionado
  const clearSelectedProduct = () => {
    setSelectedProduct(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("selectedProduct")
    }
  }

  // Guardar el producto seleccionado en localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct))
    }
  }, [selectedProduct])

  // Cargar el producto seleccionado del localStorage al iniciar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProduct = localStorage.getItem("selectedProduct")
      if (storedProduct) {
        try {
          setSelectedProduct(JSON.parse(storedProduct))
        } catch {
          // Error silencioso, solo registramos en consola
          console.error("Error parsing selected product data from localStorage")
        }
      }
    }
  }, [])

  // Guardar el producto seleccionado en localStorage cuando cambie
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct))
    }
  }, [selectedProduct])

  const contextValue = {
    selectedProduct,
    setSelectedProduct,
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  }

  return <SidebarContext.Provider value={contextValue}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
