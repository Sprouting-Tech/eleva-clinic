"use client";
import { useState, useId, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import ReviewCard from "@/components/cards/ReviewCard";
import { reviews, secondreviews } from "@/data/reviews";

export default function HomeReviews() {
    const [showSecond, setShowSecond] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // unique ids so Swiper finds the right arrow
    const id1 = useId();
    const id2 = useId();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="max-w-4xl mx-auto py-3 px-5">
            <h2 className="mb-3 text-2xl font-[Montserrat] text-center text-[#AF674F]">
                Reviews
            </h2>

            <h2 className="text-xl lg:text-xl mb-2 text-gray-900">
                รีวิวการกระชับใบหน้า
            </h2>
            <div id={`slider-${id1}`} className="relative mb-8">
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        nextEl: `#slider-${id1} .swiper-next`,
                    }}
                    loop
                    slidesPerView={1}
                    breakpoints={{
                        768: { slidesPerView: 1 },
                    }}
                    spaceBetween={12}
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={`first2-${review.id}`}>
                            <ReviewCard review={review} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Right arrow only */}
                <div className="hidden md:flex swiper-next absolute top-1/2 -right-13 transform -translate-y-1/2 cursor-pointer p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#AF674F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </div>
            </div>

            {/* Show button if second carousel is hidden */}
            {!isMobile && (
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={() => setShowSecond(!showSecond)}
                        className="px-2.5 py-1.5 bg-gradient-to-br from-[#AF674F] via-[#E28E72] to-[#AF674F] text-white text-xs rounded-full"
                    >
                        {showSecond ? " Hide Reviews " : " View All Reviews"}
                    </button>
                </div>)}



            {(isMobile || showSecond) && (
                <>
                    <h2 className="text-xl mt-3 lg:text-xl text-gray-900">
                        รีวิวการเลเซอร์กำจัดขน
                    </h2>
                    <div id={`slider-${id2}`} className="relative mt-2">
                        <Swiper
                            modules={[Navigation]}
                            navigation={{
                                nextEl: `#slider-${id2} .swiper-next`,
                            }}
                            loop
                            slidesPerView={1}
                            breakpoints={{
                                768: { slidesPerView: 1 },
                            }}
                            spaceBetween={12}
                        >
                            {secondreviews.map((review) => (
                                <SwiperSlide key={`second2-${review.id}}`}>
                                    <ReviewCard review={review} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Right arrow only */}
                        <div className="hidden md:flex swiper-next absolute top-1/2 -right-13 transform -translate-y-1/2 cursor-pointer p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#AF674F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6" />
                            </svg>

                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
