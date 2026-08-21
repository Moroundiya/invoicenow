"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
	const pathname = usePathname();

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<footer className="px-3 pt-4 bg-[url('/background-mobile.png')] lg:bg-[url('/background.png')] bg-cover bg-center bg-no-repeat lg:pt-5 lg:px-5 text-white">
			<div className="mx-auto max-w-7xl">
				<div className="flex flex-col items-center border-b border-white/10 text-center">
					<Link
						href="/"
						className="inline-block">
						<Image
							src="/logo.png"
							alt="InvoiceNow"
							width={240}
							height={70}
							className="h-auto w-48 object-contain lg:w-70"
						/>
					</Link>

					<p className="font-inter my-5 max-w-md text-sm leading-snug text-white/50">
						Create professional invoices in seconds. Simple, fast, and built for
						freelancers and businesses.
					</p>

					{pathname === "/" && (
						<Link
							href="#create"
							className="font-inter mb-12 inline-flex items-center gap-2 rounded-lg bg-[#00B7FF] px-5 py-3 text-sm font-medium text-[#041636] transition-all duration-300 hover:bg-[#00a5e6] hover:shadow-[0_0_20px_rgba(0,183,255,0.25)]">
							Create your first invoice
							<ArrowUpRight className="h-4 w-4" />
						</Link>
					)}
				</div>

				<div className="flex flex-col items-center gap-4 py-6 text-center sm:relative">
					<p className="font-inter text-sm text-white/40">
						© {new Date().getFullYear()} InvoiceNow
					</p>

					<button
						type="button"
						onClick={scrollToTop}
						aria-label="Scroll to top"
						className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-[#00B7FF]/40 hover:bg-[#00B7FF]/10 hover:shadow-[0_0_25px_rgba(0,183,255,0.2)] sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2">
						<span className="font-inter text-xs font-medium text-white/50 transition-colors duration-300 group-hover:text-[#00B7FF]">
							Back to top
						</span>

						<ArrowUp className="h-4 w-4 animate-bounce text-white/60 transition-colors duration-300 group-hover:text-[#00B7FF]" />
					</button>
				</div>
			</div>
		</footer>
	);
}
