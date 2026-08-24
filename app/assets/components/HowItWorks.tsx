"use client";

import { useRef } from "react";
import Image from "next/image";
import ArrowRightIcon from "@iconify-react/vadivam/arrow-right";
import { steps } from "@/app/assets/data/steps";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HowItWorks() {
	const sectionRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const reduceMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			if (reduceMotion) return;

			const isDesktop = window.matchMedia("(min-width: 768px)").matches;

			const headingTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
					toggleActions: "play none none none",
					once: true,
				},
			});

			headingTimeline
				.fromTo(
					".how-title",
					{
						opacity: 0,
						y: 25,
					},
					{
						opacity: 1,
						y: 0,
						duration: 0.65,
						ease: "power3.out",
					},
				)
				.fromTo(
					".how-subtitle",
					{
						opacity: 0,
						y: 15,
					},
					{
						opacity: 1,
						y: 0,
						duration: 0.45,
						ease: "power3.out",
					},
					"-=0.35",
				);

			if (isDesktop) {
				const desktopSteps = gsap.utils.toArray<HTMLElement>(".how-step");

				const desktopConnectors = gsap.utils.toArray<HTMLElement>(
					".how-desktop-connector",
				);

				gsap.set(desktopSteps, {
					opacity: 0,
					y: 30,
				});

				gsap.set(desktopConnectors, {
					opacity: 0,
					scaleX: 0,
					transformOrigin: "left center",
				});

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 70%",
						toggleActions: "play none none none",
						once: true,
					},
					defaults: {
						ease: "power3.out",
					},
				});

				tl.to(desktopSteps[0], {
					opacity: 1,
					y: 0,
					duration: 0.45,
				});

				if (desktopConnectors[0]) {
					tl.to(desktopConnectors[0], {
						opacity: 1,
						scaleX: 1,
						duration: 0.3,
						ease: "power2.out",
					});
				}

				if (desktopSteps[1]) {
					tl.to(desktopSteps[1], {
						opacity: 1,
						y: 0,
						duration: 0.45,
					});
				}

				if (desktopConnectors[1]) {
					tl.to(desktopConnectors[1], {
						opacity: 1,
						scaleX: 1,
						duration: 0.3,
						ease: "power2.out",
					});
				}

				if (desktopSteps[2]) {
					tl.to(desktopSteps[2], {
						opacity: 1,
						y: 0,
						duration: 0.45,
					});
				}

				return;
			}

			gsap.utils.toArray<HTMLElement>(".how-step").forEach((step) => {
				gsap.fromTo(
					step,
					{
						opacity: 0,
						y: 45,
					},
					{
						opacity: 1,
						y: 0,
						duration: 0.7,
						ease: "power3.out",
						scrollTrigger: {
							trigger: step,
							start: "top 82%",
							toggleActions: "play none none none",
							once: true,
						},
					},
				);
			});

			gsap.utils
				.toArray<HTMLElement>(".how-mobile-connector")
				.forEach((connector) => {
					gsap.fromTo(
						connector,
						{
							opacity: 0,
							scaleY: 0,
						},
						{
							opacity: 1,
							scaleY: 1,
							duration: 0.65,
							ease: "power2.out",
							transformOrigin: "top center",
							scrollTrigger: {
								trigger: connector,
								start: "top 88%",
								toggleActions: "play none none none",
								once: true,
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
			className='w-full bg-[url("/background-mobile.webp")] bg-cover bg-center bg-no-repeat px-3 py-8 lg:bg-[url("/background.webp")]'
			id="how-it-works">
			<div className="mx-auto h-full lg:w-10/12">
				<p
					className="how-title text-center font-italianno text-5xl text-[#00B7FF] lg:text-6xl"
					style={{
						textShadow: "1px 1px 0 #fff",
					}}>
					How It Works
				</p>

				<p className="how-subtitle text-center font-regular leading-none text-white lg:text-lg">
					3 simple steps to get paid
				</p>

				<section className="w-full px-6 pt-10 lg:pt-20">
					<div className="mx-auto flex max-w-6xl flex-col md:flex-row md:space-x-5">
						{steps.map((step, index) => (
							<div
								key={step.number}
								className="how-step relative flex min-w-0 flex-1 flex-col items-center">
								<div className="flex flex-col items-center">
									<div className="relative">
										<div className="flex h-36 w-36 items-center justify-center rounded-full border-2 border-[#041E50] bg-[#041f5049]">
											<Image
												src={step.image}
												alt={step.title}
												className="h-3/5 w-3/5 object-contain"
											/>
										</div>

										<div className="absolute bottom-0 right-3 flex h-8 w-8 items-center justify-center">
											<div className="h-full w-full">
												<div className="absolute inset-0 translate-x-px translate-y-px rounded-full bg-[#00B7FF]" />

												<div className="relative flex h-full w-full items-center justify-center rounded-full bg-linear-to-br from-[#00B7FF] via-[#0066FF] to-[#041E50] text-lg font-bold text-white">
													{step.number}
												</div>
											</div>
										</div>
									</div>

									<div className="mt-5 max-w-70 text-center lg:mt-7">
										<h3 className="font-italianno text-4xl text-white">
											{step.title}
										</h3>

										<p className="leading-snug text-white/60">
											{step.description}
										</p>
									</div>
								</div>

								{index < steps.length - 1 && (
									<div
										className="how-desktop-connector absolute top-18 hidden -translate-y-1/2 items-center md:flex"
										style={{
											left: "calc(50% + 72px + (100% - 144px) / 4)",
											width: "calc((100% - 144px) / 2)",
										}}>
										<div className="w-full border-t-4 border-dotted border-[#00B7FF]" />

										<ArrowRightIcon className="h-7 w-7 shrink-0 text-[#00B7FF]" />
									</div>
								)}

								{index < steps.length - 1 && (
									<div className="how-mobile-connector my-5 flex h-20 flex-col items-center md:hidden">
										<div className="h-14 border-l-4 border-dotted border-[#00B7FF]" />

										<ArrowRightIcon className="mt-1 h-7 rotate-90 text-[#00B7FF]" />
									</div>
								)}
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
