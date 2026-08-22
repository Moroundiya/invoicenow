"use client";

import { useRef } from "react";
import Questions from "../layouts/Question";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Faq() {
	const sectionRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const reduceMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			if (reduceMotion) return;

			/* ========================================
			 * TITLE + DESCRIPTION
			 * ======================================== */

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
					toggleActions: "play none none none",
					once: true,
				},
				defaults: {
					ease: "power3.out",
				},
			});

			tl.fromTo(
				".faq-title",
				{
					opacity: 0,
					y: 25,
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.65,
				},
			).fromTo(
				".faq-description",
				{
					opacity: 0,
					y: 15,
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.45,
				},
				"-=0.35",
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
			<div className="mx-auto h-full max-w-6xl">
				{/* ========================================
				 * TITLE
				 * ======================================== */}

				<p
					className="faq-title text-center font-italianno text-5xl text-[#00B7FF] lg:text-6xl"
					style={{
						textShadow: "1px 1px 0 #fff",
					}}>
					FAQ
				</p>

				{/* ========================================
				 * DESCRIPTION
				 * ======================================== */}

				<p className="faq-description text-center font-regular leading-none text-white lg:text-lg">
					Frequently asked questions
				</p>

				{/* ========================================
				 * QUESTIONS
				 *
				 * NO GSAP ANIMATION HERE.
				 * Each question handles its own animation.
				 * ======================================== */}

				<section className="mt-7 h-135 w-full md:h-90 lg:mt-12 lg:px-6">
					<Questions />
				</section>
			</div>
		</div>
	);
}
