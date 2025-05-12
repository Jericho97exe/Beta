"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "./sidebar-provider"
import { Trash2, ShoppingBag, Plus, Minus, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast } from "sonner";

export function CartPage() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useSidebar()
  const router = useRouter()
  //const { data: session, status } = useSession()

  const [isProcessing, setIsProcessing] = useState(false)

  const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0)
  const subtotal = cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0)
  const tax = subtotal * 0.16 // 16% tax
  const total = subtotal + tax

const handleCheckout = async () => {
  if (status !== "authenticated") {
    toast.error("You need to sign in to complete your purchase");
    router.push("/login?callbackUrl=/cart");
    return;
  }

  try {
    setIsProcessing(true);

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems,
        total,
      }),
    });

    if (!response.ok) {
      throw new Error("Error processing order");
    }

    const order = await response.json();

    // Clear cart
    clearCart();

    toast.success("Your order has been processed");

    // Redirect to order details page
    router.push(`/orders/${order.id}`);
  } catch (error) {
    console.error("Error during checkout:", error);
    toast.error("An error occurred while processing your order. Please try again.");
  } finally {
    setIsProcessing(false);
  }
};

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        <div className="flex flex-col items-center justify-center py-12">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven&apos;t added any items to your cart yet</p>
          <Button onClick={() => router.push("/")}>Browse products</Button>
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
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-r-none"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="w-8 text-center">{item.quantity || 1}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-l-none"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                      <p className="font-semibold ml-4">${item.price.toFixed(2)}</p>
                    </div>
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
                <span className="text-muted-foreground">Tax (16%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Proceed to Checkout"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}