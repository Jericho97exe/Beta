import Link from "next/link"
import Image from "next/image"

interface ChampionCardProps {
  champion: {
    id: string
    name: string
    role: string
    image: string
    skins: number
  }
}

export function ChampionCard({ champion }: ChampionCardProps) {
  return (
    <Link href={`/champions/${champion.id}`}>
      <div className="bg-gray-800 rounded-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-lg border border-gray-700">
        <div className="relative h-40">
          <Image src={champion.image || "/placeholder.svg"} alt={champion.name} fill className="object-cover" />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg">{champion.name}</h3>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-400">{champion.role}</span>
            <span className="text-sm text-yellow-500">{champion.skins} skins</span>
          </div>
        </div>
      </div>
    </Link>
  )
}