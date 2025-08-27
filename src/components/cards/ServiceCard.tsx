"use client";

import Image from "next/image";
import Link from "next/link";
import { Service } from "@/types/content";

export default function ServiceCard({ item }: { item: Service }) {
  return (
    <article className="max-w-xs mx-auto rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,.08)] overflow-hidden flex flex-col">
      {/* Image on top, smaller fixed height */}
      <Image
        src={item.image}
        alt={item.name}
        width={320}
        height={240}
        className="w-full h-36 sm:h-40 lg:h-44 object-cover"
      />

      {/* Content below image */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-neutral-900 text-sm sm:text-base">
          {item.name}
        </h3>

        {item.summary && (
          <p className="mt-1 text-xs sm:text-sm text-neutral-600">
            {item.summary}
          </p>
        )}

        {item.price && (
          <div className="mt-2 text-sm font-medium text-[#b87a63]">
            ฿{item.price.toLocaleString()}
          </div>
        )}

        {/* Spacer pushes button down */}
        <div className="flex-1" />

        <Link
          href={`/services/${item.slug}`}
          className="mt-3 inline-block px-3 py-1.5 rounded-full text-xs sm:text-sm bg-[#b87a63] text-white hover:opacity-90 transition"
        >
          View Detail
        </Link>
      </div>
    </article>
  );
}
