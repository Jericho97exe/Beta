import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface Skin {
  id: string
  name: string
  champion: string
  price: number
  image: string
}

interface FeaturedSkinsProps {
  skins: Skin[]
}

export function FeaturedSkins({ skins }: FeaturedSkinsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {skins.map((skin) => (
        <div key={skin.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
          <div className="relative h-64">
            <Image src={skin.image || "/placeholder.svg"} alt={skin.name} fill className="object-cover" />
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
  )
}