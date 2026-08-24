"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Footer() {
	const pathname = usePathname();
	const footerRef = useRef<HTMLElement>(null);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useGSAP(
		() => {
			const reduceMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			if (reduceMotion) return;

			gsap.set(".footer-logo", {
				opacity: 0,
				y: 25,
				scale: 0.95,
			});

			gsap.set(".footer-description", {
				opacity: 0,
				y: 20,
			});

			gsap.set(".footer-cta", {
				opacity: 0,
				y: 20,
			});

			gsap.set(".footer-divider-content", {
				opacity: 0,
				y: 15,
			});

			gsap.set(".footer-top-button", {
				opacity: 0,
				y: 20,
			});

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: footerRef.current,
					start: "top 88%",
					toggleActions: "play none none none",
					once: true,
				},
				defaults: {
					ease: "power3.out",
				},
			});

			tl.to(".footer-logo", {
				opacity: 1,
				y: 0,
				scale: 1,
				duration: 0.7,
			});

			tl.to(
				".footer-description",
				{
					opacity: 1,
					y: 0,
					duration: 0.5,
				},
				"-=0.35",
			);

			if (pathname === "/") {
				tl.to(
					".footer-cta",
					{
						opacity: 1,
						y: 0,
						duration: 0.5,
					},
					"-=0.25",
				);
			}

			tl.to(
				".footer-divider-content",
				{
					opacity: 1,
					y: 0,
					duration: 0.5,
				},
				"-=0.15",
			);

			tl.to(
				".footer-top-button",
				{
					opacity: 1,
					y: 0,
					duration: 0.5,
				},
				"-=0.3",
			);
		},
		{
			scope: footerRef,
			dependencies: [pathname],
		},
	);

	return (
		<footer
			ref={footerRef}
			className="
				relative
				block
				w-full
				overflow-hidden
				bg-[url('/background-mobile.webp')]
				bg-cover
				bg-center
				bg-no-repeat
				px-3
				pt-4
				pb-0
				text-white
				lg:bg-[url('/background.webp')]
				lg:px-5
				lg:pt-5
			">
			<div className="mx-auto w-full max-w-7xl">
				<div
					className="
						flex
						w-full
						flex-col
						items-center
						border-b
						border-white/10
						text-center
					">
					<Link
						href="/"
						className="footer-logo inline-block">
						<Image
							src="/logo.png"
							alt="InvoiceNow"
							width={240}
							height={70}
							priority
							className="
								h-auto
								w-44
								object-contain
								sm:w-48
								md:w-52
								lg:w-60
							"
						/>
					</Link>

					<p
						className="
							footer-description
							my-4
							w-full
							max-w-md
							px-2
							font-inter
							text-sm
							leading-relaxed
							text-white/50
							lg:my-5
						">
						Create professional invoices in seconds. Simple, fast, and built for
						freelancers and businesses.
					</p>

					{pathname === "/" && (
						<Link
							href="#create"
							className="
								footer-cta
								mb-8
								inline-flex
								items-center
								gap-2
								rounded-lg
								bg-[#00B7FF]
								px-5
								py-3
								font-inter
								text-sm
								font-medium
								text-[#041636]
								transition-all
								duration-300
								hover:bg-[#00a5e6]
								hover:shadow-[0_0_20px_rgba(0,183,255,0.25)]
								lg:mb-12
							">
							Create your first invoice
							<ArrowUpRight className="h-4 w-4" />
						</Link>
					)}
				</div>

				<div
					className="
						footer-divider-content relative
						flex
						w-full
						flex-col
						items-center
						gap-4
						py-5
						text-center
						sm:py-6
					">
					<p className="font-inter text-sm text-white/40">
						© {new Date().getFullYear()} InvoiceNow
					</p>

					<button
						type="button"
						onClick={scrollToTop}
						aria-label="Scroll to top"
						className="
							footer-top-button
							group
							flex
							items-center
							gap-2
							rounded-full
							border
							border-white/10
							bg-white/5
							px-4
							py-2.5
							backdrop-blur-sm
							transition-all
							duration-300
							hover:scale-105
							hover:border-[#00B7FF]/40
							hover:bg-[#00B7FF]/10
							hover:shadow-[0_0_25px_rgba(0,183,255,0.2)]
							sm:absolute
							sm:right-0
							sm:bottom-3
							sm:-translate-y-1/2
						">
						<span
							className="
								font-inter
								text-sm
								font-medium
								text-white/50
								transition-colors
								duration-300
								group-hover:text-[#00B7FF]
							">
							Back to top
						</span>

						<ArrowUp
							className="
								h-4
								w-4
								animate-bounce
								text-white/60
								transition-colors
								duration-300
								group-hover:text-[#00B7FF]
							"
						/>
					</button>
				</div>
			</div>
		</footer>
	);
}
