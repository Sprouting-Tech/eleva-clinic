"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";


interface NavLinkItem {
  href: string;
  label: string;
  hasDropdown?: boolean;
}

interface NavLinkProps {
  href: string;
  label: string;
  hasDropdown?: boolean;
}

const NAV_LINKS: NavLinkItem[] = [
  { href: "/", label: "Home" },
  { href: "/treatments", label: "Treatments" }, 
  { href: "/services", label: "Our Services", hasDropdown: true },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About Us" },
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
  const NavLink = ({ href, label, hasDropdown }: NavLinkProps) => {
    const isActive = pathname === href;
    
    return (
      <Link
        href={href}
        onClick={closeMenu}
        className={`
          px-3 py-2 flex items-center gap-1 transition-all duration-200
          ${isActive 
            ? "" 
            : "hover:text-black text-neutral-700"
          }
        `}
        style={{
          color: isActive ? "#7F3F29" : "#AF674F",
          height: "46px", 
          lineHeight: "26px",
          paddingTop: "0",
          paddingBottom: "0",
          fontFamily: "DM Sans, sans-serif",
          fontWeight: isActive ? 700 : 500,
          transition: "font-weight 0.2s ease",
          display: "flex",
          alignItems: "center"
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
          if (!isActive) {
            (e.target as HTMLElement).style.fontWeight = '700'; 
          }
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
          if (!isActive) {
            (e.target as HTMLElement).style.fontWeight = '500'; 
          }
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
      className="fixed inset-0 z-[999] animate-in slide-in-from-top duration-300"
      style={{ backgroundColor: "rgba(255, 235, 231)" }}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between border-b border-white/20"
        style={{ padding: "16px" }}
      >
        <Link href="/" onClick={closeMenu} className="flex items-center gap-2 font-semibold">
          <Image 
            src="/images/eleva_logo.png" 
            alt="Elevaclinic logo" 
            width={43}
            height={32}
            className="object-contain"
            priority
          />
        </Link>
        <button
          onClick={closeMenu}
          className="rounded-xl px-3 py-2 hover:bg-white/50 transition-all duration-200 flex items-center justify-center"
          style={{ 
            color: "#AF674F",
            width: "24px",
            height: "24px",
            fontSize: "16px"
          }}
          aria-label="Close menu"
        >
          ✕
        </button>
      </div>
      
      {/* Navigation */}
      <div style={{ padding: "16px" }}>
        <nav className="flex flex-col" style={{ gap: "16px" }}>
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <header 
      className="sticky top-0 z-50 w-full"
      style={{ 
        backgroundColor: "rgba(255, 235, 231, 0.5)", 
        backdropFilter: "blur(100px)",
        WebkitBackdropFilter: "blur(100px)" 
      }}
    >
      <div className="flex items-center justify-between w-[375px] h-16 p-4 opacity-100 md:w-full md:h-[115px] md:px-8">
        {/* Logo - Responsive sizes */}
        <Link 
          href="/" 
          className="flex items-center gap-2 font-semibold md:py-5 md:px-12"
        >
          <Image 
            src="/images/eleva_logo.png" 
            alt="Elevaclinic logo" 
            width={43}  // ← Added width
            height={32} // ← Added height  
            className="object-contain w-[43px] h-[32px] md:w-[100px] md:h-[75px]"
            priority    // ← Added priority for above-the-fold image
          />
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={openMenu}
          className="md:hidden rounded-xl hover:bg-white/50 transition-all duration-200 flex items-center justify-center"
          style={{ 
            color: "#AF674F",
            width: "24px",
            height: "24px",
            fontSize: "16px"
          }}
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
