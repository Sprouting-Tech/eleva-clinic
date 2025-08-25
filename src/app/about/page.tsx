"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";


export default function About() {
  return (
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
  );
}
