"use client"

import { usePathname, useRouter } from "next/navigation"
import { ShoppingCart, Store, Info, Gamepad2, ClipboardList } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSidebar } from "./sidebar-provider"
import { Button } from "@/components/ui/button"
//import { useSession } from "next-auth/react"

export function MainSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { selectedProduct, cartItems } = useSidebar()
  //const { status } = useSession()

  // Calcular el total de artículos en el carrito
  const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0)

  const routes = [
    {
      label: "Products",
      icon: Store,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Product",
      icon: Gamepad2,
      href: "/product",
      active: pathname === "/product",
      disabled: !selectedProduct,
    },
    {
      label: "Cart",
      icon: ShoppingCart,
      href: "/cart",
      active: pathname === "/cart",
      badge: totalItems > 0 ? totalItems : null,
    },
    {
      label: "My Orders",
      icon: ClipboardList,
      href: "/orders",
      active: pathname === "/orders" || pathname.startsWith("/orders/"),
      disabled: status !== "authenticated",
    },
    {
      label: "About Us",
      icon: Info,
      href: "/about",
      active: pathname === "/about",
    },
  ]

  return (
    <div className="flex h-screen flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <h2 className="text-lg font-semibold">Game Store</h2>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={route.active ? "secondary" : "ghost"}
              className={cn("justify-start", route.disabled && "opacity-50 pointer-events-none")}
              onClick={() => router.push(route.href)}
              disabled={route.disabled}
            >
              <div className="flex items-center w-full">
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
                {route.badge && (
                  <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {route.badge}
                  </div>
                )}
              </div>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  )
}