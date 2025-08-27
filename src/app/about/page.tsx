"use client";
import FAQAccordion from "@/components/accordion/FAQAccordion";
import { faqs } from "@/data/faqs";

export default function About() {
  // Split faqs into two columns for desktop layout (left/right)
  const half = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, half);
  const rightFaqs = faqs.slice(half);

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-[48px] space-y-10">
      {/* FAQ Section */}

      <section className="mt-16">
        <div className="text-center text-[#AF674F] text-2xl md:text-4xl font-normal font-['Montserrat'] mb-12">
          FAQs
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 max-w-[1200px] mx-auto">
          <div className="flex flex-col gap-4 items-center">
            <FAQAccordion items={leftFaqs} />
          </div>
          <div className="flex flex-col gap-4 items-center">
            <FAQAccordion items={rightFaqs} />
          </div>
        </div>
        {/* Mobile: Single Column */}
        <div className="md:hidden space-y-4">
          <FAQAccordion items={faqs} />
        </div>
      </section>
    </div>
  );
}
