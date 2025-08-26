"use client";
import Slider from "@/components/slider/Slider";
import ServiceCard from "@/components/cards/ServiceCard";
import { services } from "@/data/services";
import { promotions } from "@/data/promotions";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container-narrow space-y-14 py-8">
      {/* ✅ Promotions first */}
      <section>
        <h2 className="text-center mb-6 text-xl font-semibold text-[#b87a63]">
          Promotions
        </h2>
        <Slider
          items={promotions}
          perView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          loop
          renderItem={(p) => (
            <div className="mx-auto max-w-[480px]">
              <div className="rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,.08)] bg-white overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  width={500}
                  height={500}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-base font-semibold">{p.title}</h3>
                  {p.cta && p.href && (
                    <Link
                      href={p.href}
                      className="inline-block mt-3 px-5 py-2 rounded-xl bg-[#b87a63] text-white font-medium hover:opacity-90 transition"
                    >
                      {p.cta}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        />
      </section>

      {/* ✅ Services second */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Our Services</h2>
        <Slider items={services} renderItem={(s) => <ServiceCard item={s} />} />
      </section>
    </div>
  );
}
