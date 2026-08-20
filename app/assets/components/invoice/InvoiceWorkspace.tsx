"use client";

import TemplateSelector from "./TemplateSelector";
import InvoiceTemplateRenderer from "./templates/InvoiceTemplateRenderer";
import InvoiceDetailsForm from "./InvoiceDetailsForm";
import InvoiceCustomizeForm from "./InvoiceCustomizeForm";
import InvoiceDownload from "./InvoiceDownload";

import type {
	InvoiceData,
	InvoiceTemplate,
} from "@/app/assets/types/invoiceType";

import type { InvoiceStep } from "@/app/assets/layouts/invoice/CreateInvoiceLayout";

interface InvoiceWorkspaceProps {
	currentStep: InvoiceStep;
	invoice: InvoiceData;
	onTemplateChange: (template: InvoiceTemplate) => void;
	onInvoiceChange: (updates: Partial<InvoiceData>) => void;
	onNext: () => void;
	onBack: () => void;
	onCreateAnother: () => void;
}

const content: Record<
	InvoiceStep,
	{
		label: string;
		title: string;
		description: string;
	}
> = {
	1: {
		label: "Step 1",
		title: "Choose Template",
		description: "Select a professional invoice template.",
	},
	2: {
		label: "Step 2",
		title: "Invoice Details",
		description: "Add your company, client, and invoice information.",
	},
	3: {
		label: "Step 3",
		title: "Customize",
		description: "Make the invoice match your brand.",
	},
	4: {
		label: "Step 4",
		title: "Preview",
		description: "Review your completed invoice.",
	},
	5: {
		label: "Step 5",
		title: "Download",
		description: "Download your finished invoice.",
	},
};

