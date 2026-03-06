import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { ClientsSection } from "@/components/clients-section";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-16 md:pt-20">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ClientsSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
