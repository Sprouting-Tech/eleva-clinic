"use client";

import Image from "next/image";
import Link from "next/link";
import { Service } from "@/types/content";

export default function ServiceCard({ item }: { item: Service }) {
  return (
    <article className="rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,.08)] overflow-hidden flex flex-col">
      {/* Image on top */}
      <Image
        src={item.image}
        alt={item.name}
        width={640}
        height={480}
        className="w-full aspect-[4/3] object-cover"
      />

      {/* Content below image */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-neutral-900">{item.name}</h3>

        {item.summary && (
          <p className="mt-1 text-sm text-neutral-600">{item.summary}</p>
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
          className="mt-4 inline-block px-4 py-2 rounded-full text-sm bg-[#b87a63] text-white hover:opacity-90 transition"
        >
          View Detail
        </Link>
      </div>
    </article>
  );
}
