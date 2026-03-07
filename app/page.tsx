import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { NumbersSection } from "@/components/numbers-section"
import { TrustBar } from "@/components/trust-bar"
import { FleetStrip } from "@/components/fleet-strip"
import { AboutSection } from "@/components/about-section"
import { ClientsCarousel } from "@/components/clients-carousel"
import { EquipmentCatalog } from "@/components/equipment-catalog"
import { ServicesSection } from "@/components/services-section"
import { QuoteForm } from "@/components/quote-form"
import { WorkWithUs } from "@/components/work-with-us"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutSection />
      <HeroSection />
      <TrustBar />
      <NumbersSection />
      <FleetStrip />
      <ClientsCarousel />
      <EquipmentCatalog />
      <ServicesSection />
      <QuoteForm />
      <WorkWithUs />
      <Footer />
    </main>
  )
}
