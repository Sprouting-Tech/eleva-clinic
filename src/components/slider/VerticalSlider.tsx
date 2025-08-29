import React, { useState } from "react";
import Image from "next/image";

interface VerticalSliderProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  loop?: boolean;
}

function VerticalSlider<T>({
  items,
  renderItem,
  loop = true,
}: VerticalSliderProps<T>) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const [animating, setAnimating] = useState(false);

  const goTo = (idx: number, dir: "up" | "down") => {
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 350); // match transition duration
  };

  const next = () => {
    let nextIdx = current + 1;
    if (nextIdx >= items.length) nextIdx = loop ? 0 : items.length - 1;
    goTo(nextIdx, "down");
  };

  const prev = () => {
    let prevIdx = current - 1;
    if (prevIdx < 0) prevIdx = loop ? items.length - 1 : 0;
    goTo(prevIdx, "up");
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
        <div
          className={`transition-transform duration-350 ease-in-out w-full h-full`}
          style={{
            transform:
              animating && direction === "down"
                ? "translateY(-100%)"
                : animating && direction === "up"
                  ? "translateY(100%)"
                  : "translateY(0)",
            maxWidth: "1500px",
            margin: "0 auto",
          }}
        >
          {renderItem(items[current])}
        </div>
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
      {/* Dots */}
      <div className="flex gap-2 mt-4 justify-center absolute left-1/2 -translate-x-1/2 bottom-0">
        {items.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 rounded-full ${idx === current ? "bg-[#A86A3D]" : "bg-gray-300"}`}
            onClick={() => goTo(idx, idx > current ? "down" : "up")}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default VerticalSlider;
