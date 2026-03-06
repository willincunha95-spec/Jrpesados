import Link from "next/link";
import { MapPin, Mail, Phone, Instagram, Linkedin, Facebook } from "lucide-react";

const contactInfo = {
  address: "Rua José Marques Ribeiro, 480 - Guaturinho, Cajamar",
  emails: [
    { label: "Financeiro", email: "jrpesadoslog@hotmail.com" },
    { label: "Locações", email: "jrpesados@jrpesados.com" },
  ],
  phone: "+55 11 95857-2567",
};

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/jrpesadostransportes",
    icon: Instagram,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/jrpesados",
    icon: Linkedin,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/jrpesados",
    icon: Facebook,
  },
];

const quickLinks = [
  { href: "/", label: "Início" },
  { href: "#sobre", label: "Sobre Nós" },
  { href: "#servicos", label: "Serviços" },
  { href: "#contato", label: "Contato" },
];

export function Footer() {
  return (
    <footer id="contato" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl font-bold text-secondary">JR</span>
              <span className="text-xl font-semibold">Pesados</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Transporte de cargas pesadas e logística com excelência e
              compromisso em todo o Brasil.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Links Rápidos</h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Contato</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  {contactInfo.address}
                </span>
              </li>
              {contactInfo.emails.map((item) => (
                <li key={item.email} className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-xs text-primary-foreground/60">
                      {item.label}
                    </span>
                    <a
                      href={`mailto:${item.email}`}
                      className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm"
                    >
                      {item.email}
                    </a>
                  </div>
                </li>
              ))}
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <a
                  href="https://wa.me/5511958572567"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm"
                >
                  {contactInfo.phone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Redes Sociais</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-secondary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-6 py-6">
          <p className="text-center text-primary-foreground/60 text-sm">
            {new Date().getFullYear()} JR Pesados Transportes e Logística. Todos
            os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
