"use client";

import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { doctors } from "@/data/doctors";
import { Doctor } from "@/types/content";
import BookingForm from "@/components/BookingForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface Props {
  params: { slug: string };
}

export default function DoctorProfilePage({ params }: Props) {
  const router = useRouter();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Unwrap params (Next.js 15+)
  const { slug } = params;
  // Find doctor by slug
  const doctor: Doctor | undefined = doctors.find((doc) => doc.slug === slug);

  // If doctor not found, show 404
  if (!doctor) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-stone-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Doctor Header Section */}
            <div className="p-8 md:p-12">
              {/* Back Button - Top Left */}
              <div className="flex justify-start mb-6">
                <Button
                  variant="ghost"
                  onClick={() => router.back()}
                  className="flex items-center gap-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full px-4 py-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
              </div>

              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Doctor Image */}
                <div className="flex-shrink-0">
                  <div className="relative w-80 h-96 mx-auto lg:mx-0">
                    <div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background:
                          "radial-gradient(circle at 60% 40%, #f7d7c2 0%, #f9f4f2 80%)",
                        filter: "blur(40px)",
                      }}
                    />
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      className="object-cover rounded-2xl relative z-10"
                      style={{ objectPosition: "center top" }}
                    />
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="flex-1 space-y-6">
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-[#AF674F] mb-2">
                      {doctor.name}
                    </h1>
                    {doctor.nickname && (
                      <p className="text-2xl lg:text-3xl font-light text-[#AF674F] mb-4">
                        ({doctor.nickname})
                      </p>
                    )}
                    {doctor.title && (
                      <p className="text-xl lg:text-2xl font-medium text-stone-600 mb-6">
                        {doctor.title}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  {doctor.description && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-semibold text-stone-800">
                        About
                      </h2>
                      <p className="text-lg text-stone-700 leading-relaxed">
                        {doctor.description}
                      </p>
                    </div>
                  )}

                  {/* Book Appointment Button */}
                  <div className="pt-6">
                    <Button
                      onClick={() => setIsBookingModalOpen(true)}
                      size="lg"
                      className="px-8 py-4 bg-gradient-to-r from-[#AF674F] via-[#E28E72] to-[#AF674F] rounded-full text-white font-medium hover:opacity-90 transition-opacity"
                    >
                      Book Appointment
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Education & Training Sections */}
            <div className="bg-stone-50 p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Education */}
                {doctor.study && doctor.study.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-stone-800 mb-6">
                      Education
                    </h2>
                    <ul className="space-y-3">
                      {doctor.study.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-stone-700"
                        >
                          <span className="w-2 h-2 bg-[#AF674F] rounded-full mt-2 flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Training & Certifications */}
                {doctor.training && doctor.training.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-stone-800 mb-6">
                      Training & Certifications
                    </h2>
                    <div className="max-h-96 overflow-y-auto pr-2">
                      <ul className="space-y-3">
                        {doctor.training.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-stone-700"
                          >
                            <span className="w-2 h-2 bg-[#AF674F] rounded-full mt-2 flex-shrink-0" />
                            <span className="leading-relaxed text-sm">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingForm
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}
