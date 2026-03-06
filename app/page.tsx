import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { EquipmentCatalog } from "@/components/equipment-catalog"
import { ServicesSection } from "@/components/services-section"
import { QuoteForm } from "@/components/quote-form"
import { WorkWithUs } from "@/components/work-with-us"
import { ClientsCarousel } from "@/components/clients-carousel"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <EquipmentCatalog />
      <ServicesSection />
      <QuoteForm />
      <WorkWithUs />
      <ClientsCarousel />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
