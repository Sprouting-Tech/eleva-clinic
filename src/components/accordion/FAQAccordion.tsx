"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Item = { q: string; a: string };

export default function FAQAccordion({ items }: { items: Item[] }) {
  // allow multiple items to be open simultaneously
  const [openMap, setOpenMap] = useState<Record<number, boolean>>({});

  const toggle = (i: number) => {
    setOpenMap((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <div className="flex flex-col items-start gap-4 w-full">
      {items.map((item, index) => {
        const isOpen = !!openMap[index];
        return (
          <div
            key={index}
            className={`w-full p-6 md:p-7 bg-gradient-to-r from-white via-white/80 to-rose-100/90 rounded-2xl shadow-[4px_4px_12px_0px_rgba(0,0,0,0.15)] border border-gray-200 flex flex-col items-start gap-6`}
            style={{ alignSelf: "stretch" }}
          >
            <div
              className="self-stretch flex justify-between items-center cursor-pointer"
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              onClick={() => toggle(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(index);
                }
              }}
            >
              <div className="text-black text-base md:text-2xl font-medium font-['DM_Sans'] leading-tight md:leading-7 break-words whitespace-normal flex-1 min-w-0">
                {item.q}
              </div>
              <button
                className="px-6 py-6 bg-[#A86A3D] rounded-[39px] flex justify-center items-center gap-2.5"
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(index);
                }}
                aria-label={isOpen ? "Collapse" : "Expand"}
                aria-pressed={isOpen}
              >
                <ChevronDown
                  className="w-4 h-4 text-white transition-transform duration-300 ease-in-out"
                  style={{
                    transform: isOpen ? "rotate(-180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
            </div>

            {/* Combined content area with smooth animation */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[9999px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {/* divider line (30% opacity black) */}
              <div
                className="w-full border-t mt-4 mb-6"
                style={{ borderColor: "rgba(10,10,10,0.3)" }}
              ></div>

              <p className="text-[#000000] text-base font-normal font-['DM_Sans'] leading-relaxed">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
