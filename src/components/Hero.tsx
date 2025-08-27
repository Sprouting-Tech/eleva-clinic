import Image from "next/image";
import Link from "next/link";
import { DM_Sans, Montserrat } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300","400","500","700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400","700"] });

export default function Hero() {
  return (
    <section
      className={`${dmSans.className} relative isolate w-full overflow-hidden min-h-[100svh] bg-[radial-gradient(circle_at_50%_45%,#FFFFFF_0%,#FFFFFF_38%,#FFE9E5_100%)]`}
    >
      {/* Mobile: grid (stack)  •  Desktop: flex (side-by-side + vertically centered) */}
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-6 md:flex md:items-center md:gap-14 md:px-10">
        {/* IMAGE — mobile first; desktop move to the right */}
        <div className="relative order-1 mx-auto aspect-[4/5] w-full max-w-[420px] md:order-2 md:h-[500px]">
          <Image
            src="/images/hero.png"
            alt="Two women with healthy skin representing Eleva Clinic’s gentle care"
            priority
            fill
            className="pointer-events-none select-none object-contain drop-shadow-[0_16px_48px_rgba(0,0,0,0.18)]"
          />
        </div>

        {/* TEXT + CTAs — mobile below image; desktop left */}
        <div className="order-2 max-w-xl text-left md:order-1">
          <h1 className={`${montserrat.className} text-[34px]/[1.15] text-[#9b5a42] md:text-[56px]`}>
            Eleva Clinic
          </h1>

          <p className="mt-4 text-base text-stone-700 md:mt-6 md:text-lg max-w-[32ch]">
            We provide personalized skin and beauty treatments that bring out your natural
            radiance, combining expert care with a gentle touch.
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              href="/treatments"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white shadow-sm
                         bg-[linear-gradient(90deg,#AF674F_0%,#E28E72_50%,#AF674F_100%)]
                         hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#AF674F]/60"
            >
              See Treatments
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white shadow-sm
                         bg-[linear-gradient(90deg,#AF674F_0%,#E28E72_50%,#AF674F_100%)]
                         hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#AF674F]/60"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>


      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 [background:radial-gradient(900px_500px_at_50%_0%,rgba(255,186,166,0.22),transparent)]" />
    </section>
  );
}
