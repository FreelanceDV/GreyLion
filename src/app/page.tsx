import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SectionIndicator from "@/components/SectionIndicator";
import Globe from "@/components/globe";
import AboutCompany from "@/components/AboutCompany";
import Showcase from "@/components/Showcase";
import Services from "@/components/services";
import CargoTypes from "@/components/CargoTypes";
import Process from "@/components/Process";
import Comparison from "@/components/Comparison";
import MachineryCatalog from "@/components/machinery";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/faq";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

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
