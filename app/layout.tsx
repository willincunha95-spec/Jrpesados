import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "JR Pesados - Transportes e Logística",
  description:
    "Referência em transporte de cargas pesadas e logística em todo o Brasil. Frota moderna e equipamentos especializados desde 2010.",
  keywords: [
    "transporte pesado",
    "logística",
    "cargas pesadas",
    "caminhões",
    "frete",
    "Brasil",
  ],
};

export const viewport = {
  themeColor: "#1e3a5f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
