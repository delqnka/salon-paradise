import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhyUs from "@/components/WhyUs";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";
import CallButton from "@/components/CallButton";
import { fetchSalon } from "@/lib/clicka";

export const revalidate = 60;

export default async function Home() {
  const salon = await fetchSalon();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhyUs />
        <Services services={salon?.services} />
        <Gallery />
        <Testimonials />
        <BookingSection />
      </main>
      <Footer />
      <CallButton />
    </>
  );
}
