"use client";

import React from "react";
import { Doctor } from "@/types/content";
import Image from "next/image";

interface DoctorCardProps {
  doctor: Doctor;
  direction?: "up" | "down";
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  direction = "up",
}) => {
  return (
    <>
      <style jsx>{`
        @keyframes slideUpFade {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes slideDownFade {
          from {
            transform: translateY(-30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes imageFadeScale {
          from {
            opacity: 0.6;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
      <div className="w-full bg-[#f9f4f2] pt-6 px-6 flex flex-col gap-8">
        {/* Desktop Layout - Hidden on mobile and tablet */}
        <div className="hidden lg:block transition-all duration-700 ease-in-out">
          {/* Top Grid: Image + Info */}
          <div className="grid grid-cols-4 gap-8 items-center transition-all duration-700 ease-in-out">
            {/* Left: Image */}
            <div className="col-span-2 relative w-[420px] h-[520px] flex items-center justify-center mx-auto">
              <div
                className="absolute left-0 top-0 w-full h-full rounded-2xl"
                style={{
                  background:
                    "radial-gradient(circle at 60% 40%, #f7d7c2 0%, #f9f4f2 80%)",
                  filter: "blur(40px)",
                  zIndex: 0,
                }}
              />
              <Image
                src={doctor.image}
                alt={doctor.name}
                width={420}
                height={520}
                className="relative z-10 w-[420px] h-[520px] object-cover rounded-2xl"
                style={{
                  animation:
                    "imageFadeScale 1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
                }}
              />
            </div>

            {/* Right: Info */}
            <div
              key={`${doctor.id}-${direction}`}
              className="col-span-2 text-black text-left flex flex-col justify-center"
              style={{
                animation:
                  direction === "up"
                    ? "slideUpFade 0.8s ease-out forwards"
                    : "slideDownFade 0.8s ease-out forwards",
              }}
            >
              <div className="self-stretch inline-flex flex-col justify-center items-start gap-12">
                <div className="self-stretch flex flex-col justify-start items-start gap-4">
                  <div className="self-stretch flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch justify-center text-[#A86A3D] text-5xl font-bold font-['DM_Sans']">
                      {doctor.name}
                    </div>
                    {doctor.nickname && (
                      <div className="self-stretch justify-center text-[#A86A3D] text-3xl font-light font-['DM_Sans']">
                        ({doctor.nickname})
                      </div>
                    )}
                  </div>
                  {doctor.description && (
                    <div className="self-stretch justify-center text-black text-xl font-normal font-['DM_Sans'] tracking-wide">
                      {doctor.description}
                    </div>
                  )}
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-4">
                  <div className="self-stretch justify-center text-[#A86A3D] text-3xl font-bold font-['DM_Sans']">
                    Study
                  </div>
                  {doctor.study?.map((item, idx) => (
                    <div
                      key={idx}
                      className="self-stretch inline-flex justify-start items-start gap-2.5"
                    >
                      <div className="w-3.5 h-3.5 bg-[#6B4F3A] rounded-full border-[3.20px] border-[#A86A3D] flex-shrink-0 mt-1"></div>
                      <div className="flex-1 justify-center text-black text-xl font-medium font-['DM_Sans'] tracking-wide">
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout - Hidden on desktop */}
        <div className="lg:hidden flex flex-col items-center gap-4 transition-all duration-500 w-full">
          {/* Image Container */}
          <div className="relative w-full aspect-[3/4] max-w-sm flex items-center justify-center">
            <div
              className="absolute left-0 top-0 w-full h-full rounded-2xl"
              style={{
                background:
                  "radial-gradient(circle at 60% 40%, #f7d7c2 0%, #f9f4f2 80%)",
                filter: "blur(40px)",
                zIndex: 0,
              }}
            />
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{ zIndex: 1 }}
            >
              <Image
                src={doctor.image}
                alt={doctor.name}
                fill
                className="object-cover rounded-2xl"
                style={{
                  objectPosition: "center 30%",
                  animation:
                    "imageFadeScale 1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
                }}
              />
            </div>
          </div>

          {/* Doctor Info and Study Section */}
          <div
            key={`mobile-${doctor.id}-${direction}`}
            className="w-full max-w-sm flex flex-col justify-start items-start gap-2 p-4"
            style={{
              animation:
                direction === "up"
                  ? "slideUpFade 0.8s ease-out forwards"
                  : "slideDownFade 0.8s ease-out forwards",
            }}
          >
            <div className="w-full flex flex-col justify-start items-center gap-2">
              <div className="w-full text-center text-[#AF674F] text-lg font-bold font-['DM_Sans']">
                {doctor.name}
              </div>
              {doctor.nickname && (
                <div className="w-full text-center text-[#AF674F] text-base font-light font-['DM_Sans']">
                  ({doctor.nickname})
                </div>
              )}
            </div>
            {doctor.description && (
              <div className="w-full text-left text-black text-sm font-light font-['DM_Sans'] leading-relaxed">
                {doctor.description}
              </div>
            )}
            <div className="w-full text-left text-[#AF674F] text-base font-bold font-['DM_Sans']">
              Study
            </div>
            {doctor.study?.map((item, idx) => (
              <div
                key={idx}
                className="w-full flex justify-start items-center gap-2.5"
              >
                <div className="w-2 h-2 bg-[#A86A3D] rounded-full flex-shrink-0"></div>
                <div className="flex-1 text-black text-sm font-medium font-['DM_Sans'] tracking-wide leading-relaxed">
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorCard;
