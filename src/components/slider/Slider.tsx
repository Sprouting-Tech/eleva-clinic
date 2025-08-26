"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import * as React from "react";

type SliderProps<T> = {
  items: T[];
  renderItem: (item: T, i: number) => React.ReactNode;
  perView?: number | "auto";
  breakpoints?: Record<number, { slidesPerView: number | "auto" }>;
  loop?: boolean;
  space?: number;
  className?: string;
  navigation?: boolean;   // keep for compatibility
  pagination?: boolean;   // keep for compatibility
  /** Put arrows and dots in ONE row under the slider (← ● ● ● →) */
  inlineControls?: boolean;
};

export default function Slider<T>({
  items,
  renderItem,
  perView = 1.2,
  breakpoints = { 640: { slidesPerView: 1.2 }, 768: { slidesPerView: 1.6 }, 1024: { slidesPerView: 2.1 } },
  loop = true,
  space = 20,
  className,
  navigation = false,
  pagination = false,
  inlineControls = false,
}: SliderProps<T>) {
  const prevRef = React.useRef<HTMLButtonElement | null>(null);
  const nextRef = React.useRef<HTMLButtonElement | null>(null);
  const pagRef  = React.useRef<HTMLDivElement | null>(null);

  return (
    <div className={className}>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={perView}
        breakpoints={breakpoints}
        spaceBetween={space}
        centeredSlides
        loop={loop}
        loopAdditionalSlides={4}
        // watchOverflow as a prop is typed, but we’ll also ensure via params
        watchOverflow={false}
        /* Hook up custom elements & set params BEFORE init */
        onBeforeInit={(swiper) => {
          // bind external controls when inlineControls=true
          if (inlineControls) {
            // @ts-ignore – Swiper allows DOM elements here
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
            // @ts-ignore
            swiper.params.pagination.el = pagRef.current;
          } else {
            // fallback to built-in pagination container
            // @ts-ignore
            swiper.params.pagination.el = ".swiper-pagination";
          }

          // ✅ set loop-related params here to avoid TS red lines
          swiper.params.loopAdditionalSlides = 4;
          swiper.params.watchOverflow = false;
        }}
        navigation={inlineControls ? { enabled: true } : navigation}
        pagination={
          inlineControls
            ? { clickable: true }
            : pagination
            ? { clickable: true }
            : false
        }
        style={inlineControls ? { overflow: "visible" } : undefined}
        className={inlineControls ? "promo-inline" : undefined}
      >
        {items.map((it, i) => (
          <SwiperSlide key={i} className="transition-all duration-300">
            {renderItem(it, i)}
          </SwiperSlide>
        ))}

        {/* default pagination (unused when inlineControls=true) */}
        {!inlineControls && pagination && <div className="swiper-pagination" />}
      </Swiper>

      {/* Inline controls row: ←  ● ● ●  → */}
      {inlineControls && (
        <div className="promo-controls">
          <button ref={prevRef} aria-label="Previous" className="promo-arrow" />
          <div ref={pagRef} className="promo-dots" />
          <button ref={nextRef} aria-label="Next" className="promo-arrow" />
        </div>
      )}
    </div>
  );
}
