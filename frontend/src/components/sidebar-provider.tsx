"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Product } from "@/types/product"

// Eliminar apiKey del contexto y sus funciones relacionadas
type SidebarContextType = {
  selectedProduct: Product | null
  setSelectedProduct: (product: Product | null) => void
  cartItems: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cartItems, setCartItems] = useState<Product[]>([])
  //const [apiKey, setApiKey] = useState<string>("")

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    //const storedApiKey = localStorage.getItem("apiKey")

    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart))
      } catch {
        console.error("Error parsing cart data from localStorage")
      }
    }
  }, [])

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  //useEffect(() => {
  //  localStorage.setItem("apiKey", apiKey)
  //}, [apiKey])

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

  return (
    <SidebarContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        cartItems,
        addToCart,
        removeFromCart,
        //apiKey,
        //setApiKey,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
