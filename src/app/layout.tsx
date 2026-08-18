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
  metadataBase: new URL('https://greylionmaritime.com'),
  title: "GreyLion Maritime | Transporte Marítimo y Logística Internacional",
  description: "Soluciones logísticas marítimas globales, fletamento de buques (chartering), agenciamiento de aduanas, logística integral puerta a puerta y suministro de maquinaria pesada. Conectamos tu carga con el mundo.",
  keywords: [
    "logística marítima",
    "fletamento de buques",
    "transporte marítimo internacional",
    "agenciamiento de aduanas",
    "almacenamiento portuario",
    "maquinaria pesada",
    "carga sobredimensionada",
    "operador logístico integral",
    "GreyLion Maritime",
    "transporte intermodal",
    "puertos marítimos"
  ],
  authors: [{ name: "GreyLion Maritime" }],
  creator: "GreyLion Maritime",
  publisher: "GreyLion Maritime",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "GreyLion Maritime | Transporte Marítimo y Logística Internacional",
    description: "Operador logístico global especializado en fletamento marítimo, logística integral puerta a puerta y suministro de maquinaria pesada. Conectamos tu carga eficientemente.",
    url: "/",
    siteName: "GreyLion Maritime",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 800,
        alt: "GreyLion Maritime Logo",
      },
      {
        url: "/hero_ship_oceanis.png",
        width: 1200,
        height: 630,
        alt: "GreyLion Maritime - Logística Marítima Global",
      }
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GreyLion Maritime | Transporte Marítimo y Logística Internacional",
    description: "Operador logístico global especializado en fletamento marítimo, logística integral puerta a puerta y suministro de maquinaria pesada.",
    images: ["/hero_ship_oceanis.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
