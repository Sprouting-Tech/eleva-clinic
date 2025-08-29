"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useId } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type SliderProps<T> = {
  items: T[];
  renderItem: (item: T, i: number) => React.ReactNode;
  perView?: number;
  breakpoints?: Record<number, { slidesPerView: number }>;
  loop?: boolean;
  space?: number;
  className?: string;
};

export default function Slider<T>({
  items,
  renderItem,
  perView = 1,
  breakpoints = { 768: { slidesPerView: 2 } },
  space = 12,
  className,
  loop = false,
}: SliderProps<T>) {
  const id = useId(); // unique id per instance

  return (
    <div id={`slider-${id}`} className="w-full">
      {/* Swiper */}
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={perView}
        spaceBetween={space}
        breakpoints={breakpoints}
        loop={loop}
        className={className}
        navigation={{
          nextEl: `#slider-${id} .review-swiper-next`,
          prevEl: `#slider-${id} .review-swiper-prev`,
        }}
        pagination={{
          el: `#slider-${id} .review-swiper-pagination`,
          clickable: true,
        }}
      >
        {items.map((it, i) => (
          <SwiperSlide key={i}>
              {renderItem(it, i)}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation + Pagination BELOW */}
      <div className="hidden md:flex justify-center items-center gap-6 mt-4">
        <button className="review-swiper-prev px-8 hover:bg-gray-100 transition">
          🡨
        </button>
        <div className="review-swiper-pagination flex justify-center"></div>
        <button className="review-swiper-next px-8 hover:bg-gray-100 transition">
          🡪
        </button>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .review-swiper-pagination .swiper-pagination-bullet {
          background: #d9d9d9;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          opacity: 1;
          transition: transform 1s ease;
          transform: scale(1);

        }
        .review-swiper-pagination .swiper-pagination-bullet-active {
          background: #AF674F;
          width:14px;
          height:14px; /* pink theme color */
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}
