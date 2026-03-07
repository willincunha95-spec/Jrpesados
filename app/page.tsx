import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ClientsCarousel } from "@/components/clients-carousel"
import { EquipmentCatalog } from "@/components/equipment-catalog"
import { ServicesSection } from "@/components/services-section"
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
      <ClientsCarousel />
      <EquipmentCatalog />
      <ServicesSection />
      <QuoteForm />
      <WorkWithUs />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
