import Image from "next/image";
import Link from "next/link";

export default function CreateInvoiceHeader() {
	return (
		<header className="flex items-center justify-between gap-4">
			<Link
				href="/"
				aria-label="InvoiceNow home"
				className="shrink-0 transition-opacity hover:opacity-80">
				<Image
					src="/logo.png"
					alt="InvoiceNow"
					width={150}
					height={45}
					priority
					className="h-auto w-[115px] sm:w-[135px]"
				/>
			</Link>

			<div className="flex items-center gap-2 sm:gap-3">
				{/* Saved status */}
				<div className="hidden items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.04] px-4 py-2 sm:flex">
					<span className="flex h-4 w-4 items-center justify-center rounded-full border border-emerald-400/40">
						<svg
							width="9"
							height="9"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="3"
							className="text-emerald-400">
							<path d="m5 12 4 4L19 6" />
						</svg>
					</span>

					<span className="text-xs font-medium text-emerald-300">Saved</span>
				</div>

				{/* Download */}
				<button
					type="button"
					className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 text-xs font-semibold text-white shadow-[0_0_25px_rgba(0,119,255,0.18)] transition-all duration-200 hover:from-blue-500 hover:to-cyan-500 sm:h-11 sm:px-5 sm:text-sm">
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round">
						<path d="M12 3v12" />
						<path d="m7 10 5 5 5-5" />
						<path d="M5 21h14" />
					</svg>

					<span>Download</span>
				</button>
			</div>
		</header>
	);
}
