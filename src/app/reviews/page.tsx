"use client";

import { reviews, secondreviews } from "@/data/reviews";
import ReviewCard from "@/components/cards/ReviewCard";
import Slider from "@/app/reviews/reviewslider";

export default function ReviewsPage() {
  return (
    <>
        <h1 className="text-2xl text-center font-[Montserrat] text-[#AF674F] mb-4 mt-10">
          Reviews
        </h1>

        <div className="max-w-4xl mb-10 mx-auto px-5">
          <h2 className="text-xl font-sans mb-2 text-gray-900">
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

        <div className="max-w-4xl mx-auto px-5">
          <h2 className="text-xl font-sans mb-2 text-gray-900">
            รีวิวการเลเซอร์กำจัดขน
          </h2>

          <Slider
            items={secondreviews}
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
    </>
  );

}
