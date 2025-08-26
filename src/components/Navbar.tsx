"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services", hasDropdown: true },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const openMenu = () => setIsMenuOpen(true);

  // Navigation Link Component
  const NavLink = ({ href, label, hasDropdown }) => {
    const isActive = pathname === href;
    
    return (
      <Link
        href={href}
        onClick={closeMenu}
        className={`
          px-3 py-2 text-sm font-medium flex items-center gap-1 transition-all duration-200
          ${isActive 
            ? "font-bold" 
            : "hover:font-bold hover:shadow-lg hover:bg-white/50 hover:rounded-xl"
          }
        `}
        style={{
          color: isActive ? "#7F3F29" : "#AF674F",
          height: "26px",
          lineHeight: "26px",
          paddingTop: "0",
          paddingBottom: "0"
        }}
      >
        {label}
        {hasDropdown && (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </Link>
    );
  };

  // Mobile Menu Component
  const MobileMenu = () => (
    <div 
      className="fixed inset-0 z-[99999] animate-in slide-in-from-top duration-300"
      style={{ backgroundColor: "#FFEBE7" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/20">
        <Link href="/" onClick={closeMenu} className="flex items-center gap-2 font-semibold">
          <img 
            src="/images/eleva_logo.png" 
            alt="Elevaclinic logo" 
            className="object-contain"
            style={{ width: "80px", height: "60px" }}
          />
        </Link>
        <button
          onClick={closeMenu}
          className="rounded-xl px-3 py-2 text-lg hover:bg-white/50 transition-all duration-200"
          style={{ color: "#AF674F" }}
          aria-label="Close menu"
        >
          ✕
        </button>
      </div>
      
      {/* Navigation */}
      <div className="p-4">
        <nav className="flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FCE8E8]/80 backdrop-blur">
      <div className="px-4 md:px-8 flex h-[150px] items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <img 
            src="/images/eleva_logo.png" 
            alt="Elevaclinic logo" 
            className="object-contain"
            style={{ width: "100px", height: "75px" }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={openMenu}
          className="md:hidden rounded-xl px-3 py-2 text-sm font-medium hover:bg-white/50 transition-all duration-200"
          style={{ color: "#AF674F" }}
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Portal */}
      {isMenuOpen && typeof window !== 'undefined' && createPortal(
        <MobileMenu />,
        document.body
      )}
    </header>
  );
}
