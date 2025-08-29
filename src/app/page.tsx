// app/page.tsx
"use client";
import Hero from "@/components/Hero";
import Slider from "@/components/slider/Slider";
import ServiceCard from "@/components/cards/ServiceCard";
import { services } from "@/data/services";

export default function Home() {
  return (
    <>
      <Hero /> 
      
      <div className="container-narrow space-y-12 py-8 md:space-y-16">
        <section>
          <h2 className="mb-3 text-lg font-semibold">Our Services</h2>
          <Slider items={services} renderItem={(s) => <ServiceCard item={s} />} />
        </section>
      </div>
    </>
  );
}
