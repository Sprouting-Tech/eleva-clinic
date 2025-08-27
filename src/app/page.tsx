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
      {/* Promotions first */}
      <section>
        <h2 className="text-center mb-6 text-xl font-semibold text-[#b87a63]">
          Promotions
        </h2>

     <Slider
        items={promotions}
        inlineControls           // ← ● ● ● →
        renderItem={(p) => (
          <Link href={p.href} className="block">
            <div className="rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,.08)] overflow-hidden">
              <Image
                src={p.image}
                alt={p.alt ?? "Promotion"}
                width={800}
                height={800}
                className="w-full aspect-square object-cover"
              />
            </div>
          </Link>
        )}
      />

      </section>

      {/* Services second */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Our Services</h2>
        <Slider items={services} renderItem={(s, i) => <ServiceCard item={s} />} />
      </section>
    </div>
  );
}
