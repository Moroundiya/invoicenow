"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
	return (
		<footer className="px-3 pt-4 bg-[url('/background-mobile.png')] lg:bg-[url('/background.png')] bg-cover bg-center bg-no-repeat lg:pt-5 lg:px-5 text-white">
			<div className="mx-auto max-w-7xl">
				<div className="flex flex-col items-center border-b border-white/10 pb-12 text-center">
					<Link
						href="/"
						className="inline-block">
						<Image
							src="/logo.png"
							alt="InvoiceNow"
							width={240}
							height={70}
							className="h-auto w-48 lg:w-70 object-contain"
						/>
					</Link>

					<p className="font-inter mt-5 max-w-md text-sm leading-snug text-white/50">
						Create professional invoices in seconds. Simple, fast, and built for
						freelancers and businesses.
					</p>

					<Link
						href="#create"
						className="font-inter mt-6 inline-flex items-center gap-2 rounded-lg bg-[#00B7FF] px-5 py-3 text-sm font-medium text-[#041636] transition-all duration-300 hover:bg-[#00a5e6] hover:shadow-[0_0_20px_rgba(0,183,255,0.25)]">
						Create your first invoice
						<ArrowUpRight className="h-4 w-4" />
					</Link>
				</div>

				<div className="flex flex-col items-center gap-3 py-6 text-center">
					<p className="font-inter text-sm text-white/40">
						© {new Date().getFullYear()} InvoiceNow
					</p>
				</div>
			</div>
		</footer>
	);
}
