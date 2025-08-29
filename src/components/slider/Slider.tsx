"use client";

import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";
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
  pagination?: boolean;     
  inlineControls?: boolean;  
  controls?: boolean;       

  // Optional extras
  loop?: boolean;            
  controlsId?: string;      
  centered?: boolean;        
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
  controls = true,           
  loop = false,             
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
    // If controls are off, do nothing (prevents reading undefined params)
    if (!controls) return;

    const sw = swiperRef.current;
    if (!sw) return;

    const params: any = (sw as any)?.params || {};

    if (params.loop) {
      // In loop mode, rely on isLocked to know when arrows should be disabled
      const locked: boolean = (sw as any)?.isLocked ?? false;
      setCanPrev(!locked);
      setCanNext(!locked);
      return;
    }

    // Non-loop behavior
    setCanPrev(!sw.isBeginning);
    setCanNext(!sw.isEnd);
  }, [controls]);

  return (
    <div className={className}>
      <Swiper
        modules={[Pagination, A11y]}
        onSwiper={(sw) => {
          swiperRef.current = sw;
          if (controls) queueMicrotask(refreshArrows); 
        }}
        onSlideChange={controls ? refreshArrows : undefined}
        onResize={controls ? refreshArrows : undefined}
        slidesPerView={perView}
        breakpoints={breakpoints}
        spaceBetween={space}
        centeredSlides={centered}
        loop={loop}
        // Only enable pagination if controls are on
        pagination={controls ? (pagination ? { clickable: true } : false) : false}
        onBeforeInit={(swiper) => {
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
