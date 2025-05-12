import { MainSidebar } from "@/components/main-sidebar"
import { AboutPage } from "@/components/about-page"

export default function About() {
  return (
    <div className="flex h-screen">
      <MainSidebar />
      <main className="flex-1 overflow-auto">
        <AboutPage />
      </main>
    </div>
  )
}