export default function InvoiceWorkspace({
	currentStep,
	invoice,
	onTemplateChange,
	onInvoiceChange,
	onNext,
	onBack,
	onCreateAnother,
}: InvoiceWorkspaceProps) {
	const current = content[currentStep];

	return (
		<section className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] xl:gap-7">
			{/* =========================================================
			    EDITOR
			========================================================= */}
			<div className="min-w-0 rounded-2xl border border-[#041E50] bg-[#041f5049] p-6">
				{/* Section Header */}
				<div className="mb-8">
					<p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
						{current.label}
					</p>

					<h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
						{current.title}
					</h2>

					<p className="mt-2 text-sm text-slate-500">{current.description}</p>
				</div>

				{/* =====================================================
				    STEP 1 — TEMPLATE
				===================================================== */}
				{currentStep === 1 && (
					<TemplateSelector
						selectedTemplate={invoice.template}
						onTemplateChange={onTemplateChange}
					/>
				)}

				{/* =====================================================
				    STEP 2 — DETAILS
				===================================================== */}
				{currentStep === 2 && (
					<InvoiceDetailsForm
						invoice={invoice}
						onInvoiceChange={onInvoiceChange}
					/>
				)}

				{/* =====================================================
				    STEP 3 — CUSTOMIZE
				===================================================== */}
				{currentStep === 3 && (
					<InvoiceCustomizeForm
						invoice={invoice}
						onInvoiceChange={onInvoiceChange}
					/>
				)}

				{/* =====================================================
				    STEP 4 — PREVIEW
				===================================================== */}
				{/* Step 4 — Preview */}
				{currentStep === 4 && (
					<div className="rounded-xl border border-[#041E50] bg-[#041f5049] p-4 sm:p-6">
						<div className="mb-5">
							<p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
								Final Review
							</p>

							<h3 className="mt-1 text-lg font-bold text-white">
								Review Your Invoice
							</h3>

							<p className="mt-1 text-sm leading-6 text-slate-500">
								Check your invoice carefully before downloading it.
							</p>
						</div>

						{/* Invoice preview */}
						<div className="flex justify-center overflow-x-auto rounded-xl border border-white/[0.06] bg-[#030c1c]/35 p-3 sm:p-5">
							<div
								id="invoice-preview"
								className="w-full max-w-[560px] shrink-0 overflow-hidden bg-white shadow-2xl">
								<InvoiceTemplateRenderer invoice={invoice} />
							</div>
						</div>

						{/* Review note */}
						<div className="mt-5 flex items-start gap-3 rounded-xl border border-white/[0.06] bg-[#030c1c]/35 p-4">
							<div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
								<svg
									width="15"
									height="15"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round">
									<circle
										cx="12"
										cy="12"
										r="10"
									/>
									<path d="M12 16v-4" />
									<path d="M12 8h.01" />
								</svg>
							</div>

							<div>
								<p className="text-xs font-semibold text-slate-300">
									Ready to download?
								</p>

								<p className="mt-1 text-xs leading-5 text-slate-500">
									If everything looks correct, continue to download your invoice
									as a PDF or PNG.
								</p>
							</div>
						</div>
					</div>
				)}
				{/* =====================================================
				    STEP 5 — DOWNLOAD
				===================================================== */}
				{currentStep === 5 && (
					<div className="rounded-xl border border-[#041E50] bg-[#041f5049] p-6 sm:p-8">
						<div className="mx-auto max-w-md text-center">
							{/* Success Icon */}
							<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.07] text-emerald-400">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round">
									<path d="M20 6 9 17l-5-5" />
								</svg>
							</div>

							<h3 className="mt-5 text-lg font-bold text-white">
								Your invoice is ready
							</h3>

							<p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
								Your invoice has been completed. Download it as a PDF or PNG
								file.
							</p>

							{/* Download Buttons */}
							<div className="mt-6 flex justify-center">
								<InvoiceDownload
									invoice={invoice}
									fileName={`invoice-${invoice.invoiceNumber || "draft"}`}
								/>
							</div>

							{/* Divider */}
							<div className="my-6 flex items-center gap-3">
								<div className="h-px flex-1 bg-white/[0.06]" />

								<span className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-600">
									or
								</span>

								<div className="h-px flex-1 bg-white/[0.06]" />
							</div>

							{/* Create Another Invoice */}
							<button
								type="button"
								onClick={onCreateAnother}
								className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-blue-400/15 bg-blue-500/[0.05] px-5 text-sm font-semibold text-blue-400 transition hover:border-blue-400/30 hover:bg-blue-500/[0.10] hover:text-blue-300">
								<svg
									width="17"
									height="17"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round">
									<path d="M12 5v14" />
									<path d="M5 12h14" />
								</svg>
								Create Another Invoice
							</button>

							<p className="mt-3 text-xs text-slate-600">
								Start fresh with a new invoice
							</p>
						</div>
					</div>
				)}

				{/* =====================================================
				    NAVIGATION
				    Hidden on Step 5 because Download has its own actions.
				===================================================== */}
				{/* Navigation */}
				{currentStep !== 5 && (
					<div
						className={[
							"mt-8 flex items-center gap-3 border-t border-white/[0.05] pt-5",
							currentStep === 1 ? "justify-end" : "justify-between",
						].join(" ")}>
						{/* Back — hidden on Step 1 */}
						{currentStep > 1 && (
							<button
								type="button"
								onClick={onBack}
								className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-5 text-sm font-medium text-slate-400 transition hover:border-blue-400/20 hover:bg-blue-500/[0.04] hover:text-white">
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round">
									<path d="m15 18-6-6 6-6" />
								</svg>
								Back
							</button>
						)}

						{/* Continue */}
						<button
							type="button"
							onClick={onNext}
							className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 text-sm font-semibold text-white shadow-[0_0_25px_rgba(0,119,255,0.18)] transition hover:from-blue-500 hover:to-cyan-500">
							Continue
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round">
								<path d="M5 12h14" />
								<path d="m13 6 6 6-6 6" />
							</svg>
						</button>
					</div>
				)}
			</div>

			{/* =========================================================
			    LIVE PREVIEW
			========================================================= */}
			<aside className="hidden min-w-0 lg:block">
				<div className="sticky top-5 rounded-2xl border border-[#041E50] bg-[#041f5049] p-5 xl:p-6">
					{/* Preview Header */}
					<div className="mb-5 flex items-start justify-between gap-4">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
								Live Preview
							</p>

							<h2 className="mt-1 text-lg font-bold text-white">
								{invoice.template.charAt(0).toUpperCase() +
									invoice.template.slice(1)}{" "}
								Template
							</h2>

							<p className="mt-1 text-sm text-slate-500">
								Your invoice updates automatically as you edit it.
							</p>
						</div>
					</div>

					{/* Invoice Preview */}
					<div className="invoice-preview-container flex min-h-[650px] items-start justify-center overflow-auto rounded-xl border border-white/[0.06] bg-[#030c1c]/35 p-5">
						<div
							id="invoice-preview"
							className="invoice-print-area w-full max-w-[560px] overflow-hidden shadow-2xl">
							<InvoiceTemplateRenderer invoice={invoice} />
						</div>
					</div>
				</div>
			</aside>
		</section>
	);
}
