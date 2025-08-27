"use client";

import Slider from "@/components/slider/Slider";
import ServiceCard from "@/components/cards/ServiceCard";
import { services } from "@/data/services";
import Link from "next/link";

export default function ServicesSection() {
  const featured = services.filter((s) => s.featured);

  return (
    <section>
      <h2 className="text-center mb-6 text-xl font-semibold text-[#b87a63]">
        Our Services
      </h2>

      {featured.length >= 3 ? (
        <Slider
          items={featured}
          inlineControls
          perView={1}
          breakpoints={{ 768: { slidesPerView: 2 } }}
          loop
          renderItem={(s) => (
            <Link href="/services" className="block">
              <ServiceCard item={s} />
            </Link>
          )}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featured.map((s) => (
            <Link key={s.id} href="/services" className="block">
              <ServiceCard item={s} />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
