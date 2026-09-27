import { supabase } from "@/lib/supabase";
import type { Barber, Service } from "@/lib/supabase";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Barbers from "@/components/Barbers";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export const revalidate = 60;

export default async function Home() {
  const [{ data: services }, { data: barbers }] = await Promise.all([
    supabase.from("services").select("*").order("sort_order"),
    supabase.from("barbers").select("*").order("sort_order"),
  ]);

  const serviceList = (services ?? []) as Service[];
  const barberList = (barbers ?? []) as Barber[];

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services services={serviceList} />
        <Barbers barbers={barberList} />
        <Gallery />
        <About />
        <BookingForm services={serviceList} barbers={barberList} />
      </main>
      <Footer />
    </>
  );
}
