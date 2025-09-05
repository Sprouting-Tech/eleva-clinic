"use client";

import { doctors } from "@/data/doctors";
import DoctorPreviewCard from "@/components/cards/DoctorPreviewCard";
export default function Treatments() {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 pt-12 md:px-[48px] space-y-10">
      <section>
        <div className="self-stretch text-center justify-start text-token-color-main-button-color text-2xl md:text-4xl font-normal font-['Montserrat'] text-[#AF674F] mb-12">
          Meet Our Doctors
        </div>

        {/* Mobile and Tablet Grid Layout */}
        <div className="lg:hidden grid grid-cols-1 gap-4">
          {doctors.map((doc, idx) => (
            <DoctorPreviewCard key={idx} doctor={doc} />
          ))}
        </div>

        {/* Desktop Stacked Layout */}
        <div className="hidden lg:flex flex-col gap-8">
          {doctors.map((doc, idx) => (
            <div key={idx}>
              <DoctorPreviewCard doctor={doc} />
              {idx < doctors.length - 1 && (
                <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-stone-500/25 mt-8"></div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
