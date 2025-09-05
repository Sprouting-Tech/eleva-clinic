import PromotionsSection from "./PromotionsSection";
import ServicesSection from "./ServicesSection";

export default function HomeSections() {
  return (
    <div className="max-w-5xl space-y-14 py-8">
      <PromotionsSection />
      <ServicesSection />
    </div>
  );
}
