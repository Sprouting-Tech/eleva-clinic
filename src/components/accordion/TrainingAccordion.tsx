"use client";
import { useState } from "react";

interface TrainingAccordionProps {
  label?: string;
  items: string[];
  className?: string;
}

export function TrainingAccordion({
  label = "Training",
  items,
  className = "",
}: TrainingAccordionProps) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleContentClick = () => {
    setOpen(false);
  };

  return (
    <div className={className}>
      <button
        className="px-5 py-2.5 w-full flex items-center justify-between rounded-xl bg-[#A86A3D] text-white text-lg font-semibold hover:bg-[#8a5630] transition-colors duration-200"
        aria-expanded={open}
        onClick={handleToggle}
      >
        <span>{label}</span>
        <span className="text-3xl leading-none font-bold transition-transform duration-300 ease-in-out">
          {open ? "−" : "+"}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out cursor-pointer hover:bg-[#faf9f7] ${
          open ? "max-h-[4000px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
        onClick={handleContentClick}
      >
        <ul
          className="flex flex-col gap-2 text-[#6B4F3A] px-2 py-2 max-h-[3000px] md:max-h-[3500px] overflow-y-auto custom-scrollbar"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#A86A3D #f9f4f2",
          }}
        >
          {items.map((item, idx) => (
            <li
              key={idx}
              className="text-sm font-normal font-sans leading-6 break-words"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
