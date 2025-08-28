"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

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
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={perView}
        spaceBetween={space}
        breakpoints={breakpoints}
        loop={loop}
        className={className}
        navigation={true}
        pagination={{ clickable: true }}
      >
        {items.map((it, i) => (
          <SwiperSlide key={i}>{renderItem(it, i)}</SwiperSlide>
        ))}

      </Swiper>
    </div>
  );
}
