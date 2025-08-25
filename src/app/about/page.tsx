"use client";
import Slider from "@/components/slider/VerticalSlider";
import DoctorCard from "@/components/cards/DoctorCard";
import { doctors } from "@/data/doctors";

export default function About() {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-[48px] space-y-10">
      <section>
        <h2 className="mb-3 text-lg font-semibold text-center">
          Meet Our Doctors
        </h2>
        <div className="w-full flex justify-center items-center">
          <Slider
            items={doctors}
            renderItem={(doc: (typeof doctors)[0]) => (
              <div className="flex justify-center items-center w-[1110px] h-[723px] mx-auto">
                <DoctorCard doctor={doc} />
              </div>
            )}
            loop
          />
        </div>
      </section>
    </div>
  );
}
