import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import SectionIndicator from "@/components/SectionIndicator";
import Globe from "@/components/globe";
import AboutCompany from "@/components/about-company";
import Showcase from "@/components/showcase";
import Services from "@/components/services";
import CargoTypes from "@/components/cargo-types";
import Process from "@/components/process";
import Comparison from "@/components/comparison";
import MachineryCatalog from "@/components/machinery";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/faq";
import CTA from "@/components/CTA";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/whatsapp-button";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <SectionIndicator />
      <Globe />
      <AboutCompany />
      <Showcase />
      <Services />
      <CargoTypes />
      <Process />
      <Comparison />
      <MachineryCatalog />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
