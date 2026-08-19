import type { InvoiceTemplate } from "@/app/assets/types/invoiceType";

interface TemplateCardProps {
	id: InvoiceTemplate;
	name: string;
	description: string;
	selected: boolean;
	onSelect: (template: InvoiceTemplate) => void;
}

export default function TemplateCard({
	id,
	name,
	description,
	selected,
	onSelect,
}: TemplateCardProps) {
	return (
		<button
			type="button"
			onClick={() => onSelect(id)}
			className={`group relative w-full overflow-hidden rounded-2xl border text-left transition-all duration-300 ${
				selected
					? "border-blue-400/60 bg-blue-500/[0.07] shadow-[0_0_35px_rgba(0,119,255,0.12)]"
					: "border-white/[0.08] bg-[#07152b]/70 hover:border-blue-400/25 hover:bg-blue-500/[0.03]"
			}`}>
			{/* Selection indicator */}
			<div
				className={`absolute right-4 top-4 z-20 flex h-6 w-6 items-center justify-center rounded-full border transition-all ${
					selected
						? "border-blue-400 bg-blue-500 text-white"
						: "border-white/15 bg-[#020817] text-transparent"
				}`}>
				<svg
					width="13"
					height="13"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="3">
					<path d="m5 12 4 4L19 6" />
				</svg>
			</div>

			{/* Template preview */}
			<div className="relative aspect-[0.76] overflow-hidden bg-[#020817] p-4">
				<div className="h-full w-full origin-top rounded-sm bg-white shadow-xl transition-transform duration-300 group-hover:scale-[1.015]">
					{getTemplatePreview(id)}
				</div>
			</div>

			{/* Information */}
			<div className="border-t border-white/[0.06] px-4 py-4">
				<div className="flex items-center justify-between gap-3">
					<h3
						className={`text-sm font-semibold ${
							selected ? "text-white" : "text-slate-200"
						}`}>
						{name}
					</h3>

					<span
						className={`rounded-full px-2 py-1 text-[9px] font-semibold uppercase tracking-wider ${
							selected
								? "bg-blue-500/10 text-blue-300"
								: "bg-white/[0.04] text-slate-500"
						}`}>
						{id}
					</span>
				</div>

				<p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
			</div>
		</button>
	);
}

function getTemplatePreview(template: InvoiceTemplate) {
	if (template === "modern") {
		return (
			<div className="h-full overflow-hidden text-[5px] text-slate-700">
				<div className="relative h-[24%] bg-[#0b1f3a] p-4">
					<div className="h-2 w-14 rounded bg-white/90" />

					<div className="absolute right-4 top-5 text-right">
						<div className="text-[9px] font-bold text-white">INVOICE</div>

						<div className="mt-1 h-1 w-10 rounded bg-white/30" />
					</div>
				</div>

				<div className="p-4">
					<div className="grid grid-cols-2 gap-4">
						<PreviewBlock />
						<PreviewBlock />
					</div>

					<div className="mt-5 overflow-hidden rounded border border-slate-200">
						<div className="h-4 bg-[#0b1f3a]" />

						{[1, 2, 3].map((item) => (
							<div
								key={item}
								className="grid grid-cols-3 gap-2 border-t border-slate-100 p-3">
								<div className="h-1.5 rounded bg-slate-200" />
								<div className="h-1.5 rounded bg-slate-100" />
								<div className="h-1.5 rounded bg-slate-100" />
							</div>
						))}
					</div>

					<div className="ml-auto mt-5 w-1/2">
						<div className="h-3 rounded bg-slate-100" />
						<div className="mt-1 h-5 rounded bg-[#0b1f3a]" />
					</div>
				</div>
			</div>
		);
	}

	if (template === "classic") {
		return (
			<div className="h-full overflow-hidden p-4 text-[5px] text-slate-700">
				<div className="flex items-start justify-between">
					<div>
						<div className="h-4 w-16 rounded bg-[#123b69]" />
						<div className="mt-2 h-1 w-12 rounded bg-slate-200" />
					</div>

					<div className="text-right">
						<div className="text-[9px] font-bold text-[#123b69]">INVOICE</div>

						<div className="mt-1 h-1 w-12 rounded bg-slate-200" />
					</div>
				</div>

				<div className="mt-4 h-px bg-[#2563eb]" />

				<div className="mt-5 grid grid-cols-2 gap-4">
					<PreviewBlock />
					<PreviewBlock />
				</div>

				<div className="mt-5 overflow-hidden border border-slate-200">
					<div className="h-5 bg-[#2563eb]" />

					{[1, 2, 3, 4].map((item) => (
						<div
							key={item}
							className="grid grid-cols-4 gap-2 border-t border-slate-100 p-2.5">
							<div className="h-1.5 rounded bg-slate-100" />
							<div className="h-1.5 rounded bg-slate-100" />
							<div className="h-1.5 rounded bg-slate-100" />
							<div className="h-1.5 rounded bg-slate-100" />
						</div>
					))}
				</div>

				<div className="mt-5 ml-auto w-2/5">
					<div className="flex justify-between">
						<div className="h-1.5 w-8 rounded bg-slate-100" />
						<div className="h-1.5 w-8 rounded bg-slate-200" />
					</div>

					<div className="mt-2 flex justify-between bg-[#2563eb] p-2">
						<div className="h-1.5 w-8 rounded bg-white/60" />
						<div className="h-1.5 w-8 rounded bg-white/80" />
					</div>
				</div>
			</div>
		);
	}

	// Simple
	return (
		<div className="h-full overflow-hidden p-4 text-[5px] text-slate-700">
			<div className="flex items-start justify-between">
				<div>
					<div className="h-4 w-16 rounded bg-[#2563eb]" />

					<div className="mt-2 h-1 w-14 rounded bg-slate-200" />

					<div className="mt-1 h-1 w-10 rounded bg-slate-100" />
				</div>

				<div className="text-right">
					<div className="text-[9px] font-bold text-[#2563eb]">INVOICE</div>

					<div className="mt-1 h-1 w-12 rounded bg-slate-200" />
				</div>
			</div>

			<div className="mt-4 grid grid-cols-4 border border-slate-200">
				{Array.from({ length: 8 }).map((_, index) => (
					<div
						key={index}
						className="border-r border-b border-slate-200 p-2">
						<div className="h-1 rounded bg-slate-100" />
						<div className="mt-1 h-1 rounded bg-slate-200" />
					</div>
				))}
			</div>

			<div className="mt-5 grid grid-cols-2 gap-4">
				<PreviewBlock />
				<PreviewBlock />
			</div>

			<div className="mt-5 overflow-hidden border border-slate-200">
				<div className="h-5 bg-[#2563eb]" />

				{[1, 2, 3].map((item) => (
					<div
						key={item}
						className="grid grid-cols-4 gap-2 border-t border-slate-100 p-3">
						<div className="h-1.5 rounded bg-slate-100" />
						<div className="h-1.5 rounded bg-slate-100" />
						<div className="h-1.5 rounded bg-slate-100" />
						<div className="h-1.5 rounded bg-slate-100" />
					</div>
				))}
			</div>
		</div>
	);
}

function PreviewBlock() {
	return (
		<div>
			<div className="mb-2 h-2 w-10 rounded bg-blue-100" />
			<div className="h-1.5 w-20 rounded bg-slate-200" />
			<div className="mt-1.5 h-1 w-24 rounded bg-slate-100" />
			<div className="mt-1 h-1 w-16 rounded bg-slate-100" />
		</div>
	);
}
