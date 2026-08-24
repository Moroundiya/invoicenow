"use client";

import Image from "next/image";
import Link from "next/link";
import InvoiceStepper from "@/app/assets/components/invoice/InvoiceStepper";
import InvoiceWorkspace from "@/app/assets/components/invoice/InvoiceWorkspace";
import { useState } from "react";
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

	const handleCreateAnother = () => {
		setInvoice(createFreshInvoice());
		setCurrentStep(1);
	};

	return (
		<div className="min-h-dvh bg-[url('/background-mobile.webp')] lg:bg-[url('/background.webp')] bg-cover bg-center bg-no-repeat text-white">
			<div className="mx-auto w-full max-w-[1440px] px-4 pt-5 pb-10 sm:px-6 sm:py-7 lg:px-8">
				<header className="mb-8 flex items-center">
					<Link href="/">
						<Image
							src="/logo.png"
							alt="InvoiceNow"
							width={150}
							height={45}
							className="h-auto w-48 sm:w-53"
						/>
					</Link>
				</header>

				<div className="mb-6">
					<InvoiceStepper currentStep={currentStep} />
				</div>

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
