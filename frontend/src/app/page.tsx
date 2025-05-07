"use client"
import Image from "next/image";
{/*

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
*/}
// frontend/pages/index.js
import Link from "next/link";
import { ChampionCard } from "@/app/components/champion-cart";
import { FeaturedSkins } from "@/app/components/featured-skins";
import { SearchBar } from "@/app/components/search-bar";
import { ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button"

export default async function Home() {
  // En una implementación real, estos datos vendrían de la API de Riot
  const featuredSkins = [
    {
      id: "1",
      name: "K/DA ALL OUT Ahri",
      champion: "Ahri",
      price: 1350,
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "2",
      name: "PROJECT: Zed",
      champion: "Zed",
      price: 1820,
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "3",
      name: "Spirit Blossom Yasuo",
      champion: "Yasuo",
      price: 1350,
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "4",
      name: "Dark Cosmic Jhin",
      champion: "Jhin",
      price: 1820,
      image: "/placeholder.svg?height=400&width=300",
    },
  ];

  const popularChampions = [
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
  ];

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
              <Link href="/cart">
                <Button variant="outline" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-8 mb-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold mb-4">Personaliza tu experiencia en League of Legends</h1>
              <p className="text-lg mb-6">
                Descubre y adquiere las mejores skins para tus campeones favoritos. ¡Destaca en la Grieta del Invocador!
              </p>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                Explorar Skins
              </Button>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Skins Destacadas</h2>
            <Link href="/skins" className="text-yellow-500 hover:underline">
              Ver todas
            </Link>
          </div>
          <FeaturedSkins skins={featuredSkins} />
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Campeones Populares</h2>
            <Link href="/champions" className="text-yellow-500 hover:underline">
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularChampions.map((champion) => (
              <ChampionCard key={champion.id} champion={champion} />
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 border-t border-gray-700 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-yellow-500 mb-4">LoL Skin Store</h3>
              <p className="text-gray-400 max-w-md">
                LoL Skin Store no está afiliado con Riot Games. League of Legends y Riot Games son marcas registradas de Riot Games, Inc.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
                <ul className="space-y-2">
                  <li><Link href="/champions" className="text-gray-400 hover:text-yellow-500">Campeones</Link></li>
                  <li><Link href="/skins" className="text-gray-400 hover:text-yellow-500">Skins</Link></li>
                  <li><Link href="/cart" className="text-gray-400 hover:text-yellow-500">Carrito</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Soporte</h4>
                <ul className="space-y-2">
                  <li><Link href="/faq" className="text-gray-400 hover:text-yellow-500">FAQ</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-yellow-500">Contacto</Link></li>
                  <li><Link href="/terms" className="text-gray-400 hover:text-yellow-500">Términos</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 LoL Skin Store. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
