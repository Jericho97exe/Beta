import Link from "next/link"
import Image from "next/image"
import { SearchBar } from "@/app/components/search-bar"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export default async function SkinsPage() {
  // En una implementación real, estos datos vendrían de la API de Riot
  const skins = [
    {
      id: "1",
      name: "K/DA ALL OUT Ahri",
      champion: "Ahri",
      price: 1350,
      image: "/placeholder.svg?height=400&width=300",
      rarity: "Épica",
    },
    {
      id: "2",
      name: "PROJECT: Zed",
      champion: "Zed",
      price: 1820,
      image: "/placeholder.svg?height=400&width=300",
      rarity: "Legendaria",
    },
    {
      id: "3",
      name: "Spirit Blossom Yasuo",
      champion: "Yasuo",
      price: 1350,
      image: "/placeholder.svg?height=400&width=300",
      rarity: "Épica",
    },
    {
      id: "4",
      name: "Dark Cosmic Jhin",
      champion: "Jhin",
      price: 1820,
      image: "/placeholder.svg?height=400&width=300",
      rarity: "Legendaria",
    },
    {
      id: "5",
      name: "Star Guardian Lux",
      champion: "Lux",
      price: 1350,
      image: "/placeholder.svg?height=400&width=300",
      rarity: "Épica",
    },
    {
      id: "6",
      name: "Arcade Ezreal",
      champion: "Ezreal",
      price: 1350,
      image: "/placeholder.svg?height=400&width=300",
      rarity: "Épica",
    },
    {
      id: "7",
      name: "Blood Moon Akali",
      champion: "Akali",
      price: 975,
      image: "/placeholder.svg?height=400&width=300",
      rarity: "Normal",
    },
    {
      id: "8",
      name: "Elementalist Lux",
      champion: "Lux",
      price: 3250,
      image: "/placeholder.svg?height=400&width=300",
      rarity: "Definitiva",
    },
  ]

  const categories = ["Todas", "Épica", "Legendaria", "Definitiva", "Normal", "Limitada"]
  const priceRanges = ["Todos los precios", "Menos de 975 RP", "975 RP", "1350 RP", "1820 RP", "3250 RP"]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-yellow-500">
              LoL Skin Store
            </Link>
            <div className="flex-1 max-w-xl mx-8">
              <SearchBar />
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/champions" className="hover:text-yellow-500 transition">
                Campeones
              </Link>
              <Link href="/skins" className="hover:text-yellow-500 transition">
                Skins
              </Link>
              <Link href="/cart" className="hover:text-yellow-500 transition">
                Carrito
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Skins</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Filtros</h2>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">Rareza</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category}`}
                        className="rounded border-gray-700 text-yellow-500 focus:ring-yellow-500"
                        defaultChecked={category === "Todas"}
                      />
                      <label htmlFor={`category-${category}`} className="ml-2 text-sm">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">Precio</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <div key={range} className="flex items-center">
                      <input
                        type="radio"
                        name="price"
                        id={`price-${range}`}
                        className="border-gray-700 text-yellow-500 focus:ring-yellow-500"
                        defaultChecked={range === "Todos los precios"}
                      />
                      <label htmlFor={`price-${range}`} className="ml-2 text-sm">
                        {range}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">Aplicar filtros</Button>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skins.map((skin) => (
                <div key={skin.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                  <div className="relative h-64">
                    <Image src={skin.image || "/placeholder.svg"} alt={skin.name} fill className="object-cover" />
                    <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                      {skin.rarity}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="font-bold text-lg">{skin.name}</h3>
                      <p className="text-sm text-gray-300">{skin.champion}</p>
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <span className="font-bold text-yellow-500">{skin.price} RP</span>
                    <div className="flex space-x-2">
                      <Link href={`/skins/${skin.id}`}>
                        <Button variant="outline" size="sm">
                          Detalles
                        </Button>
                      </Link>
                      <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Añadir
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 border-t border-gray-700 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2025 LoL Skin Store. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
