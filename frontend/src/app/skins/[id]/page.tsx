import Link from "next/link"
import Image from "next/image"
import { Button } from '@/app/components/ui/Button'
import { ChevronLeft, ShoppingCart } from "lucide-react"

interface SkinPageProps {
  params: {
    id: string
  }
}

export default async function SkinPage({ params }: SkinPageProps) {
  // En una implementación real, estos datos vendrían de la API de Riot
  const skin = {
    id: params.id,
    name: "K/DA ALL OUT Ahri",
    champion: "Ahri",
    price: 1350,
    rarity: "Épica",
    releaseDate: "28/10/2020",
    description:
      "Ahri regresa como la líder de K/DA en su nuevo álbum ALL OUT. Con un estilo renovado y efectos visuales impresionantes, esta skin trae nuevas animaciones, efectos de sonido y un recall único.",
    features: ["Nuevas animaciones", "Efectos visuales", "Efectos de sonido", "Recall único"],
    image: "/placeholder.svg?height=600&width=400",
    screenshots: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
    relatedSkins: [
      {
        id: "5",
        name: "K/DA ALL OUT Evelynn",
        champion: "Evelynn",
        price: 1350,
        image: "/placeholder.svg?height=200&width=150",
      },
      {
        id: "6",
        name: "K/DA ALL OUT Kai'Sa",
        champion: "Kai'Sa",
        price: 1350,
        image: "/placeholder.svg?height=200&width=150",
      },
      {
        id: "7",
        name: "K/DA ALL OUT Akali",
        champion: "Akali",
        price: 1350,
        image: "/placeholder.svg?height=200&width=150",
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
        <Link href="/skins" className="inline-flex items-center text-yellow-500 hover:underline mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver a Skins
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 sticky top-4">
              <div className="relative h-96">
                <Image src={skin.image || "/placeholder.svg"} alt={skin.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h1 className="text-2xl font-bold">{skin.name}</h1>
                    <Link
                      href={`/champions/${skin.champion.toLowerCase()}`}
                      className="text-yellow-500 hover:underline"
                    >
                      {skin.champion}
                    </Link>
                  </div>
                  <span className="bg-yellow-500 text-black px-2 py-1 rounded text-sm font-bold">{skin.rarity}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-yellow-500">{skin.price} RP</span>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Añadir al carrito
                  </Button>
                </div>
                <div className="mt-4">
                  <span className="text-gray-400 text-sm">Fecha de lanzamiento</span>
                  <p>{skin.releaseDate}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
              <h2 className="text-xl font-bold mb-4">Descripción</h2>
              <p>{skin.description}</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
              <h2 className="text-xl font-bold mb-4">Características</h2>
              <ul className="list-disc pl-5 space-y-2">
                {skin.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
              <h2 className="text-xl font-bold mb-4">Capturas</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {skin.screenshots.map((screenshot, index) => (
                  <div key={index} className="relative h-40 rounded-lg overflow-hidden">
                    <Image
                      src={screenshot || "/placeholder.svg"}
                      alt={`${skin.name} screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Skins Relacionados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {skin.relatedSkins.map((relatedSkin) => (
                  <Link key={relatedSkin.id} href={`/skins/${relatedSkin.id}`}>
                    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 transition-transform hover:scale-105">
                      <div className="relative h-40">
                        <Image
                          src={relatedSkin.image || "/placeholder.svg"}
                          alt={relatedSkin.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold">{relatedSkin.name}</h3>
                        <p className="text-sm text-gray-400">{relatedSkin.champion}</p>
                        <p className="font-bold text-yellow-500 mt-2">{relatedSkin.price} RP</p>
                      </div>
                    </div>
                  </Link>
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