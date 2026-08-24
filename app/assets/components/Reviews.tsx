"use client";

import { gsap } from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Testimonials from "../layouts/Marquee";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Reviews() {
	const sectionRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const reduceMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			if (reduceMotion) return;

			gsap.set(".reviews-title", {
				opacity: 0,
				y: 30,
			});

			gsap.set(".reviews-description", {
				opacity: 0,
				y: 20,
			});

			gsap.set(".reviews-testimonials", {
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

			tl.to(".reviews-title", {
				opacity: 1,
				y: 0,
				duration: 0.65,
			});

			tl.to(
				".reviews-description",
				{
					opacity: 1,
					y: 0,
					duration: 0.5,
				},
				"-=0.35",
			);

			tl.to(
				".reviews-testimonials",
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
			className='w-full bg-[url("/background-mobile.webp")] bg-cover bg-center bg-no-repeat py-8 lg:bg-[url("/background.webp")]'
			id="testimonials">
			<div className="mx-auto h-full w-full sm:py-5">
				<p
					className="reviews-title text-center font-italianno text-5xl text-[#00B7FF] lg:text-6xl"
					style={{
						textShadow: "1px 1px 0 #fff",
					}}>
					Reviews
				</p>

				<p className="reviews-description mx-auto w-10/12 text-center font-regular leading-none text-white lg:w-full lg:text-lg">
					Loved by thousands of freelancers and professionals
				</p>

				<section className="reviews-testimonials mt-5 w-full py-3 lg:mt-7">
					<Testimonials />
				</section>
			</div>
		</div>
	);
}
