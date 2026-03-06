import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { EquipmentCatalog } from "@/components/equipment-catalog"
import { ServicesSection } from "@/components/services-section"
import { QuoteForm } from "@/components/quote-form"
import { WorkWithUs } from "@/components/work-with-us"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <EquipmentCatalog />
      <ServicesSection />
      <QuoteForm />
      <WorkWithUs />
      <Footer />
    </main>
  )
}
