"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import classic from "@/app/assets/images/classic.png";
import modern from "@/app/assets/images/modern.png";
import simple from "@/app/assets/images/simple.png";

import "swiper/css";

const slides = [
	{
		name: "Simple",
		image: simple,
	},
	{
		name: "Modern",
		image: modern,
	},
	{
		name: "Classic",
		image: classic,
	},
];

export default function ImageCarousel() {
	const [activeIndex, setActiveIndex] = useState(1);

	return (
		<section className="relative h-153 md:h-130 lg:h-168 w-full overflow-hidden">
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
					className="overflow-visible!">
					{slides.map((slide, index) => (
						<SwiperSlide key={index}>
							{({ isActive }) => (
								<div
									className={`relative flex w-full flex-col items-center overflow-hidden transition-all duration-700 ease-out ${
										isActive
											? "h-140 lg:h-155 scale-100 opacity-100"
											: "top-20 h-105 md:h-90 lg:h-105 scale-[0.88] opacity-50"
									}`}>
									<div className="relative h-full w-full overflow-hidden rounded-3xl">
										<Image
											src={slide.image}
											alt={slide.name}
											fill
											sizes="(max-width: 767px) 100vw, 33vw"
											className="object-contain rounded-3xl"
										/>
									</div>

									<div
										className={`mt-1 transition-all duration-500 ${
											isActive
												? "translate-y-0 opacity-100"
												: "translate-y-2 opacity-0"
										}`}>
										<p className="font-italianno text-center text-4xl font-regular text-white">
											{slide.name}
										</p>
									</div>
								</div>
							)}
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			<div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
				{slides.map((_, index) => (
					<button
						key={index}
						type="button"
						aria-label={`Go to slide ${index + 1}`}
						className={`h-2.5 rounded-full transition-all duration-300 ${
							activeIndex === index ? "w-7 bg-[#00B7FF]" : "w-2.5 bg-white/30"
						}`}
					/>
				))}
			</div>
		</section>
	);
}
