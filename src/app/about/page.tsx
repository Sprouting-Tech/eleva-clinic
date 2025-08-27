"use client";
import { useState } from "react";
import Slider from "@/components/slider/VerticalSlider";
import DoctorCard from "@/components/cards/DoctorCard";
import { doctors } from "@/data/doctors";
import { TrainingAccordion } from "@/components/accordion/TrainingAccordion";

export default function About() {
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);
  const currentDoctor = doctors[currentDoctorIndex];
  const handleDoctorChange = (index: number) => {
    setCurrentDoctorIndex(index);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-[48px] space-y-10">
      <section>
        <div className="self-stretch text-center justify-start text-token-color-main-button-color text-2xl md:text-4xl font-normal font-['Montserrat'] text-[#AF674F] mb-6">
          Meet Our Doctors
        </div>
        {/* Desktop: Slider */}
        <div className="w-full justify-center items-center hidden lg:flex">
          <Slider
            items={doctors}
            renderItem={(
              doc: (typeof doctors)[0],
              direction?: "up" | "down",
            ) => (
              <div className="flex justify-center items-center w-full max-w-[1110px] min-h-[400px] lg:h-[723px] mx-auto px-4">
                <DoctorCard doctor={doc} direction={direction} />
              </div>
            )}
            loop
            onIndexChange={handleDoctorChange}
          />
        </div>
        {/* Mobile/Tablet: Show all doctors */}
        <div className="w-full flex flex-col gap-8 lg:hidden">
          {doctors.map((doc, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center w-full mx-auto px-2"
            >
              <DoctorCard doctor={doc} />
              {doc.training && doc.training.length > 0 && (
                <div className="w-full max-w-sm mt-4 px-4">
                  <TrainingAccordion items={doc.training} />
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Training Button and Accordion (desktop only) */}
        <div className="w-full max-w-[1110px] mx-auto mt-8 px-4 hidden lg:block">
          <TrainingAccordion
            items={
              currentDoctor.training && currentDoctor.training.length > 0
                ? currentDoctor.training
                : ["No training info available."]
            }
            className=""
          />
        </div>
      </section>
    </div>
  );
}
