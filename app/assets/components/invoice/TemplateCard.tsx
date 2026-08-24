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
					? "border-blue-400/70 bg-blue-500/[0.07] shadow-[0_0_35px_rgba(0,119,255,0.14)]"
					: "border-white/[0.08] bg-[#07152b]/70 hover:border-blue-400/30 hover:bg-blue-500/[0.03]"
			}`}>
			{/* Selection indicator */}
			<div
				className={`absolute right-4 top-4 z-30 flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 ${
					selected
						? "border-blue-400 bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]"
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

			{/* =====================================================
			    TEMPLATE PREVIEW
			===================================================== */}

			<div className="relative aspect-[0.9] overflow-hidden bg-transparent p-3">
				<div className="h-full w-full overflow-hidden rounded-[7px] bg-white shadow-2xl transition-transform duration-500 group-hover:scale-[1.015]">
					{getTemplatePreview(id)}
				</div>
			</div>

			{/* =====================================================
			    INFORMATION
			===================================================== */}

			<div className="border-t border-white/[0.06] px-4 py-4 sm:px-5 sm:py-5">
				<div className="flex items-center justify-between gap-3">
					<h3
						className={`text-lg font-semibold ${
							selected ? "text-white" : "text-slate-200"
						}`}>
						{name}
					</h3>

					
				</div>

				<p className="mt-1.5 leading-5 text-slate-500">{description}</p>
			</div>
		</button>
	);
}

/* =========================================================
   TEMPLATE PREVIEW SWITCHER
========================================================= */

function getTemplatePreview(template: InvoiceTemplate) {
	if (template === "modern") {
		return <ModernPreview />;
	}

	if (template === "classic") {
		return <ClassicPreview />;
	}

	return <SimplePreview />;
}

/* =========================================================
   SHARED SKELETONS
========================================================= */

function SkeletonLine({
	className = "",
	dark = false,
}: {
	className?: string;
	dark?: boolean;
}) {
	return (
		<div
			className={`rounded-[2px] ${
				dark ? "bg-white/20" : "bg-slate-200"
			} ${className}`}
		/>
	);
}

function BlueLine({ className = "" }: { className?: string }) {
	return <div className={`rounded-[2px] bg-[#2166df] ${className}`} />;
}

function DarkLine({ className = "" }: { className?: string }) {
	return <div className={`rounded-[2px] bg-[#0b2a59] ${className}`} />;
}

function TableSkeleton({
	columns = 4,
	rows = 4,
	headerClass = "bg-[#2166df]",
}: {
	columns?: number;
	rows?: number;
	headerClass?: string;
}) {
	const gridClass =
		columns === 5
			? "grid-cols-[.3fr_1.5fr_.6fr_1fr_1fr]"
			: "grid-cols-[1.7fr_.55fr_1fr_1fr]";

	return (
		<div className="overflow-hidden rounded-[4px] border border-slate-200">
			<div className={`grid ${gridClass} ${headerClass}`}>
				{Array.from({ length: columns }).map((_, index) => (
					<div
						key={index}
						className="border-r border-white/20 px-[8%] py-[7%] last:border-r-0">
						<div className="h-[3px] rounded-full bg-white/80" />
					</div>
				))}
			</div>

			{Array.from({ length: rows }).map((_, rowIndex) => (
				<div
					key={rowIndex}
					className={`grid ${gridClass} border-t border-slate-200`}>
					{Array.from({ length: columns }).map((_, columnIndex) => (
						<div
							key={columnIndex}
							className="flex items-center border-r border-slate-200 px-[8%] py-[7%] last:border-r-0">
							<div
								className={`h-[3px] rounded-full ${
									columnIndex === 1
										? "w-[75%] bg-slate-300"
										: "w-[55%] bg-slate-200"
								}`}
							/>
						</div>
					))}
				</div>
			))}
		</div>
	);
}

/* =========================================================
   SIMPLE TEMPLATE
========================================================= */

