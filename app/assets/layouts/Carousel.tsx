"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import sample from "@/app/assets/images/sample.png";

import "swiper/css";

const slides = [
	{
		image: sample,
		alt: "Ocean",
	},
	{
		image: sample,
		alt: "Mountain",
	},
	{
		image: sample,
		alt: "Forest",
	},
];

export default function ImageCarousel() {
	const [activeIndex, setActiveIndex] = useState(1);

	return (
		<section className="relative h-163 w-full overflow-hidden">
			<div className="mx-auto h-full w-full max-w-7xl">
				<Swiper
					slidesPerView={1}
					spaceBetween={0}
					centeredSlides={true}
					initialSlide={1}
					loop={false}
					speed={600}
					onSlideChange={(swiper: SwiperType) => {
						setActiveIndex(swiper.activeIndex);
					}}
					breakpoints={{
						768: {
							slidesPerView: 3,
							spaceBetween: 0,
							centeredSlides: true,
						},
					}}
					className="!overflow-visible">
					{slides.map((slide, index) => (
						<SwiperSlide key={index}>
							{({ isActive }) => (
								<div
									className={`
										relative w-full overflow-hidden rounded-3xl
										transition-all duration-700 ease-out
										${
											isActive
												? "h-150 scale-100 opacity-100"
												: "top-15 h-95 scale-[0.88] opacity-50 15"
										}
									`}>
									<Image
										src={slide.image}
										alt={slide.alt}
										fill
										sizes="(max-width: 767px) 100vw, 33vw"
										className="object-contain"
									/>
								</div>
							)}
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			{/* Permanent indicators */}
			<div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
				{slides.map((_, index) => (
					<button
						key={index}
						type="button"
						aria-label={`Go to slide ${index + 1}`}
						className={`
							h-2.5 rounded-full transition-all duration-300
							${activeIndex === index ? "w-7 bg-[#00B7FF]" : "w-2.5 bg-white/30"}
						`}
					/>
				))}
			</div>
		</section>
	);
}
