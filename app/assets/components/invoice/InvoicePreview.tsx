"use client";

import InvoiceTemplateRenderer from "@/app/assets/components/invoice/templates/InvoiceTemplateRenderer";

import type { InvoiceData } from "@/app/assets/types/invoiceType";
import { InvoicePreviewProps } from "../../types/invoice";

export default function InvoicePreview({ invoice }: InvoicePreviewProps) {
	return (
		<div className="space-y-6">
			{/* Preview introduction */}
			<div className="rounded-xl border border-blue-400/10 bg-[#030c1c]/60 p-4 sm:p-5">
				<div className="flex items-start gap-3">
					<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-400/15 bg-blue-500/[0.07] text-blue-400">
						<svg
							width="17"
							height="17"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.8">
							<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
							<circle
								cx="12"
								cy="12"
								r="3"
							/>
						</svg>
					</div>

					<div>
						<h3 className="text-sm font-semibold text-white">
							Review your invoice
						</h3>

						<p className="mt-1 text-xs leading-5 text-slate-500">
							Everything looks good? Review the invoice below before downloading
							your final copy.
						</p>
					</div>
				</div>
			</div>

			{/* Invoice preview */}
			<div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#020817]">
				{/* Preview toolbar */}
				<div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3 sm:px-5">
					<div className="flex items-center gap-2">
						<span className="h-2 w-2 rounded-full bg-emerald-400" />

						<span className="text-xs font-medium text-slate-400">
							Final Preview
						</span>
					</div>

					<span className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-500">
						{invoice.template}
					</span>
				</div>

				{/* Paper area */}
				<div className="overflow-auto bg-[#010611] p-3 sm:p-5 lg:p-8">
					<div className="mx-auto w-full max-w-[760px] overflow-hidden rounded-sm bg-white shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
						<InvoiceTemplateRenderer invoice={invoice} />
					</div>
				</div>
			</div>

			{/* Review summary */}
			<div className="grid gap-3 sm:grid-cols-3">
				<PreviewSummary
					label="Invoice"
					value={invoice.invoiceNumber || "Not set"}
				/>

				<PreviewSummary
					label="Bill To"
					value={invoice.billTo.name || "Client not set"}
				/>

				<PreviewSummary
					label="Items"
					value={`${invoice.items.length} ${
						invoice.items.length === 1 ? "item" : "items"
					}`}
				/>
			</div>
		</div>
	);
}

interface PreviewSummaryProps {
	label: string;
	value: string;
}

function PreviewSummary({ label, value }: PreviewSummaryProps) {
	return (
		<div className="rounded-xl border border-white/[0.06] bg-[#030c1c]/60 px-4 py-3">
			<p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">
				{label}
			</p>

			<p className="mt-1 truncate text-xs font-medium text-slate-300">
				{value}
			</p>
		</div>
	);
}
