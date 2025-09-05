"use client";
import Image from "next/image";
import Link from "next/link";
import { Service } from "@/types/content";

export default function ServiceCard({ item }: { item: Service }) {
  return (
    <article className="rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,.08)] overflow-hidden flex flex-col">
      {/* Image (uniform height, fills frame) */}
      <Image
        src={item.image}
        alt={item.name}
        width={640}
        height={480}
        className="w-full h-56 object-cover"   // was h-48 → a bit taller
        priority={false}
      />

      {/* Content — closer to photo */}
      <div className="px-4 pb-4 pt-2 flex flex-col">
        <h3 className="font-semibold text-neutral-900">{item.name}</h3>

        {item.summary && (
          <p className="mt-1 text-sm text-neutral-600 break-words line-clamp-2">
            {item.summary}
          </p>
        )}

        {/* Right-aligned small pill button */}
        <div className="mt-3 flex justify-end">
          <Link
            href={`/services/${item.slug}`}
            className="px-4 py-2 rounded-full text-sm font-medium bg-[#b87a63] text-white shadow-sm hover:opacity-90 transition"
          >
            View Detail
          </Link>
        </div>
      </div>
    </article>
  );
}
