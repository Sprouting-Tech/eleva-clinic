import Link from "next/link";
import Image from "next/image";

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
    <footer className="mt-16 text-sm bg-gradient-to-t from-[#FFE9E5] to-[#FFFFFF]">
      <div className="md:mx-8 grid gap-6 py-10 md:grid-cols-4">
        {/* Clinic IconxInfo */}
        <section className="flex flex-col justify-center items-center ">
          <div className="flex flex-col items-center mb-4">
            <Image
              className="mb-6"
              src="/images/image 1.png"
              alt="Eleva Clinic Logo"
              width={150}
              height={150}
            />
            <div className="flex justify-between gap-2 md:gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Image
                  src="/images/facebook.png"
                  alt="Facebook"
                  width={30}
                  height={30}
                  className="w-10 h-10 md:w-[30px] md:h-[30px]"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Image
                  src="/images/instagram.png"
                  alt="Instagram"
                  width={30}
                  height={30}
                  className="w-10 h-10 md:w-[30px] md:h-[30px]"
                />
              </a>
              <a
                href="https://www.tiktok.com/explore"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <Image
                  src="/images/tiktok.png"
                  alt="TikTok"
                  width={30}
                  height={30}
                  className="w-10 h-10 md:w-[30px] md:h-[30px]"
                />
              </a>
              <a
                href="https://line.me"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Line"
              >
                <Image
                  src="/images/line.png"
                  alt="Line"
                  width={30}
                  height={30}
                  className="w-10 h-10 md:w-[30px] md:h-[30px]"
                />
              </a>
            </div>
          </div>
        </section>

        {/* Address */}
        <section className="grid grid-cols-2 gap-2 md:grid-cols-1 px-6 md:px-0">
          <div>
            <h3 className="text-[#B97A65] md:text-xl pb-2">ADDRESS</h3>
            <p className="text-[16px] md:text-md font-[500]">
              654/2 Rama IV Road, Maha Phruettharam Subdistrict, Bang Rak
              District, Bangkok <br /> 10500
            </p>
          </div>
          <div>
            <h3 className="text-[#B97A65] md:text-xl pb-2">Opening Hours</h3>
            <p className="text-md font-[500]">
              9:00AM - 5:00PM (Monday to Friday)
            </p>
          </div>
        </section>

        {/* Notes / CTA */}
        <section className="md:block hidden">
          <div>
            <h3 className="text-[#B97A65] md:text-xl pb-2">Our services</h3>
            <p className="font-[500] mb-5">Surgery</p>
            <p className="font-[500] mb-5">Ultraformer|||</p>
            <p className="font-[500] mb-5">PRP</p>
            <p className="font-[500] mb-5">Pico</p>
          </div>
        </section>

        <section className="md:block hidden">
          <div>
            <h3 className="text-[#B97A65] md:text-xl pb-2">Explore</h3>
            <Link
              href="/about"
              className="font-[500] mb-5 block hover:text-[#B97A65]"
            >
              About Us
            </Link>

            <p className="font-[500] mb-5">Treatments</p>
            <p className="font-[500] mb-5">Reviews</p>
            <Link
              href="/contact"
              className="font-[500] mb-5 block hover:text-[#B97A65]"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </footer>
  );
}







