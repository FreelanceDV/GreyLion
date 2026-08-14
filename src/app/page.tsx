import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SectionIndicator from "@/components/SectionIndicator";
import Globe from "@/components/Globe";
import AboutCompany from "@/components/AboutCompany";
import Showcase from "@/components/Showcase";
import CargoTypes from "@/components/CargoTypes";
import Process from "@/components/Process";
import Comparison from "@/components/Comparison";
import MachineryCatalog from "@/components/MachineryCatalog";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
      <Navbar />
      <Hero />
      <SectionIndicator />
      <Globe />
      <AboutCompany />
      <Showcase />
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
