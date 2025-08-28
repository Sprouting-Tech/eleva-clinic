import React, { useState } from "react";
import Image from "next/image";

interface VerticalSliderProps<T> {
  items: T[];
  renderItem: (item: T, direction?: "up" | "down") => React.ReactNode;
  loop?: boolean;
  onIndexChange?: (index: number) => void;
}

function VerticalSlider<T>({
  items,
  renderItem,
  loop = true,
  onIndexChange,
}: VerticalSliderProps<T>) {
  const [current, setCurrent] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<"up" | "down">("down");

  const goTo = (idx: number, dir: "up" | "down") => {
    setDirection(dir);
    setIsTransitioning(true);
    setNextIndex(idx);
    // Wait for fade-out, then switch doctor
    setTimeout(() => {
      setCurrent(idx);
      setNextIndex(null);
      onIndexChange?.(idx);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 250); // 250ms matches transition duration
  };

  const next = () => {
    let nextIdx = current + 1;
    if (nextIdx >= items.length) nextIdx = loop ? 0 : items.length - 1;
    goTo(nextIdx, "up"); // Going forward = slide up
  };

  const prev = () => {
    let prevIdx = current - 1;
    if (prevIdx < 0) prevIdx = loop ? items.length - 1 : 0;
    goTo(prevIdx, "down"); // Going backward = slide down
  };

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      style={{ minHeight: 400 }}
    >
      {/* Left Arrow */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 text-2xl text-[#A86A3D]"
        onClick={prev}
        aria-label="Previous"
        style={{ marginLeft: "24px" }}
      >
        <Image
          src="leftRightArrow(Left).svg"
          alt="Previous"
          width={15.3}
          height={26.6}
        />
      </button>
      {/* Card/Slider */}
      <div
        className="w-full flex items-center justify-center overflow-hidden"
        style={{ position: "relative", minHeight: 400 }}
      >
        {/* Only show one doctor at a time: fade out current, then show next */}
        {nextIndex === null ? (
          <div
            className={`w-full h-full transition-opacity duration-500 ease-in-out ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
            style={{
              maxWidth: "1500px",
              margin: "0 auto",
              position: "relative",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            {renderItem(items[current], direction)}
          </div>
        ) : (
          <div
            className="w-full h-full transition-opacity duration-500 ease-in-out opacity-100"
            style={{
              maxWidth: "1500px",
              margin: "0 auto",
              position: "relative",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            {renderItem(items[nextIndex], direction)}
          </div>
        )}
      </div>
      {/* Right Arrow */}
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 text-2xl text-[#A86A3D]"
        onClick={next}
        aria-label="Next"
        style={{ marginRight: "24px" }}
      >
        <Image
          src="leftRightArrow(Right).svg"
          alt="Next"
          width={15.3}
          height={26.6}
        />
      </button>
    </div>
  );
}

export default VerticalSlider;
