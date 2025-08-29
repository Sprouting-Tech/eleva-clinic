"use client";

import { reviews, secondreviews } from "@/data/reviews";
import ReviewCard from "@/components/cards/ReviewCard";
import Slider from "@/app/reviews/reviewslider";

export default function ReviewsPage() {
  return (
    <>
      <section>
        <h1 className="text-3xl font-normal font-[Montserrat] text-center mb-4 mt-5 text-[#AF674F]">
          Reviews
        </h1>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl lg:text-xl mb-2 text-gray-900">
            รีวิวการกระชับใบหน้า
          </h2>

          <Slider
            items={reviews}
            renderItem={(review) => (
              <ReviewCard key={review.id} review={review} />
            )}
            perView={1}
            breakpoints={{
              768: { slidesPerView: 1 }, // ✅ 2 cards on tablet+
            }}
            loop
          />
        </div>

      </section>

      <section>
        <div className="max-w-3xl mt-8 mx-auto">
          <h2 className="text-xl lg:text-xl mb-2 text-gray-900">
            รีวิวการเลเซอร์กำจัดขน
          </h2>

          <Slider
            items={secondreviews}
            renderItem={(review) => (
              <ReviewCard key={review.id} review={review} />
            )}
            perView={1}
            breakpoints={{
              768: { slidesPerView: 1 }, 
            }}
            loop
          />
        </div>
      </section>
    </>
  );

}