function SimplePreview() {
	return (
		<div className="h-full overflow-hidden bg-white">
			<div className="flex h-full flex-col px-[5%] py-[4%]">
				{/* Header */}

				<div className="flex items-start justify-between">
					<div className="w-[45%]" />

					<div className="w-[45%]">
						<BlueLine className="ml-auto h-[12px] w-[65%]" />

						<div className="mt-[8%] space-y-[4px]">
							<SkeletonLine className="ml-auto h-[3px] w-[70%]" />
							<SkeletonLine className="ml-auto h-[3px] w-[62%]" />
							<SkeletonLine className="ml-auto h-[3px] w-[67%]" />
						</div>
					</div>
				</div>

				{/* Bill From / Bill To */}

				<div className="mt-[8%] grid grid-cols-2 overflow-hidden rounded-[4px] border border-[#b8d2ff]">
					<SimpleAddressSkeleton />

					<div className="border-l border-[#b8d2ff]">
						<SimpleAddressSkeleton />
					</div>
				</div>

				{/* Table */}

				<div className="mt-[5%]">
					<TableSkeleton
						columns={4}
						rows={4}
					/>
				</div>

				{/* Bottom */}

				<div className="mt-[5%] grid grid-cols-[1.05fr_1.25fr] gap-[5%]">
					<div className="rounded-[4px] border border-[#b8d2ff] p-[5%]">
						<BlueLine className="h-[5px] w-[42%]" />

						<div className="mt-[7%] space-y-[5px]">
							<SkeletonLine className="h-[3px] w-[85%]" />
							<SkeletonLine className="h-[3px] w-[75%]" />
							<SkeletonLine className="h-[3px] w-[82%]" />
							<SkeletonLine className="h-[3px] w-[68%]" />
						</div>

						<div className="mt-[7%] border-t border-[#b8d2ff] pt-[6%]">
							<SkeletonLine className="h-[3px] w-full" />
							<SkeletonLine className="mt-[4px] h-[3px] w-[70%]" />
						</div>
					</div>

					<div className="overflow-hidden rounded-[4px] border border-[#b8d2ff]">
						<SkeletonTotalRows />

						<div className="grid grid-cols-2 bg-[#2166df]">
							<div className="px-[7%] py-[7%]">
								<div className="h-[5px] w-[40%] rounded bg-white/80" />
							</div>

							<div className="flex justify-end px-[7%] py-[7%]">
								<div className="h-[6px] w-[35%] rounded bg-white/90" />
							</div>
						</div>
					</div>
				</div>

				{/* Footer */}

				<div className="mt-auto border-t-2 border-[#2166df] pt-[3%]">
					<div className="grid grid-cols-3 gap-3">
						<SkeletonLine className="mx-auto h-[3px] w-[65%]" />
						<SkeletonLine className="mx-auto h-[3px] w-[55%]" />
						<SkeletonLine className="mx-auto h-[3px] w-[60%]" />
					</div>
				</div>
			</div>
		</div>
	);
}

/* =========================================================
   MODERN TEMPLATE
========================================================= */

function ModernPreview() {
	return (
		<div className="h-full overflow-hidden bg-[#061631]">
			{/* Dark Header */}

			<div className="relative h-[25%] overflow-hidden px-[5%] py-[5%]">
				{/* Decorative circles */}

				<div className="absolute -right-[18%] -top-[100%] h-[230%] w-[55%] rounded-full border-[12px] border-blue-600/10" />

				<div className="absolute right-[-20%] top-[45%] h-[100%] w-[50%] rounded-full border-[10px] border-blue-500/10" />

				<div className="relative flex justify-between">
					<div>
						<div className="h-[11px] w-[48px] rounded bg-white/90" />

						<div className="mt-2 h-[1px] w-10 bg-[#1684ff]" />

						<div className="mt-3 space-y-[4px]">
							<DarkLine className="h-[3px] w-[65px]" />
							<DarkLine className="h-[3px] w-[72px]" />
							<DarkLine className="h-[3px] w-[58px]" />
							<DarkLine className="h-[3px] w-[68px]" />
						</div>
					</div>

					<div className="text-right">
						<div className="flex items-center justify-end gap-1">
							<div className="h-6 w-6 rounded bg-gradient-to-br from-cyan-300 to-blue-600" />

							<div className="space-y-[3px]">
								<div className="h-[6px] w-[45px] rounded bg-white/90" />
								<div className="h-[3px] w-[32px] rounded bg-white/40" />
							</div>
						</div>

						<div className="mt-2 ml-auto h-[4px] w-[42px] rounded bg-white/80" />
					</div>
				</div>
			</div>

			{/* White Invoice Body */}

			<div className="h-[75%] bg-white px-[5%] py-[3%]">
				{/* Addresses */}

				<div className="grid grid-cols-2 overflow-hidden rounded-[4px] border border-[#d2e1fa]">
					<ModernAddressSkeleton />

					<div className="border-l border-[#d2e1fa]">
						<ModernAddressSkeleton />
					</div>
				</div>

				{/* Items */}

				<div className="mt-[3%]">
					<TableSkeleton
						columns={5}
						rows={4}
						headerClass="bg-[#092a62]"
					/>
				</div>

				{/* Bottom */}

				<div className="mt-[3%] grid grid-cols-[1.1fr_1.25fr] gap-[4%]">
					<div className="rounded-[4px] border border-[#d2e1fa] p-[5%]">
						<BlueLine className="h-[5px] w-[40%]" />

						<div className="mt-[6%] space-y-[5px]">
							<SkeletonLine className="h-[3px] w-[80%]" />
							<SkeletonLine className="h-[3px] w-[90%]" />
							<SkeletonLine className="h-[3px] w-[75%]" />
							<SkeletonLine className="h-[3px] w-[85%]" />
						</div>

						<div className="mt-[6%] border-t border-[#d2e1fa] pt-[5%]">
							<SkeletonLine className="h-[3px] w-full" />
							<SkeletonLine className="mt-[4px] h-[3px] w-[65%]" />
						</div>
					</div>

					<div className="overflow-hidden rounded-[4px] border border-[#d2e1fa]">
						<SkeletonTotalRows />

						<div className="grid grid-cols-2 bg-gradient-to-r from-[#124bc4] to-[#1976ed]">
							<div className="px-[7%] py-[7%]">
								<div className="h-[5px] w-[48%] rounded bg-white/85" />
							</div>

							<div className="flex justify-end px-[7%] py-[7%]">
								<div className="h-[7px] w-[38%] rounded bg-white/95" />
							</div>
						</div>
					</div>
				</div>

				{/* Footer */}

				<div className="mt-[3%] border-t-2 border-[#2166df] pt-[2%]">
					<div className="mx-auto h-[4px] w-[20%] rounded bg-[#0c387c]" />
				</div>
			</div>
		</div>
	);
}

