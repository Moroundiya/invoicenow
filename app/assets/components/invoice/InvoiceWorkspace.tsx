"use client";

import success from '@/app/assets/images/success.png'

import TemplateSelector from "./TemplateSelector";
import InvoiceTemplateRenderer from "./templates/InvoiceTemplateRenderer";
import InvoiceDetailsForm from "./InvoiceDetailsForm";
import InvoiceCustomizeForm from "./InvoiceCustomizeForm";
import InvoiceDownload from "./InvoiceDownload";


import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import type {
	InvoiceData,
	InvoiceTemplate,
} from "@/app/assets/types/invoiceType";

import type { InvoiceStep } from "@/app/assets/layouts/invoice/CreateInvoiceLayout";
import Image from "next/image";

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

	const successRef = useRef<HTMLImageElement>(null);

	const successContainerRef = useRef<HTMLDivElement>(null);
	const successContentRef = useRef<HTMLDivElement>(null);
	const successTitleRef = useRef<HTMLHeadingElement>(null);
	const successDescriptionRef = useRef<HTMLParagraphElement>(null);
	const downloadRef = useRef<HTMLDivElement>(null);
	const dividerRef = useRef<HTMLDivElement>(null);
	const createAnotherRef = useRef<HTMLButtonElement>(null);
	const bottomTextRef = useRef<HTMLParagraphElement>(null);

