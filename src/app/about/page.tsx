"use client";
import { useState } from "react";
import Slider from "@/components/slider/VerticalSlider";
import DoctorCard from "@/components/cards/DoctorCard";
import { doctors } from "@/data/doctors";

export default function About() {
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);
  const [mobileTrainingOpen, setMobileTrainingOpen] = useState<{
    [key: number]: boolean;
  }>({});

  const currentDoctor = doctors[currentDoctorIndex];

  const handleDoctorChange = (index: number) => {
    setCurrentDoctorIndex(index);
    setIsTrainingOpen(false); // Reset accordion when doctor changes
  };

  const handleTrainingToggle = () => {
    setIsTrainingOpen((v) => !v);
  };

  const handleMobileTrainingToggle = (doctorIndex: number) => {
    const isCurrentlyOpen = mobileTrainingOpen[doctorIndex] || false;
    setMobileTrainingOpen((prev) => ({
      ...prev,
      [doctorIndex]: !isCurrentlyOpen,
    }));
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-[48px] space-y-10">
      <section>
        <div className="self-stretch text-center justify-start text-token-color-main-button-color text-2xl md:text-4xl font-normal font-['Montserrat'] text-[#AF674F] mb-6">
          Meet Our Doctors
        </div>
        {/* Desktop: Slider */}
        <div className="w-full flex justify-center items-center hidden lg:flex">
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
              {/* Training Button and Accordion for mobile */}
              {doc.training && doc.training.length > 0 && (
                <div className="w-full max-w-sm mt-4 px-4">
                  <button
                    className="px-4 py-2 w-full flex items-center justify-between rounded-xl bg-[#A86A3D] text-white text-base font-semibold hover:bg-[#8a5630] transition"
                    aria-expanded={mobileTrainingOpen[idx] || false}
                    onClick={() => handleMobileTrainingToggle(idx)}
                  >
                    <span>Training</span>
                    <span className="text-2xl leading-none font-bold">
                      {mobileTrainingOpen[idx] ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                      mobileTrainingOpen[idx]
                        ? "max-h-[9999px] mt-3"
                        : "max-h-0"
                    }`}
                  >
                    <ul className="flex flex-col gap-2 text-[#6B4F3A] px-2">
                      {doc.training?.map((item, trainingIdx) => (
                        <li
                          key={trainingIdx}
                          className="text-sm font-normal font-sans leading-6"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Training Button and Accordion (desktop only) */}
        <div className="w-full max-w-[1110px] mx-auto mt-8 px-4 hidden lg:block">
          <button
            className="px-5 py-2.5 w-full flex items-center justify-between rounded-xl bg-[#A86A3D] text-white text-lg md:text-2xl font-semibold hover:bg-[#8a5630] transition"
            aria-expanded={isTrainingOpen}
            onClick={handleTrainingToggle}
          >
            <span>Training</span>
            <span className="text-3xl md:text-4xl leading-none font-bold">
              {isTrainingOpen ? "−" : "+"}
            </span>
          </button>

          <div
            className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
              isTrainingOpen ? "max-h-[9999px] mt-4" : "max-h-0"
            }`}
          >
            <ul className="flex flex-col gap-2 text-[#6B4F3A] px-2">
              {currentDoctor.training?.map((item, idx) => (
                <li
                  key={idx}
                  className="text-sm md:text-base lg:text-lg font-normal font-sans leading-6 md:leading-7"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
