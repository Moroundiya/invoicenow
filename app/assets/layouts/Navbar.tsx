"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	const closeMenu = () => setIsOpen(false);

	return (
		<nav className="relative z-50 mx-auto w-full">
			<div className="flex items-center justify-between">
				<Link
					href="/"
					onClick={closeMenu}>
					<Image
						src="/logo.png"
						alt="InvoiceNow"
						width={150}
						height={45}
						className="h-auto w-45 sm:w-53"
					/>
				</Link>

				<div className="hidden items-center gap-8 lg:flex">
					<Link
						href="#features"
						className="group relative  text-white">
						Features
						<span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#00B7FF] transition-all duration-300 ease-out group-hover:w-full" />
					</Link>

					<Link
						href="#how-it-works"
						className="group relative  text-white">
						How it works
						<span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#00B7FF] transition-all duration-300 ease-out group-hover:w-full" />
					</Link>

					<Link
						href="#testimonials"
						className="group relative  text-white">
						Testimonials
						<span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#00B7FF] transition-all duration-300 ease-out group-hover:w-full" />
					</Link>
				</div>

				<Link
					href="/create"
					className="hidden lg:flex rounded-sm bg-[#00B7FF] px-4 py-1.5 text-sm font-semibold text-[#041636] transition hover:bg-white">
					Get Started
				</Link>

				<button
					type="button"
					onClick={() => setIsOpen((prev) => !prev)}
					aria-label={isOpen ? "Close menu" : "Open menu"}
					aria-expanded={isOpen}
					className="flex h-10 w-10 items-center justify-center rounded-full bg-[#041f5049] border-2 border-[#00B7FF] text-white transition hover:bg-white/10 lg:hidden">
					{isOpen ? (
						<X className="h-5 w-5 text-[#00B7FF]" />
					) : (
						<Menu className="h-5 w-5 text-[#00B7FF]" />
					)}
				</button>
			</div>

			<div
				className={`absolute left-0 right-0 top-full overflow-hidden transition-all duration-300 ease-out lg:hidden ${
					isOpen
						? "visible mt-3 max-h-80 opacity-100"
						: "invisible mt-0 max-h-0 opacity-0"
				}`}>
				<div className="mx-1 rounded-2xl border border-white/10 bg-[#041636]/95 p-3 shadow-2xl backdrop-blur-md">
					<div className="flex flex-col">
						<Link
							href="#features"
							onClick={closeMenu}
							className="rounded-xl px-4 py-3  text-sm text-white/70 transition hover:bg-white/5 hover:text-white">
							Features
						</Link>

						<Link
							href="#how-it-works"
							onClick={closeMenu}
							className="rounded-xl px-4 py-3  text-sm text-white/70 transition hover:bg-white/5 hover:text-white">
							How it works
						</Link>

						<Link
							href="#testimonials"
							onClick={closeMenu}
							className="rounded-xl px-4 py-3  text-sm text-white/70 transition hover:bg-white/5 hover:text-white">
							Testimonials
						</Link>

						<Link
							href="/create"
							onClick={closeMenu}
							className="mt-2 flex items-center justify-center rounded-xl bg-[#00B7FF] px-4 py-3  text-sm font-semibold text-[#041636] transition hover:bg-white">
							Create Invoice
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
