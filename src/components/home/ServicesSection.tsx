"use client";

import Slider from "@/components/slider/Slider";
import ServiceCard from "@/components/cards/ServiceCard";
import { services } from "@/data/services";

export default function ServicesSection() {
  const featured = services.filter((s) => s.featured);

  return (
    <section className="max-w-6xl mx-auto px-4">
      <h2 className="text-center mb-6 text-xl font-semibold text-[#b87a63]">
        Our Services
      </h2>

      {featured.length >= 3 ? (
        <Slider
          items={featured}
          perView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          space={16}
          centered={false}
          loop
          controls={false}
          renderItem={(s) => (
            <div className="w-full max-w-[340px]">
              <ServiceCard item={s} />
            </div>
          )}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured.map((s) => (
            <ServiceCard key={s.id} item={s} />
          ))}
        </div>
      )}
    </section>
  );
}
