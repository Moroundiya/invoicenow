"use client";

import Image from "next/image";

export default function InvoiceHeader() {
	return (
		<header className="border-b border-white/[0.05] bg-[#020817]">
			<div className="mx-auto flex h-[86px] max-w-[1720px] items-center justify-between px-5 sm:px-8 lg:px-10">
				<div className="flex items-center gap-3">
					<div className="relative h-11 w-11 shrink-0">
						<Image
							src="/logo.png"
							alt="InvoiceNow"
							fill
							className="object-contain"
							priority
						/>
					</div>

					<div>
						<div className="text-[20px] font-bold leading-none tracking-tight">
							invoice<span className="text-blue-500">Now</span>
						</div>

						<p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.22em] text-slate-500">
							Invoice Generator
						</p>
					</div>
				</div>

				<div className="flex items-center gap-4 sm:gap-5">
					<button
						type="button"
						className="text-sm font-medium text-slate-400 transition hover:text-white">
						Save Draft
					</button>

					<div className="h-5 w-px bg-white/10" />

					<button
						type="button"
						className="text-sm font-medium text-slate-400 transition hover:text-white">
						Exit
					</button>
				</div>
			</div>
		</header>
	);
}
