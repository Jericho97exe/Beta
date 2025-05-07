import Link from "next/link"
import { ChampionCard } from "@/components/champion-card"
import { SearchBar } from "@/components/search-bar"

export default async function ChampionsPage() {
  // En una implementación real, estos datos vendrían de la API de Riot
  const champions = [
    {
      id: "1",
      name: "Ahri",
      role: "Mago",
      image: "/placeholder.svg?height=300&width=300",
      skins: 14,
    },
    {
      id: "2",
      name: "Yasuo",
      role: "Luchador",
      image: "/placeholder.svg?height=300&width=300",
      skins: 12,
    },
    {
      id: "3",
      name: "Lux",
      role: "Mago",
      image: "/placeholder.svg?height=300&width=300",
      skins: 16,
    },
    {
      id: "4",
      name: "Jinx",
      role: "Tirador",
      image: "/placeholder.svg?height=300&width=300",
      skins: 10,
    },
    {
      id: "5",
      name: "Lee Sin",
      role: "Luchador",
      image: "/placeholder.svg?height=300&width=300",
      skins: 13,
    },
    {
      id: "6",
      name: "Ezreal",
      role: "Tirador",
      image: "/placeholder.svg?height=300&width=300",
      skins: 15,
    },
    {
      id: "7",
      name: "Zed",
      role: "Asesino",
      image: "/placeholder.svg?height=300&width=300",
      skins: 9,
    },
    {
      id: "8",
      name: "Akali",
      role: "Asesino",
      image: "/placeholder.svg?height=300&width=300",
      skins: 11,
    },
    {
      id: "9",
      name: "Garen",
      role: "Tanque",
      image: "/placeholder.svg?height=300&width=300",
      skins: 13,
    },
    {
      id: "10",
      name: "Katarina",
      role: "Asesino",
      image: "/placeholder.svg?height=300&width=300",
      skins: 12,
    },
    {
      id: "11",
      name: "Darius",
      role: "Luchador",
      image: "/placeholder.svg?height=300&width=300",
      skins: 10,
    },
    {
      id: "12",
      name: "Thresh",
      role: "Soporte",
      image: "/placeholder.svg?height=300&width=300",
      skins: 9,
    },
  ]

  const roles = ["Todos", "Asesino", "Luchador", "Mago", "Tirador", "Soporte", "Tanque"]

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
        <h1 className="text-3xl font-bold mb-8">Campeones</h1>

        <div className="flex flex-wrap gap-2 mb-8">
          {roles.map((role) => (
            <button
              key={role}
              className={`px-4 py-2 rounded-full text-sm ${
                role === "Todos" ? "bg-yellow-500 text-black" : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {champions.map((champion) => (
            <ChampionCard key={champion.id} champion={champion} />
          ))}
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
