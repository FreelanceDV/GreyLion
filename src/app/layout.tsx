import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL 
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` 
  : process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'https://greylionmaritime.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "GreyLion | Transporte Marítimo y Logística",
  description: "Soluciones logísticas globales, fletamento de buques, aduanas, logística integral puerta a puerta y maquinaria pesada. Conectamos tu carga con el mundo.",
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
  authors: [{ name: "GreyLion" }],
  creator: "GreyLion",
  publisher: "GreyLion",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "GreyLion | Transporte Marítimo y Logística",
    description: "Transporte marítimo global, fletamento de buques, aduanas, logística integral y maquinaria pesada.",
    url: "/",
    siteName: "GreyLion",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GreyLion - Transporte Marítimo y Logística",
      },
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "GreyLion Logo",
      }
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GreyLion | Transporte Marítimo y Logística",
    description: "Transporte marítimo global, fletamento de buques, aduanas, logística integral y maquinaria pesada.",
    images: ["/og-image.png"],
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
  const contactPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE 
    ? `+${process.env.NEXT_PUBLIC_WHATSAPP_PHONE}` 
    : '+573001234567';
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@greylionmaritime.com';

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GreyLion",
    "alternateName": "GreyLion Maritime",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "description": "Operador logístico global especializado en transporte marítimo, fletamento de buques, aduanas, logística integral y suministro de maquinaria pesada.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": contactPhone,
      "contactType": "customer service",
      "email": contactEmail,
      "availableLanguage": ["Spanish", "English"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/greylion"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Logística y Suministro",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Transporte Marítimo Internacional",
            "description": "Logística marítima global y fletamento de buques (chartering) para cargas sobredimensionadas y contenedores."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Logística Integral",
            "description": "Operaciones puerta a puerta (door-to-door), agenciamiento de aduanas, almacenamiento, depósitos y conexión terrestre."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Suministro de Maquinaria Pesada",
            "description": "Alquiler y suministro de maquinaria pesada especializada para construcción, excavación, compactación y carga."
          }
        }
      ]
    }
  };

  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className="max-w-[100vw] overflow-x-hidden bg-background-dark text-text-white font-inter antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
