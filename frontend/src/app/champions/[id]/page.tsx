import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ShoppingCart } from "lucide-react"

interface ChampionPageProps {
  params: {
    id: string
  }
}

export default async function ChampionPage({ params }: ChampionPageProps) {
  // En una implementación real, estos datos vendrían de la API de Riot
  const champion = {
    id: params.id,
    name: "Ahri",
    title: "La Zorra de Nueve Colas",
    role: "Mago",
    difficulty: "Moderada",
    description:
      "Ahri es una vastaya conectada de forma innata al poder latente de Runaterra, y es capaz de convertir la magia en orbes de energía pura. Le gusta jugar con sus presas, manipulando sus emociones antes de devorar su esencia vital.",
    image: "/placeholder.svg?height=500&width=500",
    abilities: [
      {
        name: "Orbe de Engaño",
        description: "Ahri lanza y recupera su orbe, infligiendo daño mágico a la ida y daño verdadero a la vuelta.",
        key: "Q",
      },
      {
        name: "Fuego Zorruno",
        description:
          "Ahri libera tres fuegos fatuos que se dirigen a los enemigos cercanos y les infligen daño mágico.",
        key: "W",
      },
      {
        name: "Encanto",
        description:
          "Ahri lanza un beso que daña y encanta a un enemigo, haciéndole caminar inofensivamente hacia ella.",
        key: "E",
      },
      {
        name: "Impulso Espiritual",
        description:
          "Ahri se impulsa en la dirección elegida y dispara rayos de esencia que dañan a los enemigos cercanos.",
        key: "R",
      },
    ],
    skins: [
      {
        id: "1",
        name: "K/DA ALL OUT Ahri",
        price: 1350,
        image: "/placeholder.svg?height=300&width=200",
      },
      {
        id: "2",
        name: "Spirit Blossom Ahri",
        price: 1820,
        image: "/placeholder.svg?height=300&width=200",
      },
      {
        id: "3",
        name: "Star Guardian Ahri",
        price: 1350,
        image: "/placeholder.svg?height=300&width=200",
      },
      {
        id: "4",
        name: "Arcade Ahri",
        price: 1350,
        image: "/placeholder.svg?height=300&width=200",
      },
    ],
  }

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
        <Link href="/champions" className="inline-flex items-center text-yellow-500 hover:underline mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver a Campeones
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
              <div className="relative h-80">
                <Image src={champion.image || "/placeholder.svg"} alt={champion.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h1 className="text-2xl font-bold">{champion.name}</h1>
                <p className="text-gray-400">{champion.title}</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-gray-400 text-sm">Rol</span>
                    <p>{champion.role}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Dificultad</span>
                    <p>{champion.difficulty}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
              <h2 className="text-xl font-bold mb-4">Historia</h2>
              <p>{champion.description}</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
              <h2 className="text-xl font-bold mb-4">Habilidades</h2>
              <div className="space-y-4">
                {champion.abilities.map((ability, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-gray-700 text-yellow-500 font-bold w-8 h-8 flex items-center justify-center rounded mr-4">
                      {ability.key}
                    </div>
                    <div>
                      <h3 className="font-bold">{ability.name}</h3>
                      <p className="text-gray-400">{ability.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Skins Disponibles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {champion.skins.map((skin) => (
                  <div key={skin.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                    <div className="relative h-48">
                      <Image src={skin.image || "/placeholder.svg"} alt={skin.name} fill className="object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold">{skin.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold text-yellow-500">{skin.price} RP</span>
                        <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Añadir
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
