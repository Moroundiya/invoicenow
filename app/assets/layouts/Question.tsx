"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/app/assets/data/faqs";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Questions() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const questionsRef = useRef<HTMLDivElement>(null);

	const toggleFAQ = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	useGSAP(
		() => {
			const reduceMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			if (reduceMotion) return;

			/* ========================================
			 * INDIVIDUAL QUESTION ANIMATION
			 * ======================================== */

			const questionItems = gsap.utils.toArray<HTMLElement>(".faq-question");

			questionItems.forEach((question) => {
				gsap.fromTo(
					question,
					{
						opacity: 0,
						y: 35,
					},
					{
						opacity: 1,
						y: 0,
						duration: 0.55,
						ease: "power3.out",
						scrollTrigger: {
							trigger: question,
							start: "top 88%",
							toggleActions: "play none none none",
							once: true,
						},
					},
				);
			});
		},
		{
			scope: questionsRef,
		},
	);

	return (
		<div
			ref={questionsRef}
			className="grid grid-cols-1 items-start gap-3 md:grid-cols-2 md:gap-x-8">
			{faqs.map((faq, index) => {
				const isOpen = openIndex === index;

				return (
					<div
						key={faq.question}
						className="faq-question overflow-hidden rounded-2xl border-2 border-[#041E50] bg-[#041f5049]">
						<button
							type="button"
							onClick={() => toggleFAQ(index)}
							className="flex w-full cursor-pointer items-center justify-between px-4 py-4 text-left"
							aria-expanded={isOpen}>
							<span className="font-inter  text-white/90">
								{faq.question}
							</span>

							<ChevronDown
								className={`h-4 w-4 shrink-0 text-white/70 transition-transform duration-300 ${
									isOpen ? "rotate-180" : ""
								}`}
							/>
						</button>

						<div
							className={`grid transition-all duration-300 ease-in-out ${
								isOpen
									? "grid-rows-[1fr] opacity-100"
									: "grid-rows-[0fr] opacity-0"
							}`}>
							<div className="overflow-hidden">
								<p className="px-4 pb-4 leading-snug text-white/50">
									{faq.answer}
								</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
