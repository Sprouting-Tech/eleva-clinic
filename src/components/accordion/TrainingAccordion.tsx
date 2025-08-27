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
  const [closing, setClosing] = useState(false);

  const handleToggle = () => {
    if (open) {
      setClosing(true);
      setTimeout(() => {
        setOpen(false);
        setClosing(false);
      }, 350); // delay for sign change
    } else {
      setOpen(true);
    }
  };

  const showMinus = open || closing;

  return (
    <div className={className}>
      <button
        className="px-5 py-2.5 w-full flex items-center justify-between rounded-xl bg-[#A86A3D] text-white text-lg font-semibold hover:bg-[#8a5630] transition"
        aria-expanded={showMinus}
        onClick={handleToggle}
      >
        <span>{label}</span>
        <span className="text-3xl leading-none font-bold">
          {showMinus ? "−" : "+"}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-[max-height] duration-200 ease-in-out ${showMinus ? "max-h-[9999px] mt-4" : "max-h-0"}`}
      >
        <ul className="flex flex-col gap-2 text-[#6B4F3A] px-2">
          {items.map((item, idx) => (
            <li key={idx} className="text-sm font-normal font-sans leading-6">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
