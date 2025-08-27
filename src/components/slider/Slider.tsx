"use client";

import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules"; // no Navigation
import type { Swiper as SwiperCore } from "swiper/types";
import "swiper/css";
import "swiper/css/pagination";

type SliderProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  perView?: number | "auto";
  breakpoints?: Record<number, { slidesPerView: number | "auto" }>;
  space?: number;
  className?: string;

  // Controls/dots
  pagination?: boolean;      // internal dots when inlineControls = false
  inlineControls?: boolean;  // custom row: ←  ● ● ●  →
  controls?: boolean;        // ✅ master switch (no arrows/dots when false)

  // Optional extras (kept for flexibility)
  loop?: boolean;            // per-usage loop (default off)
  controlsId?: string;       // unique dots target when inlineControls
  centered?: boolean;        // centered slides or not
};

export default function Slider<T>({
  items,
  renderItem,
  perView = 1.2,
  breakpoints = {
    640: { slidesPerView: 1.2 },
    768: { slidesPerView: 1.6 },
    1024: { slidesPerView: 2.1 },
  },
  space = 20,
  className,

  pagination = false,
  inlineControls = false,
  controls = true,           // ✅ default ON (Promotions unchanged)

  loop = false,              // default OFF so sections must opt-in
  controlsId = "promo",
  centered = true,
}: SliderProps<T>) {
  const swiperRef = React.useRef<SwiperCore | null>(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(true);

  // dots container (only used when controls && inlineControls)
  const dotsSelector = inlineControls
    ? `.js-${controlsId}-dots`
    : ".swiper-pagination";

  const refreshArrows = React.useCallback(() => {
    const sw = swiperRef.current;
    if (!sw) return;

    if ((sw.params as any).loop) {
      const locked = (sw as any).isLocked; // true when not enough slides
      setCanPrev(!locked);
      setCanNext(!locked);
      return;
    }
    setCanPrev(!sw.isBeginning);
    setCanNext(!sw.isEnd);
  }, []);

  return (
    <div className={className}>
      <Swiper
        modules={[Pagination, A11y]}
        onSwiper={(sw) => {
          swiperRef.current = sw;
          queueMicrotask(refreshArrows);
        }}
        onSlideChange={refreshArrows}
        onResize={refreshArrows}
        slidesPerView={perView}
        breakpoints={breakpoints}
        spaceBetween={space}
        centeredSlides={centered}
        loop={loop}
        // Only enable pagination if controls are on
        pagination={controls ? (pagination ? { clickable: true } : false) : false}
        onBeforeInit={(swiper) => {
          // Configure external/inline dots only when controls are on
          if (!controls) return;
          const p = swiper.params as any;
          p.slidesPerGroup = 1;
          p.slideToClickedSlide = true;
          p.watchSlidesProgress = true;
          p.pagination = {
            ...(p.pagination || {}),
            clickable: true,
            el: inlineControls ? dotsSelector : ".swiper-pagination",
          };
        }}
        className={inlineControls && controls ? "promo-inline" : undefined}
      >
        {items.map((item, i) => (
          <SwiperSlide key={i} className="transition-all duration-300">
            {renderItem(item, i)}
          </SwiperSlide>
        ))}

        {/* Built-in pagination node only when controls + non-inline dots */}
        {controls && !inlineControls && pagination && (
          <div className="swiper-pagination" />
        )}
      </Swiper>

      {/* Inline controls (arrows + dots) only when controls are ON */}
      {controls && inlineControls && (
        <div className="promo-controls-outer">
          <div className="promo-controls">
            <button
              type="button"
              aria-label="Previous"
              className="promo-arrow promo-arrow--prev"
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={!canPrev}
            />
            {/* unique dots node per instance */}
            <div className={`promo-dots js-${controlsId}-dots`} />
            <button
              type="button"
              aria-label="Next"
              className="promo-arrow promo-arrow--next"
              onClick={() => swiperRef.current?.slideNext()}
              disabled={!canNext}
            />
          </div>
        </div>
      )}
    </div>
  );
}
