"use client";

import React from "react";
import { Doctor } from "@/types/content";
import Image from "next/image";

export default function DoctorPreviewCard({ doctor }: { doctor: Doctor }) {
  // Shared image background component
  const ImageBackground = () => (
    <div
      className="absolute left-0 top-0 w-full h-full rounded-2xl"
      style={{
        background:
          "radial-gradient(circle at 60% 40%, #f7d7c2 0%, #f9f4f2 80%)",
        filter: "blur(40px)",
        zIndex: 0,
      }}
    />
  );

  // Shared doctor image component
  const DoctorImage = ({ className }: { className: string }) => (
    <div className={`relative flex items-center justify-center ${className}`}>
      <ImageBackground />
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ zIndex: 1 }}
      >
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          className="object-cover lg:object-contain rounded-2xl"
          style={{
            objectPosition: "center top",
            animation:
              "imageFadeScale 1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          }}
        />
      </div>
    </div>
  );

  // Shared doctor info component
  const DoctorInfo = ({ className }: { className: string }) => (
    <div className={className}>
      <div className="w-full lg:w-auto flex flex-col justify-start items-center lg:items-start gap-2 lg:gap-2">
        <div className="w-full lg:w-auto text-center lg:text-left text-[#AF674F] text-lg sm:text-xl lg:text-3xl font-bold lg:font-semibold font-['DM_Sans']">
          {doctor.name}
        </div>
        {doctor.nickname && (
          <div className="w-full lg:w-auto text-center lg:text-left text-[#AF674F] text-base sm:text-lg lg:text-3xl font-light lg:font-normal font-['DM_Sans']">
            ({doctor.nickname})
          </div>
        )}
      </div>
      {doctor.description && (
        <div className="w-full lg:w-auto text-left text-black text-sm sm:text-base lg:text-2xl font-light font-['DM_Sans'] leading-relaxed mt-4 lg:mt-5">
          {doctor.description}
        </div>
      )}
    </div>
  );

  // Shared CTA button component
  const CTAButton = () => (
    <div className="w-full lg:w-auto flex justify-center lg:justify-start mt-2 lg:mt-0">
      <div className="px-6 py-3 bg-gradient-to-r from-[#AF674F] via-[#E28E72] to-[#AF674F] rounded-[100px] inline-flex justify-center items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity">
        <div className="text-center justify-start text-white text-sm lg:text-sm font-medium font-['DM_Sans']">
          Make Appointment
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Responsive Layout */}
      <div className="w-full px-4 sm:px-6 lg:px-3 py-3 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-4 lg:gap-24 transition-all duration-500">
        {/* Doctor Image */}
        <DoctorImage className="w-full aspect-[3/4] max-w-xs sm:max-w-sm lg:w-[464px] lg:h-96 lg:max-w-none lg:aspect-auto" />

        {/* Content Section */}
        <div className="w-full max-w-xs sm:max-w-sm lg:max-w-none lg:flex-1 lg:h-96 flex flex-col justify-start lg:justify-center items-start gap-4 lg:gap-5 p-4 lg:p-0">
          <div className="w-full lg:self-stretch flex flex-col justify-center lg:justify-center items-end lg:items-end gap-4 lg:gap-8">
            <div className="w-full lg:self-stretch flex flex-col justify-start items-start gap-4 lg:gap-4">
              <div className="w-full lg:self-stretch flex flex-col justify-start items-start gap-4 lg:gap-5">
                <DoctorInfo className="w-full lg:self-stretch flex flex-col justify-start items-start gap-2 lg:gap-2" />
              </div>
            </div>
            <CTAButton />
          </div>
        </div>
      </div>
    </div>
  );
}
