"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={[
          "rounded-xl px-3 py-2 text-sm font-medium",
          active
            ? "bg-sand-100 text-black"
            : "text-neutral-700 hover:text-black",
        ].join(" ")}
        onClick={() => setOpen(false)}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
      <div className="container-narrow flex h-14 items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          {/* Logo: <Image src="/images/logo.svg" alt="Eleva Clinic" className="h-6 w-auto" /> */}
          <span>Eleva Clinic</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <NavLink key={n.href} {...n} />
          ))}
          <Link href="/booking" className="btn btn-primary ml-2">
            Book Now
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden rounded-xl px-3 py-2 text-sm font-medium hover:bg-sand-100"
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
          <div className="fixed inset-y-0 right-0 z-50 w-72 max-w-[85vw] bg-white p-4 shadow-[var(--shadow-soft)]">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold">Menu</span>
              <button
                className="rounded-xl px-3 py-2 text-sm hover:bg-sand-100"
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
              <Link
                href="/booking"
                className="btn btn-primary mt-2"
                onClick={() => setOpen(false)}
              >
                Book Now
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
