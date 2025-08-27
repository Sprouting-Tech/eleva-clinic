"use client";

import Slider from "@/components/slider/Slider";
import Image from "next/image";
import Link from "next/link";
import { promotions } from "@/data/promotions";

export default function PromotionsSection() {
  return (
    <section>
      <h2 className="text-center mb-6 text-xl font-semibold text-[#b87a63]">
        Promotions
      </h2>
      <Slider
        items={promotions}
        inlineControls        // show custom row with arrows + dots
        controls              // enable controls
        pagination            // activate dots
        controlsId="promotions"  // unique id for dots container
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
  );
}
