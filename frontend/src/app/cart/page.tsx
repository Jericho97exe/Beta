import { MainSidebar } from "@/components/main-sidebar"
import { CartPage } from "@/components/cart-page"

export default function Cart() {
  return (
    <div className="flex h-screen">
      <MainSidebar />
      <main className="flex-1 overflow-auto">
        <CartPage />
      </main>
    </div>
  )
}
