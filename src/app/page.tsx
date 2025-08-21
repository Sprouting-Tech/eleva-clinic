"use client";
import Slider from "@/components/slider/Slider";
import ServiceCard from "@/components/cards/ServiceCard";
import { services } from "@/data/services";

export default function Home() {
  return (
    <div className="container-narrow space-y-10 py-8">
      {/* Hero ... */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Our Services</h2>
        <Slider items={services} renderItem={(s) => <ServiceCard item={s} />} />
      </section>
    </div>
  );
}
