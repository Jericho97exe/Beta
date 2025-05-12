"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "./sidebar-provider"
import { Trash2, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"

export function CartPage() {
  const { cartItems, removeFromCart } = useSidebar()
  const router = useRouter()

  const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0)
  const subtotal = cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0)
  const tax = subtotal * 0.16 // 16% de impuesto
  const total = subtotal + tax

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        <div className="flex flex-col items-center justify-center py-12">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">It looks like you haven't added any products to your cart yet.</p>
          <Button onClick={() => router.push("/")}>Explore products</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted px-4 py-3 font-medium">Products ({totalItems})</div>
            <div className="divide-y">
              {cartItems.map((item) => (
                <div key={item.id} className="p-4 flex items-center">
                  <div className="relative h-20 w-20 bg-muted rounded">
                    {/* Usar img en lugar de Image */}
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">Amount: {item.quantity || 1}</p>
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes (16%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full" size="lg">
            Proceed to payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
