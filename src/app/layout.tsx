import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GreyLion Maritime | Líderes en Logística Marítima Internacional",
  description: "Operador logístico global especializado en fletamento marítimo y gestión portuaria integral, Soluciones y Suministro en Maquinaria Pesada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="max-w-[100vw] overflow-x-hidden bg-background-dark text-text-white font-inter antialiased">{children}</body>
    </html>
  );
}
