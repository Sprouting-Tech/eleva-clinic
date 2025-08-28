"use client";
import Image from "next/image";
import { Doctor } from "@/types/content";

export default function DoctorCard({ item }: { item: Doctor }) {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col lg:flex-row rounded-3xl shadow-lg overflow-hidden">
      {/* LEFT SIDE (Image) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
        <Image
          src={item.image}
          alt={item.slug}
          width={300}
          height={300}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* RIGHT SIDE (Text) */}
      <div className="w-full lg:w-1/2 bg-rose-100 p-6 flex flex-col justify-center">
        <h4 className="text-lg font-bold text-gray-900">{item.name}</h4>
        <p className="text-gray-700 text-base mt-2">{item.text}</p>
      </div>
    </div>
  );
}
