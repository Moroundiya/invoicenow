"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import Navbar from "../layouts/Navbar";
import invoice from "@/app/assets/images/invoice.png";

import FlashIcon from "@iconify-react/fontisto/flash";
import DotFilledIcon from "@iconify-react/radix-icons/dot-filled";
import ArrowRightLineIcon from "@iconify-react/majesticons/arrow-right-line";

import { Check } from "lucide-react";
import { RoughNotation } from "react-rough-notation";

gsap.registerPlugin(useGSAP);

export default function HeroSection() {
	const heroRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const reduceMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			if (reduceMotion) return;

			const tl = gsap.timeline({
				defaults: {
					ease: "power3.out",
				},
			});

			/* ================================
			 * INITIAL STATES
			 * ================================ */

			gsap.set(".hero-badge", {
				opacity: 0,
				y: 15,
				scale: 0.95,
			});

			gsap.set(".hero-char", {
				opacity: 0,
				y: 18,
				filter: "blur(5px)",
			});

			gsap.set(".hero-description-word", {
				opacity: 0,
				y: 10,
				filter: "blur(3px)",
			});

			gsap.set(".hero-benefit", {
				opacity: 0,
				x: -35,
			});

			gsap.set(".hero-cta", {
				opacity: 0,
				y: 20,
			});

			gsap.set(".hero-invoice", {
				opacity: 0,
				scale: 1.12,
				y: 15,
			});

			/* ================================
			 * HERO TIMELINE
			 * ================================ */

			// Badge
			tl.to(".hero-badge", {
				opacity: 1,
				y: 0,
				scale: 1,
				duration: 0.55,
			})

				// TITLE — CHARACTER BY CHARACTER
				.to(
					".hero-char",
					{
						opacity: 1,
						y: 0,
						filter: "blur(0px)",
						duration: 0.35,
						stagger: 0.035,
						ease: "power3.out",
					},
					"-=0.15",
				)

				// DESCRIPTION — WORD BY WORD
				.to(
					".hero-description-word",
					{
						opacity: 1,
						y: 0,
						filter: "blur(0px)",
						duration: 0.3,
						stagger: 0.025,
						ease: "power2.out",
					},
					"-=0.25",
				)

				// BENEFITS — STAGGER FROM LEFT
				.to(
					".hero-benefit",
					{
						opacity: 1,
						x: 0,
						duration: 0.5,
						stagger: 0.16,
						ease: "power3.out",
					},
					"-=0.5",
				)

				// CTA
				.to(
					".hero-cta",
					{
						opacity: 1,
						y: 0,
						duration: 0.6,
						ease: "power3.out",
					},
					"-=0.25",
				)

				// INVOICE — ZOOM OUT
				.to(
					".hero-invoice",
					{
						opacity: 1,
						scale: 1,
						y: 0,
						duration: 5,
						delay: 0.4,
						ease: "power3.out",
					},
					"-=0.65",
				);

			/* ================================
			 * INVOICE FLOAT
			 * ================================ */

			gsap.to(".hero-invoice", {
				y: -7,
				duration: 3.5,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
				delay: 1.8,
			});
		},
		{ scope: heroRef },
	);

	/* ================================
	 * CTA HOVER
	 * ================================ */

	const handleButtonEnter = (element: HTMLElement) => {
		gsap.to(element, {
			scale: 1.025,
			duration: 0.3,
			ease: "power2.out",
		});

		gsap.to(element.querySelector(".hero-arrow"), {
			x: 5,
			duration: 0.3,
			ease: "power2.out",
		});
	};

	const handleButtonLeave = (element: HTMLElement) => {
		gsap.to(element, {
			scale: 1,
			duration: 0.35,
			ease: "power2.out",
		});

		gsap.to(element.querySelector(".hero-arrow"), {
			x: 0,
			duration: 0.35,
			ease: "power2.out",
		});
	};

	/* ================================
	 * TITLE
	 * ================================ */

	const title = "Create Professional\nInvoices in";

	return (
		<div
			ref={heroRef}
			className="min-h-dvh w-full overflow-hidden bg-[url('/background-mobile.png')] bg-cover bg-center bg-no-repeat px-3 py-5 lg:bg-[url('/background.webp')] lg:px-6 lg:py-7 xl:px-10">
			<Navbar />

			<div className="mx-auto mt-18 grid grid-cols-1 items-center gap-10 lg:mt-12 lg:grid-cols-2 lg:gap-0">
				{/* ================================
				 * LEFT CONTENT
				 * ================================ */}

				<div className="flex w-full flex-col items-start justify-center">
					{/* BADGE */}

					<div className="hero-badge mb-3 flex items-center justify-center space-x-1 rounded-full bg-[#00B7FF] px-2 py-1 font-semibold text-[#041636] lg:px-3">
						<FlashIcon className="h-2.5 text-[#041636] md:h-3.5" />

						<div className="flex items-center justify-center space-x-0.5 text-[11px] md:text-xs lg:text-sm">
							<p>Create</p>

							<DotFilledIcon className="h-2.5 md:h-3.5 lg:h-4" />

							<p>Send</p>

							<DotFilledIcon className="h-2.5 md:h-3.5 lg:h-4" />

							<p>Get paid</p>
						</div>
					</div>

					{/* TITLE */}

					<p
						className="max-w-3xl text-[2.5rem] font-bold leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[0.95]"
						style={{
							textShadow: "1.5px 1.5px 0 #00B7FF",
						}}>
						{title.split("\n").map((line, lineIndex) => (
							<span
								key={lineIndex}
								className="block">
								{line.split("").map((char, charIndex) => (
									<span
										key={`${lineIndex}-${char}-${charIndex}`}
										className="hero-char inline-block">
										{char === " " ? "\u00A0" : char}
									</span>
								))}

								{/* SECONDS — ONLY ON SECOND LINE */}
								{lineIndex === 1 && (
									<span
										className="hero-char ms-2 inline-block font-italianno text-[2.8rem] text-[#00B7FF] sm:text-5xl md:text-6xl lg:ms-4 lg:text-7xl"
										style={{
											textShadow: "1px .5px 0 #fff",
										}}>
										<RoughNotation
											type="circle"
											animationDelay={2300}
											color="#00B7FF"
											strokeWidth={2}
											padding={5}
											animate
											show>
											Seconds
										</RoughNotation>
									</span>
								)}
							</span>
						))}
					</p>

					{/* DESCRIPTION */}

					<p className="mt-5 w-full max-w-2xl font-light text-white/70 sm:text-base lg:w-10/12 lg:leading-6">
						{"InvoiceNow helps freelancers and businesses create, customize, download professional invoices effortlessly and get paid faster, without the stress or hassle."
							.split(" ")
							.map((word, index) => (
								<span
									key={`${word}-${index}`}
									className="hero-description-word mr-[0.25em] inline-block">
									{word}
								</span>
							))}
					</p>

					{/* BENEFITS */}

					<div className="mt-5 flex w-full flex-col gap-x-3 gap-y-2 text-white/70 lg:flex-row lg:items-center">
						<div className="hero-benefit flex items-center gap-2">
							<div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#009EFF]">
								<Check
									className="h-3 w-3 text-[#041636]"
									strokeWidth={3}
								/>
							</div>

							<span>No complicated setup</span>
						</div>

						<div className="hidden h-4 w-px bg-white/20 lg:block" />

						<div className="hero-benefit flex items-center gap-2">
							<div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#009EFF]">
								<Check
									className="h-3 w-3 text-[#041636]"
									strokeWidth={3}
								/>
							</div>

							<span>No sign up</span>
						</div>

						<div className="hidden h-4 w-px bg-white/20 lg:block" />

						<div className="hero-benefit flex items-center gap-2">
							<div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#009EFF]">
								<Check
									className="h-3 w-3 text-[#041636]"
									strokeWidth={3}
								/>
							</div>

							<span>No credit card required</span>
						</div>
					</div>

					{/* CTA */}

					<div className="hero-cta mt-8 w-full sm:mt-10">
						<Link
							href="/create"
							onMouseEnter={(e) => handleButtonEnter(e.currentTarget)}
							onMouseLeave={(e) => handleButtonLeave(e.currentTarget)}
							className="group max-w-fit flex items-center justify-center space-x-1 rounded-xl bg-linear-to-br from-[#00B7FF] via-[#0066FF] to-[#041E50] px-3 py-3 font-semibold text-white shadow-[0_8px_30px_rgba(0,183,255,0.08)] transition-shadow duration-300 hover:shadow-[0_10px_35px_rgba(0,183,255,0.2)] sm:w-auto lg:space-x-2 lg:px-5 lg:text-base">
							<span>Create your first invoice</span>

							<ArrowRightLineIcon className="hero-arrow h-5 text-white" />
						</Link>

						{/* <Link
							href="#features"
							className="font-semibold text-[#00B7FF] transition-colors duration-300 hover:text-white lg:text-base">
							Explore Features
						</Link> */}
					</div>
				</div>

				{/* ================================
				 * INVOICE
				 * ================================ */}

				<div className="flex w-full items-center justify-center">
					<div className="hero-invoice">
						<Image
							src={invoice}
							alt="InvoiceNow invoice preview"
							priority
							className="mx-auto h-auto w-[95%] object-contain sm:w-[80%] lg:w-132 lg:max-w-none"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
