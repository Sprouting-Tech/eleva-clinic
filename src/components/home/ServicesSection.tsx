"use client";

import Slider from "@/components/slider/Slider";
import ServiceCard from "@/components/cards/ServiceCard";
import { services } from "@/data/services";

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
          perView="auto"                       // ⬅️ let the slide width be content-based
          space={-1}                           // ⬅️ tighter gap between slides
          centered={false}                     // ⬅️ pack from the left, no centering
          loop
          controls={false}                     // swipe-only, no arrows/dots
          renderItem={(s) => (
            // ⬅️ Fixed slide widths so cards are compact
            <div className="w-[260px] sm:w-[280px] md:w-[300px]">
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