/* =========================================================
   CLASSIC TEMPLATE
========================================================= */

function ClassicPreview() {
	return (
		<div className="relative h-full overflow-hidden bg-white">
			{/* Left blue line */}

			<div className="absolute bottom-0 left-0 top-0 w-[5px] bg-[#1769ed]" />

			<div className="h-full px-[7%] py-[5%]">
				{/* Header */}

				<div className="flex items-start justify-between">
					<div>
						<div className="h-[14px] w-[62px] rounded bg-black/90" />

						<div className="mt-3 space-y-[4px]">
							<SkeletonLine className="h-[3px] w-[70px]" />
							<SkeletonLine className="h-[3px] w-[65px]" />
							<SkeletonLine className="h-[3px] w-[72px]" />
							<SkeletonLine className="h-[3px] w-[60px]" />
						</div>
					</div>

					<div className="text-right">
						<div className="flex items-center justify-end gap-1">
							<div className="h-7 w-7 rounded-full bg-gradient-to-br from-cyan-300 to-blue-600" />

							<div className="space-y-[3px]">
								<div className="h-[7px] w-[55px] rounded bg-[#1268e2]" />
								<div className="h-[3px] w-[38px] rounded bg-slate-300" />
							</div>
						</div>

						<div className="mt-2 ml-auto h-[5px] w-[45px] rounded bg-black/80" />

						<div className="mt-2 ml-auto h-[3px] w-[65px] rounded bg-[#1769ed]" />
					</div>
				</div>

				{/* Bill To / Payment */}

				<div className="mt-[7%] grid grid-cols-2 gap-[9%]">
					<div>
						<BlueLine className="h-[5px] w-[28%]" />

						<div className="mt-[6%] h-[6px] w-[65%] rounded bg-slate-800/90" />

						<div className="mt-[4%] space-y-[4px]">
							<SkeletonLine className="h-[3px] w-[75%]" />
							<SkeletonLine className="h-[3px] w-[65%]" />
							<SkeletonLine className="h-[3px] w-[80%]" />
							<SkeletonLine className="h-[3px] w-[55%]" />
						</div>

						<div className="mt-[6%] space-y-[4px]">
							<SkeletonLine className="h-[3px] w-[68%]" />
							<SkeletonLine className="h-[3px] w-[58%]" />
						</div>
					</div>

					<div>
						<BlueLine className="h-[5px] w-[35%]" />

						<div className="mt-[6%] space-y-[5px]">
							<ClassicSkeletonRow />
							<ClassicSkeletonRow />
							<ClassicSkeletonRow />
							<ClassicSkeletonRow />
						</div>
					</div>
				</div>

				{/* Table */}

				<div className="mt-[6%]">
					<TableSkeleton
						columns={5}
						rows={4}
						headerClass="bg-[#1769ed]"
					/>
				</div>

				{/* Bottom */}

				<div className="mt-[5%] grid grid-cols-[1.25fr_.9fr] gap-[8%]">
					<div>
						<BlueLine className="h-[5px] w-[35%]" />

						<div className="mt-[5%] space-y-[4px]">
							<SkeletonLine className="h-[3px] w-[85%]" />
							<SkeletonLine className="h-[3px] w-[70%]" />
						</div>

						<div className="mt-[5%]">
							<BlueLine className="h-[4px] w-[42%]" />
						</div>

						<div className="mt-[5%] space-y-[4px]">
							<SkeletonLine className="h-[3px] w-full" />
							<SkeletonLine className="h-[3px] w-[88%]" />
						</div>
					</div>

					<div className="overflow-hidden bg-[#f7f8fa]">
						<SkeletonTotalRows />

						<div className="border-t border-[#1769ed] px-[5%] py-[5%]">
							<div className="flex items-center justify-between">
								<BlueLine className="h-[5px] w-[35%]" />
								<BlueLine className="h-[7px] w-[32%]" />
							</div>
						</div>
					</div>
				</div>

				{/* Footer */}

				<div className="absolute bottom-[3%] left-[7%] right-[5%] border-t-2 border-[#1769ed] pt-[2%]">
					<div className="grid grid-cols-3 gap-4">
						<SkeletonLine className="mx-auto h-[3px] w-[70%]" />
						<SkeletonLine className="mx-auto h-[3px] w-[60%]" />
						<SkeletonLine className="mx-auto h-[3px] w-[65%]" />
					</div>
				</div>
			</div>
		</div>
	);
}

