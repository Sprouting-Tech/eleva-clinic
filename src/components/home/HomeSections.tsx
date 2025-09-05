import PromotionsSection from "./PromotionsSection";
import ServicesSection from "./ServicesSection";

export default function HomeSections() {
  return (
    <div className="container-narrow space-y-14 py-8">
      <PromotionsSection />
      <ServicesSection />
    </div>
  );
}
