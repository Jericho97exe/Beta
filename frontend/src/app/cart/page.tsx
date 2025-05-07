"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Trash2 } from 'lucide-react';

export default function CartPage() {
  // En una implementación real, estos datos vendrían de un estado global o base de datos
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "K/DA ALL OUT Ahri",
      champion: "Ahri",
      price: 1350,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 1,
    },
    {
      id: "2",
      name: "PROJECT: Zed",
      champion: "Zed",
      price: 1820,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 1,
    },
  ]);

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-yellow-500">
            LoL Skin Store
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-yellow-500 hover:underline mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Continuar comprando
        </Link>

        <h1 className="text-3xl font-bold mb-8">Tu carrito</h1>

        {cartItems.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center border border-gray-700">
            <h2 className="text-xl mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-400 mb-6">Parece que aún no has añadido ninguna skin a tu carrito.</p>
            <Link href="/skins">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                Explorar skins
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="text-left p-4">Producto</th>
                      <th className="text-center p-4">Cantidad</th>
                      <th className="text-right p-4">Precio</th>
                      <th className="p-4 w-16"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-t border-gray-700">
                        <td className="p-4">
                          <div className="flex items-center">
                            <div className="relative w-16 h-16 mr-4">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                            <div>
                              <h3 className="font-bold">{item.name}</h3>
                              <p className="text-sm text-gray-400">{item.champion}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <span className="mx-3">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <span className="font-bold text-yellow-500">{item.price * item.quantity} RP</span>
                        </td>
                        <td className="p-4 text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 sticky top-4">
                <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span>{subtotal} RP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Impuestos</span>
                    <span>0 RP</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-yellow-500">{subtotal} RP</span>
                  </div>
                </div>
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                  Finalizar compra
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 border-t border-gray-700 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2025 LoL Skin Store. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}