/* =========================================================
   SKELETON ADDRESS
========================================================= */

function SimpleAddressSkeleton() {
	return (
		<div className="p-[6%]">
			<BlueLine className="h-[5px] w-[28%]" />

			<div className="mt-[5%]">
				<SkeletonLine className="h-[6px] w-[48%] bg-slate-300" />
			</div>

			<div className="mt-[5%] space-y-[4px]">
				<SkeletonLine className="h-[3px] w-[68%]" />
				<SkeletonLine className="h-[3px] w-[58%]" />
				<SkeletonLine className="h-[3px] w-[75%]" />
				<SkeletonLine className="h-[3px] w-[42%]" />
			</div>

			<div className="mt-[6%] space-y-[4px]">
				<SkeletonLine className="h-[3px] w-[65%]" />
				<SkeletonLine className="h-[3px] w-[55%]" />
				<SkeletonLine className="h-[3px] w-[62%]" />
			</div>
		</div>
	);
}

/* =========================================================
   MODERN ADDRESS SKELETON
========================================================= */

function ModernAddressSkeleton() {
	return (
		<div className="p-[5%]">
			<div className="flex items-center gap-2">
				<div className="h-4 w-4 rounded-full bg-[#2166df]" />

				<BlueLine className="h-[4px] w-[30%]" />
			</div>

			<div className="mt-[5%]">
				<SkeletonLine className="h-[6px] w-[55%] bg-slate-300" />
			</div>

			<div className="mt-[4%] space-y-[3px]">
				<SkeletonLine className="h-[3px] w-[70%]" />
				<SkeletonLine className="h-[3px] w-[58%]" />
				<SkeletonLine className="h-[3px] w-[76%]" />
				<SkeletonLine className="h-[3px] w-[42%]" />
			</div>

			<div className="mt-[5%] space-y-[3px]">
				<SkeletonLine className="h-[3px] w-[62%]" />
				<SkeletonLine className="h-[3px] w-[52%]" />
			</div>
		</div>
	);
}

/* =========================================================
   CLASSIC PAYMENT ROW
========================================================= */

function ClassicSkeletonRow() {
	return (
		<div className="grid grid-cols-[.85fr_.1fr_1.2fr] gap-1">
			<SkeletonLine className="h-[3px] w-[80%]" />
			<SkeletonLine className="h-[3px] w-full" />
			<SkeletonLine className="h-[3px] w-[85%]" />
		</div>
	);
}

/* =========================================================
   TOTAL ROWS
========================================================= */

function SkeletonTotalRows() {
	return (
		<>
			<div className="grid grid-cols-2 border-b border-[#dce3ed]">
				<div className="px-[7%] py-[6%]">
					<SkeletonLine className="h-[3px] w-[45%]" />
				</div>

				<div className="flex justify-end px-[7%] py-[6%]">
					<SkeletonLine className="h-[3px] w-[30%]" />
				</div>
			</div>

			<div className="grid grid-cols-2 border-b border-[#dce3ed]">
				<div className="px-[7%] py-[6%]">
					<SkeletonLine className="h-[3px] w-[55%]" />
				</div>

				<div className="flex justify-end px-[7%] py-[6%]">
					<SkeletonLine className="h-[3px] w-[32%]" />
				</div>
			</div>

			<div className="grid grid-cols-2 border-b border-[#dce3ed]">
				<div className="px-[7%] py-[6%]">
					<SkeletonLine className="h-[3px] w-[35%]" />
				</div>

				<div className="flex justify-end px-[7%] py-[6%]">
					<SkeletonLine className="h-[3px] w-[25%]" />
				</div>
			</div>
		</>
	);
}