useGSAP(
	() => {
		if (currentStep !== 5) return;

		const emoji = successRef.current;
		const container = successContainerRef.current;
		const content = successContentRef.current;
		const title = successTitleRef.current;
		const description = successDescriptionRef.current;
		const download = downloadRef.current;
		const divider = dividerRef.current;
		const createAnother = createAnotherRef.current;
		const bottomText = bottomTextRef.current;

		if (
			!emoji ||
			!container ||
			!content ||
			!title ||
			!description ||
			!download ||
			!divider ||
			!createAnother ||
			!bottomText
		) {
			return;
		}

		/*
		=========================================================
		INITIAL STATES
		=========================================================
		*/

		gsap.set(container, {
			opacity: 0,
			y: 25,
		});

		gsap.set(emoji, {
			opacity: 0,
			scale: 0.45,
			y: 30,
			rotation: -10,
			transformOrigin: "50% 50%",
		});

		gsap.set(
			[title, description, download, divider, createAnother, bottomText],
			{
				opacity: 0,
				y: 18,
			},
		);

		/*
		=========================================================
		MAIN ENTRANCE TIMELINE
		=========================================================
		*/

		const tl = gsap.timeline({
			defaults: {
				ease: "power3.out",
			},
		});

		// Main card
		tl.to(container, {
			opacity: 1,
			y: 0,
			duration: 0.55,
		});

		// Success emoji
		tl.to(
			emoji,
			{
				opacity: 1,
				scale: 1,
				y: 0,
				rotation: 0,
				duration: 0.8,
				ease: "back.out(1.8)",
			},
			"-=0.25",
		);

		// Title
		tl.to(
			title,
			{
				opacity: 1,
				y: 0,
				duration: 0.45,
			},
			"-=0.35",
		);

		// Description
		tl.to(
			description,
			{
				opacity: 1,
				y: 0,
				duration: 0.4,
			},
			"-=0.25",
		);

		// Download button
		tl.to(
			download,
			{
				opacity: 1,
				y: 0,
				duration: 0.5,
				ease: "back.out(1.4)",
			},
			"-=0.15",
		);

		// Divider
		tl.to(
			divider,
			{
				opacity: 1,
				y: 0,
				duration: 0.4,
			},
			"-=0.15",
		);

		// Create Another Invoice
		tl.to(
			createAnother,
			{
				opacity: 1,
				y: 0,
				duration: 0.45,
				ease: "back.out(1.3)",
			},
			"-=0.15",
		);

		// Bottom text
		tl.to(
			bottomText,
			{
				opacity: 1,
				y: 0,
				duration: 0.35,
			},
			"-=0.2",
		);

		/*
		=========================================================
		EMOJI FLOATING ANIMATION
		=========================================================
		*/

		gsap.to(emoji, {
			y: -7,
			rotation: 2,
			duration: 1.8,
			ease: "sine.inOut",
			yoyo: true,
			repeat: -1,
			delay: 1.2,
		});

		/*
		=========================================================
		EMOJI BREATHING / SUBTLE PULSE
		=========================================================
		*/

		gsap.to(emoji, {
			scale: 1.035,
			duration: 1.5,
			ease: "sine.inOut",
			yoyo: true,
			repeat: -1,
			delay: 1.2,
		});
	},
	{
		dependencies: [currentStep],
		revertOnUpdate: true,
	},
);



	return (
		<section className="grid min-w-0 w-full gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] xl:gap-7">
			{/* =========================================================
			    EDITOR
			========================================================= */}
			<div className="min-w-0 w-full sm:rounded-2xl sm:border sm:border-[#041E50] sm:bg-[#041f5049] sm:p-6">
				{/* Section Header */}
				<div className="mb-8">
					{/* <p className="font-semibold uppercase tracking-[0.18em] text-blue-400">
						{current.label}
					</p> */}

					<h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
						{current.title}
					</h2>

					<p className="text-slate-500">{current.description}</p>
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
				{currentStep === 4 && (
					<>
						<div className="min-w-0 w-full max-w-full p-3 overflow-x-auto overflow-y-hidden rounded-xl border border-[#041E50] bg-[#041f5049] p-2 sm:p-6">
							<div className="flex w-max min-w-full items-start justify-center">
								<div
									id="invoice-preview"
									className="w-[560px] min-w-[560px] shrink-0 bg-white shadow-2xl">
									<InvoiceTemplateRenderer invoice={invoice} />
								</div>
							</div>
						</div>

						{/* Review note */}
						<div className="mt-5 flex min-w-0 items-start gap-3 rounded-xl border border-white/[0.06] bg-[#030c1c]/35 p-4">
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

							<div className="min-w-0">
								<p className="font-semibold text-slate-300">
									Ready to download?
								</p>

								<p className="mt-1 text-sm leading-5 text-slate-500">
									If everything looks correct, continue to download your invoice
									as a PDF or PNG.
								</p>
							</div>
						</div>
					</>
				)}

				{/* =====================================================
				    STEP 5 — DOWNLOAD
				===================================================== */}
				{currentStep === 5 && (
					<div
						ref={successContainerRef}
						className="rounded-xl border border-[#041E50] bg-[#041f5049] p-6 sm:p-8">
						<div
							ref={successContentRef}
							className="mx-auto max-w-md text-center">
							{/* =====================================================
			    SUCCESS EMOJI
			===================================================== */}

							<Image
								ref={successRef}
								src={success}
								alt="Success Image"
								priority
								className="mx-auto mt-1 w-10/12 object-contain will-change-transform"
							/>

							{/* =====================================================
			    TITLE
			===================================================== */}

							<h3
								ref={successTitleRef}
								className="mt-5 text-lg font-bold text-white">
								Your invoice is ready
							</h3>

							{/* =====================================================
			    DESCRIPTION
			===================================================== */}

							<p
								ref={successDescriptionRef}
								className="mx-auto mt-2 max-w-sm leading-6 text-slate-500">
								Your invoice has been completed. Download it as a PDF or PNG
								file.
							</p>

							{/* =====================================================
			    DOWNLOAD BUTTON
			===================================================== */}

							<div
								ref={downloadRef}
								className="mt-6 flex justify-center">
								<InvoiceDownload
									invoice={invoice}
									fileName={`invoice-${invoice.invoiceNumber || "draft"}`}
								/>
							</div>

							{/* =====================================================
			    DIVIDER
			===================================================== */}

							<div
								ref={dividerRef}
								className="my-6 flex items-center gap-3">
								<div className="h-px flex-1 bg-white/[0.06]" />

								<span className="text-sm font-medium uppercase tracking-[0.15em] text-slate-600">
									or
								</span>

								<div className="h-px flex-1 bg-white/[0.06]" />
							</div>

							{/* =====================================================
			    CREATE ANOTHER INVOICE
			===================================================== */}

							<button
								ref={createAnotherRef}
								type="button"
								onClick={onCreateAnother}
								className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-blue-400/15 bg-blue-500/[0.05] px-5 font-semibold text-blue-400 transition hover:border-blue-400/30 hover:bg-blue-500/[0.10] hover:text-blue-300">
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

							{/* =====================================================
			    BOTTOM TEXT
			===================================================== */}

							<p
								ref={bottomTextRef}
								className="mt-3 text-slate-600">
								Start fresh with a new invoice
							</p>
						</div>
					</div>
				)}

				{/* =====================================================
				    NAVIGATION
				===================================================== */}
				{currentStep !== 5 && (
					<div
						className={[
							"mt-8 flex items-center gap-3 border-t border-white/[0.05] pt-5",
							currentStep === 1 ? "justify-end" : "justify-between",
						].join(" ")}>
						{/* Back */}
						{currentStep > 1 && (
							<button
								type="button"
								onClick={onBack}
								className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-5 font-medium text-slate-400 transition hover:border-blue-400/20 hover:bg-blue-500/[0.04] hover:text-white">
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
							className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 font-semibold text-white shadow-[0_0_25px_rgba(0,119,255,0.18)] transition hover:from-blue-500 hover:to-cyan-500">
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
				<div className="sticky top-5 min-w-0 rounded-2xl border border-[#041E50] bg-[#041f5049] p-5 xl:p-6">
					{/* Preview Header */}
					<div className="mb-5 flex items-start justify-between gap-4">
						<div className="min-w-0">
							<p className="font-semibold uppercase tracking-[0.18em] text-blue-400">
								Live Preview
							</p>

							<h2 className="mt-1 text-lg font-bold text-white">
								{invoice.template.charAt(0).toUpperCase() +
									invoice.template.slice(1)}{" "}
								Template
							</h2>

							<p className="mt-1 text-slate-500">
								Your invoice updates automatically as you edit it.
							</p>
						</div>
					</div>

					{/* Invoice Preview */}
					<div className="invoice-preview-container flex min-w-0 max-w-full items-start justify-center overflow-auto rounded-xl border border-white/[0.06] bg-[#030c1c]/35 p-5">
						<div
							id="invoice-preview"
							className="invoice-print-area w-full max-w-[560px] shrink-0 overflow-hidden shadow-2xl">
							<InvoiceTemplateRenderer invoice={invoice} />
						</div>
					</div>
				</div>
			</aside>
		</section>
	);
}
