"use client";

import { gsap } from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { features } from "@/app/assets/data/featuresData";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Features() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const cardsRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const reduceMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			if (reduceMotion) return;

			const titleTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
					toggleActions: "play none none none",
				},
			});

			gsap.set(".features-title", {
				opacity: 0,
				y: 25,
			});

			gsap.set(".features-subtitle", {
				opacity: 0,
				y: 15,
			});

			titleTimeline
				.to(".features-title", {
					opacity: 1,
					y: 0,
					duration: 0.7,
					ease: "power3.out",
				})
				.to(
					".features-subtitle",
					{
						opacity: 1,
						y: 0,
						duration: 0.5,
						ease: "power3.out",
					},
					"-=0.4",
				);

			const cards = gsap.utils.toArray<HTMLElement>(".feature-card");

			cards.forEach((card, index) => {
				gsap.fromTo(
					card,
					{
						opacity: 0,
						y: 50,
						scale: 0.96,
					},
					{
						opacity: 1,
						y: 0,
						scale: 1,
						duration: 0.7,
						delay: index * 0.15,
						ease: "power3.out",

						scrollTrigger: {
							trigger: card,
							start: "top 88%",
							toggleActions: "play none none none",
						},
					},
				);
			});
		},
		{
			scope: sectionRef,
		},
	);

	return (
		<div
			ref={sectionRef}
			className='w-full bg-[url("/background-mobile.webp")] bg-cover bg-center bg-no-repeat px-3 py-8 lg:bg-[url("/background.webp")] lg:px-6 xl:px-10'
			id="features">
			<div className="mx-auto h-full max-w-7xl">
				<p
					className="features-title text-center font-italianno text-5xl text-[#00B7FF] lg:text-6xl"
					style={{
						textShadow: "1px 1px 0 #fff",
					}}>
					Features
				</p>

				<p className="features-subtitle text-center font-regular leading-none text-white lg:text-lg">
					Everything You Need to Get Paid Faster
				</p>

				<div
					ref={cardsRef}
					className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
					{features.map((feature) => (
						<div
							key={feature.title}
							className="feature-card flex w-full items-center justify-center space-x-3 rounded-2xl border-2 border-[#041E50] bg-[#041f5049] py-5 px-3 lg:p-3 lg:h-33">
							<div className="flex h-full w-1/5 justify-center">
								<div className="feature-icon relative h-11 w-11 lg:h-12 lg:w-12">
									<div className="absolute inset-0 translate-x-px translate-y-px rounded-full bg-[#00B7FF]" />

									<div className="relative flex h-full w-full items-center justify-center rounded-full bg-linear-to-br from-[#00B7FF] via-[#0066FF] to-[#041E50]">
										{feature.icon}
									</div>
								</div>
							</div>

							<div className="h-full w-4/5">
								<p className="font-regular font-italianno text-3xl text-white lg:text-4xl">
									{feature.title}
								</p>

								<p className="mt-0 w-full text-sm font-light leading-snug text-[#eeeeee9e]">
									{feature.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
