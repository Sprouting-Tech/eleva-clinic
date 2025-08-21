"use client";
import { useState } from "react";
type Item = { q: string; a: string };
export default function Accordion({
  items,
  singleOpen = true,
}: {
  items: Item[];
  singleOpen?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="card p-4">
            <button
              className="w-full text-left font-medium"
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {it.q}
            </button>
            {(!singleOpen || isOpen) && isOpen && (
              <p className="mt-2 text-sm text-neutral-700">{it.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
