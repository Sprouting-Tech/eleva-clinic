"use client";
import { Swiper, SwiperSlide } from "swiper/react";

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
}: SliderProps<T>) {
  return (
    <Swiper
      slidesPerView={perView}
      spaceBetween={space}
      breakpoints={breakpoints}
      loop
      className={className}
    >
      {items.map((it, i) => (
        <SwiperSlide key={i}>{renderItem(it, i)}</SwiperSlide>
      ))}
    </Swiper>
  );
}
