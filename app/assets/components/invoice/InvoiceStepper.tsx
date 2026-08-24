"use client";

import type { InvoiceStep } from "@/app/assets/layouts/invoice/CreateInvoiceLayout";

interface InvoiceStepperProps {
	currentStep: InvoiceStep;
}

const steps: {
	number: InvoiceStep;
	title: string;
	shortTitle: string;
}[] = [
	{
		number: 1,
		title: "Choose Template",
		shortTitle: "Template",
	},
	{
		number: 2,
		title: "Invoice Details",
		shortTitle: "Details",
	},
	{
		number: 3,
		title: "Customize",
		shortTitle: "Customize",
	},
	{
		number: 4,
		title: "Preview",
		shortTitle: "Preview",
	},
	{
		number: 5,
		title: "Download",
		shortTitle: "Download",
	},
];

export default function InvoiceStepper({ currentStep }: InvoiceStepperProps) {
	return (
		<nav
			aria-label="Invoice creation steps"
			className="w-full">
			<div className="rounded-2xl border border-[#041E50] bg-[#041f5049] px-3 py-4 sm:px-5 sm:py-5">
				{/* =====================================================
				    DESKTOP
				===================================================== */}
				<div className="hidden items-center md:flex">
					{steps.map((step, index) => {
						const isActive = currentStep === step.number;
						const isCompleted = currentStep > step.number;

						return (
							<div
								key={step.number}
								className="flex min-w-0 flex-1 items-center">
								<div
									className={`flex min-w-0 items-center gap-3 ${
										isActive
											? "text-white"
											: isCompleted
												? "text-slate-300"
												: "text-slate-500"
									}`}>
									{/* Step Number / Check */}
									<div
										className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border font-bold transition ${
											isActive
												? "border-blue-400/30 bg-blue-500/10 text-blue-400 shadow-[0_0_20px_rgba(0,119,255,0.12)]"
												: isCompleted
													? "border-blue-400/20 bg-blue-500/[0.08] text-blue-400"
													: "border-white/[0.08] bg-white/[0.02] text-slate-500"
										}`}>
										{isCompleted ? (
											<svg
												width="14"
												height="14"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2.5"
												strokeLinecap="round"
												strokeLinejoin="round">
												<path d="m5 12 4 4L19 6" />
											</svg>
										) : (
											String(step.number).padStart(2, "0")
										)}
									</div>

									<div className="min-w-0">
										<p
											className={`truncate font-semibold ${
												isActive
													? "text-white"
													: isCompleted
														? "text-slate-300"
														: "text-slate-500"
											}`}>
											{step.shortTitle}
										</p>
									</div>
								</div>

								{/* Connector */}
								{index < steps.length - 1 && (
									<div className="mx-4 h-px flex-1 bg-white/[0.07]" />
								)}
							</div>
						);
					})}
				</div>

				{/* =====================================================
				    MOBILE
				===================================================== */}
				<div className="md:hidden">
					<div className="mx-auto flex w-full max-w-md items-center justify-center">
						{steps.map((step, index) => {
							const isActive = currentStep === step.number;
							const isCompleted = currentStep > step.number;

							return (
								<div
									key={step.number}
									className={`flex items-center ${
										index < steps.length - 1 ? "flex-1" : "shrink-0"
									}`}>
									{/* Step */}
									<div className="flex shrink-0 items-center justify-center">
										<div
											className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-lg border font-bold transition ${
												isActive
													? "border-blue-400/30 bg-blue-500/10 text-blue-400 shadow-[0_0_18px_rgba(0,119,255,0.12)]"
													: isCompleted
														? "border-blue-400/20 bg-blue-500/[0.08] text-blue-400"
														: "border-white/[0.08] bg-white/[0.02] text-slate-500"
											}`}>
											{isCompleted ? (
												<svg
													width="12"
													height="12"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2.5"
													strokeLinecap="round"
													strokeLinejoin="round">
													<path d="m5 12 4 4L19 6" />
												</svg>
											) : (
												String(step.number).padStart(2, "0")
											)}
										</div>
									</div>

									{/* Connector */}
									{index < steps.length - 1 && (
										<div className="flex flex-1 items-center">
											<div
												className={`h-px w-full ${
													isCompleted ? "bg-blue-400/30" : "bg-white/[0.09]"
												}`}
											/>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</nav>
	);
}
