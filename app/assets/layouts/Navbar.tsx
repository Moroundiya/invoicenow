"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	const navRef = useRef<HTMLElement>(null);
	const menuIconRef = useRef<HTMLButtonElement>(null);
	const mobileMenuRef = useRef<HTMLDivElement>(null);

	const closeMenu = () => {
		setIsOpen(false);
	};

	/* ========================================
	 * NAVBAR ENTRANCE ANIMATION
	 * ======================================== */

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

			/* Initial states */

			gsap.set(".navbar-logo", {
				opacity: 0,
				scale: 1.5,
			});

			gsap.set(".navbar-link", {
				opacity: 0,
				y: -15,
			});

			gsap.set(".navbar-cta", {
				opacity: 0,
				scale: 0.9,
			});

			gsap.set(".navbar-mobile-button", {
				opacity: 0,
				scale: 0.8,
			});

			/* Mobile button entrance */

			gsap.from(menuIconRef.current, {
				scale: 2,
				opacity: 0,
				duration: 1,
				ease: "power3.out",
			});

			/* Animation sequence */

			tl.to(".navbar-logo", {
				opacity: 1,
				scale: 1,
				duration: 1.5,
				ease: "power3.out",
			})
				.to(
					".navbar-link",
					{
						opacity: 1,
						y: 0,
						duration: 0.5,
						stagger: 0.1,
						ease: "power3.out",
					},
					"-=0.45",
				)
				.to(
					".navbar-cta",
					{
						opacity: 1,
						scale: 1,
						duration: 0.5,
						ease: "power3.out",
					},
					"-=0.3",
				)
				.to(
					".navbar-mobile-button",
					{
						opacity: 1,
						scale: 1,
						duration: 0.45,
						ease: "power3.out",
					},
					"-=0.4",
				);
		},
		{ scope: navRef },
	);

	/* ========================================
	 * MOBILE MENU SLIDE ANIMATION
	 * ======================================== */

	useGSAP(
		() => {
			const menu = mobileMenuRef.current;

			if (!menu) return;

			gsap.killTweensOf(menu);

			if (isOpen) {
				/* OPEN */

				gsap.set(menu, {
					visibility: "visible",
					opacity: 1,
					y: -20,
				});

				gsap.to(menu, {
					y: 0,
					duration: 0.4,
					ease: "power3.out",
				});
			} else {
				/* CLOSE */

				gsap.to(menu, {
					y: -20,
					opacity: 0,
					duration: 0.2,
					ease: "power3.in",
					onComplete: () => {
						gsap.set(menu, {
							visibility: "hidden",
						});
					},
				});
			}
		},
		{
			dependencies: [isOpen],
			scope: navRef,
		},
	);

	/* ========================================
	 * MOBILE MENU BUTTON
	 * ======================================== */

	const toggleMenu = () => {
		setIsOpen((previous) => !previous);
	};

	return (
		<nav
			ref={navRef}
			className="relative z-50 mx-auto w-full">
			<div className="flex items-center justify-between">
				{/* ========================================
				 * LOGO
				 * ======================================== */}

				<Link
					href="/"
					onClick={closeMenu}
					className="navbar-logo origin-center">
					<Image
						src="/logo.png"
						alt="InvoiceNow"
						width={150}
						height={45}
						className="h-auto w-45 sm:w-53"
					/>
				</Link>

				{/* ========================================
				 * DESKTOP NAVIGATION
				 * ======================================== */}

				<div className="hidden items-center gap-8 lg:flex">
					<Link
						href="#features"
						className="navbar-link group relative text-white">
						Features
						<span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#00B7FF] transition-all duration-300 ease-out group-hover:w-full" />
					</Link>

					<Link
						href="#how-it-works"
						className="navbar-link group relative text-white">
						How it works
						<span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#00B7FF] transition-all duration-300 ease-out group-hover:w-full" />
					</Link>

					<Link
						href="#testimonials"
						className="navbar-link group relative text-white">
						Testimonials
						<span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#00B7FF] transition-all duration-300 ease-out group-hover:w-full" />
					</Link>
				</div>

				{/* ========================================
				 * DESKTOP CTA
				 * ======================================== */}

				<Link
					href="/create"
					className="navbar-cta hidden rounded-sm bg-[#00B7FF] px-4 py-1.5 text-sm font-semibold text-[#041636] transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(0,183,255,0.25)] lg:flex">
					Get Started
				</Link>

				{/* ========================================
				 * MOBILE MENU BUTTON
				 * ======================================== */}

				<button
					ref={menuIconRef}
					type="button"
					onClick={toggleMenu}
					aria-label={isOpen ? "Close menu" : "Open menu"}
					aria-expanded={isOpen}
					className="navbar-mobile-button flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-[#00B7FF] bg-[#041f5049] text-white transition hover:bg-white/10 lg:hidden">
					{isOpen ? (
						<X className="h-5 w-5 text-[#00B7FF]" />
					) : (
						<Menu className="h-5 w-5 text-[#00B7FF]" />
					)}
				</button>
			</div>

			{/* ========================================
			 * MOBILE MENU
			 *
			 * Only the parent container is animated.
			 * Children remain completely static.
			 * ======================================== */}

			<div
				ref={mobileMenuRef}
				className="absolute left-0 right-0 top-full mt-3 lg:hidden"
				style={{
					visibility: "hidden",
					opacity: 0,
				}}>
				<div className="mx-1 rounded-2xl border border-white/10 bg-[#041636]/95 p-3 shadow-2xl backdrop-blur-md">
					<div className="flex flex-col">
						<Link
							href="#features"
							onClick={closeMenu}
							className="rounded-xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white">
							Features
						</Link>

						<Link
							href="#how-it-works"
							onClick={closeMenu}
							className="rounded-xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white">
							How it works
						</Link>

						<Link
							href="#testimonials"
							onClick={closeMenu}
							className="rounded-xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white">
							Testimonials
						</Link>

						<Link
							href="/create"
							onClick={closeMenu}
							className="mt-2 flex items-center justify-center rounded-xl bg-[#00B7FF] px-4 py-3 text-sm font-semibold text-[#041636] transition-all duration-300 hover:bg-white">
							Create Invoice
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
