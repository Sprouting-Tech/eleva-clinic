"use client";
import Image from "next/image";
import { Review } from "@/types/content";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="w-full flex flex-col lg:flex-row rounded-2xl shadow-lg overflow-hidden">
      <div className="flex-1 flex items-center justify-center">
        <Image
          src={review.image} // this should be the FULL designed poster
          alt="Poster"
          width={300}
          height={300}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* RIGHT SIDE (Review Content) */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-rose-50 via-rose-50 to-rose-200 p-6 flex flex-col justify-center">
        {/* Profile */}
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden mr-4">
            <Image
              src={review.avatar}
              alt={review.name}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="text-lg font-bold text-gray-900">{review.name}</h4>
        </div>

        {/* Review Text */}
        <p className="text-gray-700 text-base mb-4">{review.text}</p>

        {/* Rating */}
        <div className="flex items-center">
          {[...Array(review.rating)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-amber-600"
              viewBox="0 0 20 20"
              fill="#AF674F"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
} 