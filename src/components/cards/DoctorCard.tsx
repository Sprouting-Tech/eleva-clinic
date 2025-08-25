import React from "react";
import { Doctor } from "@/types/content";
import Image from "next/image";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => (
  <div className="w-full flex justify-center items-center bg-[#f9f4f2] py-12">
    <div
      className="w-[1400px] flex flex-row items-center gap-12 px-8 py-10 rounded-2xl relative"
      style={{ background: "rgba(255,255,255,0.7)" }}
    >
      <div className="relative w-[420px] h-[520px] flex-shrink-0 flex items-center justify-center">
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
        />
      </div>
      <div className="flex-1 flex flex-col justify-center items-start gap-8">
        <div className="flex flex-col gap-2">
          <div className="text-[#A86A3D] text-5xl font-bold font-sans leading-tight">
            {doctor.name}
          </div>
          {doctor.nickname && (
            <div className="text-[#A86A3D] text-3xl font-light font-sans">
              ({doctor.nickname})
            </div>
          )}
        </div>
        {doctor.description && (
          <div className="text-[#6B4F3A] text-xl font-normal font-sans tracking-wide mb-2">
            {doctor.description}
          </div>
        )}
        <div className="flex flex-col gap-4 w-full">
          <div className="text-[#A86A3D] text-3xl font-bold font-sans mb-2">
            Study
          </div>
          <ul className="flex flex-col gap-3">
            {doctor.study?.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-2 w-3 h-3 rounded-full bg-[#A86A3D] inline-block flex-shrink-0"></span>
                <span className="text-[#6B4F3A] text-xl font-medium font-sans">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <button className="mt-6 px-8 py-3 bg-[#A86A3D] text-white rounded-full font-semibold text-xl hover:bg-[#8a5630] transition self-start">
          Training
        </button>
      </div>
    </div>
  </div>
);

export default DoctorCard;
