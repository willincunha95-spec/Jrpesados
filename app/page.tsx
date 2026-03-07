import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { StatsSection } from "@/components/stats-section"
import { ServicesSection } from "@/components/services-section"
import { EquipmentCatalog } from "@/components/equipment-catalog"
import { ClientsCarousel } from "@/components/clients-carousel"
import { QuoteForm } from "@/components/quote-form"
import { WorkWithUs } from "@/components/work-with-us"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <ServicesSection />
      <EquipmentCatalog />
      <ClientsCarousel />
      <QuoteForm />
      <WorkWithUs />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
