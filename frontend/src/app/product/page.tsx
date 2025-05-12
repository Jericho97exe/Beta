"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { MainSidebar } from "@/components/main-sidebar"
import { ProductDetail } from "@/components/product-detail"
import { useSidebar } from "@/components/sidebar-provider"

export default function ProductPage() {
  const { selectedProduct } = useSidebar()
  const router = useRouter()

  // Redirigir a la página principal si no hay producto seleccionado
  useEffect(() => {
    if (!selectedProduct) {
      router.push("/")
    }
  }, [selectedProduct, router])

  if (!selectedProduct) {
    return null
  }

  return (
    <div className="flex h-screen">
      <MainSidebar />
      <main className="flex-1 overflow-auto">
        <ProductDetail product={selectedProduct} />
      </main>
    </div>
  )
}
