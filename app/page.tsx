import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { ClientsSection } from "@/components/clients-section";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function HomePage() {
  // Exemplo de usuário logado (para demonstrar o menu do usuário)
  // Na implementação real, isso viria do estado de autenticação
  const mockUser = null; // Altere para { name: "João Silva", role: "ROLE_CLIENT" as const } para testar

  return (
    <>
      <Header user={mockUser} />
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
