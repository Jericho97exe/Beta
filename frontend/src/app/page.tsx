"use client"

import { MainSidebar } from "@/components/main-sidebar"
import { ProductsPage } from "@/components/products-page"

export default function Home() {
  return (
    <div className="flex h-screen">
      <MainSidebar />
      <main className="flex-1 overflow-auto">
        <ProductsPage />
      </main>
    </div>
  )
}
