"use client";

import { useRef } from "react";
import Carousel from "../layouts/Carousel";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Templates() {
	const sectionRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const reduceMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			if (reduceMotion) return;

			gsap.set(".templates-title", {
				opacity: 0,
				y: 30,
			});

			gsap.set(".templates-description", {
				opacity: 0,
				y: 20,
			});

			gsap.set(".templates-carousel", {
				opacity: 0,
				y: 35,
				scale: 0.97,
			});

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 78%",
					toggleActions: "play none none none",
					once: true,
				},
				defaults: {
					ease: "power3.out",
				},
			});

			tl.to(".templates-title", {
				opacity: 1,
				y: 0,
				duration: 0.65,
			});

			tl.to(
				".templates-description",
				{
					opacity: 1,
					y: 0,
					duration: 0.5,
				},
				"-=0.35",
			);

			tl.to(
				".templates-carousel",
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.8,
					ease: "power3.out",
				},
				"-=0.2",
			);
		},
		{
			scope: sectionRef,
		},
	);

	return (
		<div
			ref={sectionRef}
			className='w-full bg-[url("/background-mobile.webp")] bg-cover bg-center bg-no-repeat px-3 py-8 lg:bg-[url("/background.webp")]'>
			<div className="mx-auto h-full max-w-7xl">
				<p
					className="templates-title text-center font-italianno text-5xl text-[#00B7FF] lg:text-6xl"
					style={{
						textShadow: "1px 1px 0 #fff",
					}}>
					Custom Templates
				</p>

				<p className="templates-description mx-auto mt-1 mb-4 w-10/12 text-center font-regular leading-tight text-white md:w-2/5 lg:text-lg">
					Choose from our collections of professional invoice templates.
				</p>

				<section className="templates-carousel mt-7 h-auto w-full xl:pt-10">
					<Carousel />
				</section>
			</div>
		</div>
	);
}
