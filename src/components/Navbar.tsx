"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services", hasDropdown: true },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const NavLink = ({ href, label, hasDropdown }: { href: string; label: string; hasDropdown?: boolean }) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={[
          "px-3 py-2 text-sm font-medium flex items-center gap-1 transition-all duration-200",
          active
            ? "font-bold"
            : "hover:font-bold hover:shadow-lg hover:bg-white/50 hover:rounded-xl",
        ].join(" ")}
        style={{
          color: active ? "#7F3F29" : "#AF674F",
          height: "26px",
          lineHeight: "26px",
          paddingTop: "0",
          paddingBottom: "0"
        }}
        onClick={() => setOpen(false)}
      >
        {label}
        {hasDropdown && (
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-[#FCE8E8]/80 backdrop-blur">
      <div className="px-4 md:px-8 flex h-[150px] items-center justify-between">
        {/* Brand with Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <img 
            src='/images/eleva_logo.png' 
            alt='Elevaclinic logo' 
            className="object-contain"
            style={{
              width: "100px",
              height: "75px"
            }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <NavLink key={n.href} {...n} />
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden rounded-xl px-3 py-2 text-sm font-medium hover:bg-white/50 transition-all duration-200"
          style={{ color: "#AF674F" }}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden">
          {/* overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/30"
            onClick={() => setOpen(false)}
          />
          {/* panel */}
          <div className="fixed inset-y-0 right-0 z-50 w-72 max-w-[85vw] bg-[#FCE8E8] p-4 shadow-xl">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold" style={{ color: "#7F3F29" }}>Menu</span>
              <button
                className="rounded-xl px-3 py-2 text-sm hover:bg-white/50 transition-all duration-200"
                style={{ color: "#AF674F" }}
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV.map((n) => (
                <NavLink key={n.href} {...n} />
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
