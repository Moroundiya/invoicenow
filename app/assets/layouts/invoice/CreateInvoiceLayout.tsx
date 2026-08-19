"use client";

import { useState } from "react";

import InvoiceStepper from "@/app/assets/components/invoice/InvoiceStepper";
import InvoiceWorkspace from "@/app/assets/components/invoice/InvoiceWorkspace";

import type {
	InvoiceData,
	InvoiceTemplate,
} from "@/app/assets/types/invoiceType";

import { defaultInvoice } from "@/app/assets/data/defaultInvoice";

export type InvoiceStep = 1 | 2 | 3 | 4 | 5;

const createFreshInvoice = (): InvoiceData => {
	return structuredClone(defaultInvoice);
};


export default function CreateInvoiceLayout() {
	const [currentStep, setCurrentStep] = useState<InvoiceStep>(1);

	const [invoice, setInvoice] = useState<InvoiceData>(() =>
		createFreshInvoice(),
	);

	const handleTemplateChange = (template: InvoiceTemplate) => {
		setInvoice((current) => ({
			...current,
			template,
		}));
	};

	const handleInvoiceChange = (updates: Partial<InvoiceData>) => {
		setInvoice((current) => ({
			...current,
			...updates,
		}));
	};

	const handleNext = () => {
		setCurrentStep((current) => {
			if (current === 5) return current;

			return (current + 1) as InvoiceStep;
		});
	};

	const handleBack = () => {
		setCurrentStep((current) => {
			if (current === 1) return current;

			return (current - 1) as InvoiceStep;
		});
	};

	/*
	 * Start a completely fresh invoice.
	 */
	const handleCreateAnother = () => {
		setInvoice(createFreshInvoice());
		setCurrentStep(1);
	};

	return (
		<div className="min-h-screen bg-[#020817] text-white">
			<div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
				{/* Header */}
				<header className="mb-6 flex items-center justify-between gap-4">
					<div>
						<p className="text-xl font-bold tracking-tight text-white">
							Invoice<span className="text-blue-500">Now</span>
						</p>

						<p className="mt-1 text-xs text-slate-500">
							Create your professional invoice
						</p>
					</div>

					<button
						type="button"
						className="inline-flex h-10 items-center rounded-xl border border-white/10 bg-white/[0.02] px-4 text-xs font-medium text-slate-400 transition hover:border-blue-400/20 hover:bg-blue-500/[0.04] hover:text-white">
						Exit
					</button>
				</header>

				{/* Stepper */}
				<div className="mb-6">
					<InvoiceStepper currentStep={currentStep} />
				</div>

				{/* Workspace */}
				<InvoiceWorkspace
					currentStep={currentStep}
					invoice={invoice}
					onTemplateChange={handleTemplateChange}
					onInvoiceChange={handleInvoiceChange}
					onNext={handleNext}
					onBack={handleBack}
					onCreateAnother={handleCreateAnother}
				/>
			</div>
		</div>
	);
}
