"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
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
    <>
    <section className="bg-gradient-to-b from-[#FFE9E5] to-[#FFFFFF] py-16">
      <div className="max-w-[1024px] mx-auto px-4 items-center">
        {/* Image Carousel */}
        <div className="rounded-lg overflow-hidden shadow-md mb-8">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            speed={1400}
            allowTouchMove={false}
          >
            <SwiperSlide>
              <img src="/images/clinic-reception.png" alt="Clinic Reception" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/treatment-room.png" alt="Treatment Room" />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Text Content */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-[#B97A65] mb-4">
            About Us
          </h2>
          <p className="leading-relaxed text-justify mb-5">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni,
            eius error aliquam similique odio, doloremque ipsa non ipsam quaerat
            vero ducimus quia a? Odit possimus dolor eum rem? Veritatis facilis
            blanditiis dolor minima numquam quas officia dignissimos nostrum
            molestias dolore ab, temporibus earum porro accusamus tempora unde
            ea, similique perspiciatis.
          </p>
          <p className="leading-relaxed text-justify mb-1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi in
            voluptas veniam pariatur ullam amet aliquam nostrum? Eum obcaecati
            magni ipsum odio praesentium numquam cum blanditiis soluta cumque
            nemo minima, ducimus iste? Suscipit, beatae quae quos at facere
            dicta ab. Ullam perspiciatis ratione animi tempora quod, illum
            possimus dignissimos! Corrupti!
          </p>
        </div>
      </div>
    </section>
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-[48px] space-y-10">
      <section>
        <div className="self-stretch text-center justify-start text-token-color-main-button-color text-2xl md:text-4xl font-normal font-['Montserrat'] text-[#AF674F] mb-12">
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
                <div className="w-full max-w-lg mt-4 px-4">
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
    </>
  );
}


