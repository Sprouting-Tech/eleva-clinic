import Link from "next/link";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact Us" },
  { href: "/booking", label: "Booking" },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white text-sm">
      <div className="container-narrow grid gap-8 px-4 py-10 md:grid-cols-3">
        {/* Clinic Info */}
        <section>
          <div className="text-base font-semibold">Eleva Clinic</div>
          <p className="mt-3">
            654/2 Rama IV Road, Maha Phruettharam,
            <br />
            Bang Rak, Bangkok 10500
          </p>
          <p className="mt-2">Opening Hours: 09:00-17:00 (Mon-Fri)</p>
          <p className="mt-2">
            Phone:{" "}
            <a href="tel:0989941698" className="underline underline-offset-2">
              098 994 1698
            </a>
          </p>
          <div className="mt-3 flex gap-3">
            {/* Social Media Links */}
            <a href="#" aria-label="Instagram" className="btn border">
              IG
            </a>
            <a href="#" aria-label="Facebook" className="btn border">
              FB
            </a>
            <a href="#" aria-label="Line" className="btn border">
              LINE
            </a>
          </div>
        </section>

        {/* Navigation */}
        <nav className="grid grid-cols-2 gap-2 md:grid-cols-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="hover:text-black text-neutral-700"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Notes / CTA */}
        <section>
          <div className="font-semibold">Need help?</div>
          <p className="mt-2 text-neutral-600">
            Chat or call us for more information about services and promotions.
          </p>
          <Link href="/booking" className="btn btn-primary mt-3 inline-flex">
            Book Now
          </Link>
        </section>
      </div>

      <div className="border-t bg-sand-100/60">
        <div className="container-narrow flex items-center justify-center px-4 py-4">
          <p>
            © {new Date().getFullYear()} Eleva Clinic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
