"use client";

import type { ChangeEvent } from "react";
import type { InvoiceData } from "@/app/assets/types/invoiceType";

interface InvoiceCustomizeFormProps {
	invoice: InvoiceData;
	onInvoiceChange: (updates: Partial<InvoiceData>) => void;
}

export default function InvoiceCustomizeForm({
	invoice,
	onInvoiceChange,
}: InvoiceCustomizeFormProps) {
	/* --------------------------------
	 * BRANDING
	 * -------------------------------- */
	const updateBranding = (
		field: keyof InvoiceData["branding"],
		value: string,
	) => {
		onInvoiceChange({
			branding: {
				...invoice.branding,
				[field]: value,
			},
		});
	};

	/* --------------------------------
	 * PAYMENT
	 * -------------------------------- */
	const updatePayment = (
		field: keyof InvoiceData["payment"],
		value: string,
	) => {
		onInvoiceChange({
			payment: {
				...invoice.payment,
				[field]: value,
			},
		});
	};

	/* --------------------------------
	 * SIGNATURE
	 * -------------------------------- */
	const updateSignature = (
		field: keyof InvoiceData["signature"],
		value: string,
	) => {
		onInvoiceChange({
			signature: {
				...invoice.signature,
				[field]: value,
			},
		});
	};

	/* --------------------------------
	 * LOGO UPLOAD
	 * -------------------------------- */
	const handleLogoUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (!file) return;

		if (!file.type.startsWith("image/")) {
			event.target.value = "";
			return;
		}

		const reader = new FileReader();

		reader.onload = () => {
			const result = reader.result;

			if (typeof result === "string") {
				updateBranding("logo", result);
			}
		};

		reader.readAsDataURL(file);

		// Allow selecting the same file again later
		event.target.value = "";
	};

	/* --------------------------------
	 * SIGNATURE UPLOAD
	 * -------------------------------- */
	const handleSignatureUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (!file) return;

		if (!file.type.startsWith("image/")) {
			event.target.value = "";
			return;
		}

		const reader = new FileReader();

		reader.onload = () => {
			const result = reader.result;

			if (typeof result === "string") {
				updateSignature("image", result);
			}
		};

		reader.readAsDataURL(file);

		// Allow selecting the same file again later
		event.target.value = "";
	};

	return (
		<div className="space-y-8">
			{/* ============================================
			    BRANDING
			============================================ */}
			<section>
				<div className="mb-5">
					<h3 className="text-base font-semibold text-white">Branding</h3>

					<p className="mt-1 text-sm text-slate-500">
						Customize your invoice with your logo and brand color.
					</p>
				</div>

				<div className="space-y-5">
					{/* Logo */}
					<div>
						<label className="mb-2 block text-xs font-medium text-slate-400">
							Business Logo
						</label>

						<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
							{/* Logo Preview */}
							<div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#041E50] bg-[#041f5049]">
								{invoice.branding?.logo ? (
									<img
										src={invoice.branding.logo}
										alt="Business logo"
										className="h-full w-full object-contain p-3"
									/>
								) : (
									<div
										className="flex h-11 w-11 items-center justify-center rounded-lg text-lg font-bold text-white"
										style={{
											backgroundColor:
												invoice.branding?.primaryColor || "#2563EB",
										}}>
										{invoice.from?.name
											? invoice.from.name.charAt(0).toUpperCase()
											: "I"}
									</div>
								)}
							</div>

							<div>
								<label className="inline-flex h-10 cursor-pointer items-center rounded-xl border border-white/[0.06] bg-[#030c1c]/35 px-4 text-sm font-medium text-slate-300 transition hover:border-blue-400/20 hover:bg-blue-500/[0.04] hover:text-white">
									Upload Logo
									<input
										type="file"
										accept="image/png,image/jpeg,image/webp,image/svg+xml"
										onChange={handleLogoUpload}
										className="hidden"
									/>
								</label>

								{invoice.branding?.logo && (
									<button
										type="button"
										onClick={() => updateBranding("logo", "")}
										className="ml-2 text-xs text-slate-500 transition hover:text-red-400">
										Remove
									</button>
								)}

								<p className="mt-2 text-xs text-slate-600">
									PNG, JPG, WEBP or SVG. Recommended: square logo.
								</p>
							</div>
						</div>
					</div>

					{/* Brand Color */}
					<div>
						<label className="mb-2 block text-xs font-medium text-slate-400">
							Brand Color
						</label>

						<div className="flex flex-wrap items-center gap-3">
							<input
								type="color"
								value={invoice.branding?.primaryColor || "#2563EB"}
								onChange={(event) =>
									updateBranding("primaryColor", event.target.value)
								}
								className="h-11 w-14 cursor-pointer rounded-lg border border-white/[0.06] bg-[#030c1c]/35 p-1"
							/>

							<input
								type="text"
								value={invoice.branding?.primaryColor ?? ""}
								onChange={(event) =>
									updateBranding("primaryColor", event.target.value)
								}
								placeholder="#2563EB"
								className="h-11 w-36 rounded-xl border border-[#041E50] bg-[#041f5049] px-3.5 text-sm text-white outline-none placeholder:text-slate-700 focus:border-blue-500/50"
							/>

							<div
								className="h-9 w-9 rounded-lg border border-[#041E50]"
								style={{
									backgroundColor: invoice.branding?.primaryColor || "#2563EB",
								}}
							/>
						</div>
					</div>
				</div>
			</section>

			{/* ============================================
			    PAYMENT INFORMATION
			============================================ */}
			<section className="border-t border-white/[0.06] pt-8">
				<div className="mb-5">
					<h3 className="text-base font-semibold text-white">
						Payment Information
					</h3>

					<p className="mt-1 text-sm text-slate-500">
						Add the payment details your client should use.
					</p>
				</div>

				<div className="grid gap-4 sm:grid-cols-2">
					<FormField
						label="Payment Method"
						value={invoice.payment?.method ?? ""}
						onChange={(value) => updatePayment("method", value)}
						placeholder="Bank Transfer"
					/>

					<FormField
						label="Account Name"
						value={invoice.payment?.accountName ?? ""}
						onChange={(value) => updatePayment("accountName", value)}
						placeholder="Your Business"
					/>

					<FormField
						label="Bank Name"
						value={invoice.payment?.bankName ?? ""}
						onChange={(value) => updatePayment("bankName", value)}
						placeholder="Your Bank"
					/>

					<FormField
						label="Account Number"
						value={invoice.payment?.accountNumber ?? ""}
						onChange={(value) => updatePayment("accountNumber", value)}
						placeholder="0123456789"
					/>

					<FormField
						label="SWIFT Code"
						value={invoice.payment?.sortCode ?? ""}
						onChange={(value) => updatePayment("sortCode", value)}
						placeholder="ABCDNGXX"
					/>
				</div>
			</section>

			{/* ============================================
			    NOTES
			============================================ */}
			<section className="border-t border-white/[0.06] pt-8">
				<div className="mb-5">
					<h3 className="text-base font-semibold text-white">Notes</h3>

					<p className="mt-1 text-sm text-slate-500">
						Add a message or payment terms to your invoice.
					</p>
				</div>

				<div className="space-y-4">
					<TextareaField
						label=""
						value={invoice.notes ?? ""}
						onChange={(value) => onInvoiceChange({ notes: value })}
						placeholder="Thank you for your business."
					/>
				</div>
			</section>

			{/* ============================================
			    SIGNATURE
			============================================ */}
			<section className="border-t border-white/[0.06] pt-8">
				<div className="mb-5">
					<h3 className="text-base font-semibold text-white">Signature</h3>

					<p className="mt-1 text-sm text-slate-500">
						Add a signature to make your invoice feel more personal and
						professional.
					</p>
				</div>

				<div className="space-y-5">
					{/* Signature Image */}
					<div>
						<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
							<div className="flex h-20 w-48 items-center justify-center overflow-hidden rounded-xl border border-[#041E50] bg-[#041f5049]">
								{invoice.signature?.image ? (
									<img
										src={invoice.signature.image}
										alt="Signature"
										className="max-h-16 max-w-[180px] object-contain"
									/>
								) : (
									<span className="text-xs text-slate-700">No signature</span>
								)}
							</div>

							<div>
								<label className="inline-flex h-10 cursor-pointer items-center rounded-xl border border-white/[0.06] bg-[#030c1c]/35 px-4 text-sm font-medium text-slate-300 transition hover:border-blue-400/20 hover:bg-blue-500/[0.04] hover:text-white">
									Upload Signature
									<input
										type="file"
										accept="image/png,image/jpeg,image/webp"
										onChange={handleSignatureUpload}
										className="hidden"
									/>
								</label>

								{invoice.signature?.image && (
									<button
										type="button"
										onClick={() => updateSignature("image", "")}
										className="ml-2 text-xs text-slate-500 transition hover:text-red-400">
										Remove
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

/* ============================================
   FORM FIELD
============================================ */

interface FormFieldProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	type?: string;
}

function FormField({
	label,
	value,
	onChange,
	placeholder,
	type = "text",
}: FormFieldProps) {
	return (
		<div>
			<label className="mb-2 block text-xs font-medium text-slate-400">
				{label}
			</label>

			<input
				type={type}
				value={value ?? ""}
				onChange={(event) => onChange(event.target.value)}
				placeholder={placeholder}
				className="h-11 w-full rounded-xl border border-[#041E50] bg-[#041f5049] px-3.5 text-sm text-white outline-none placeholder:text-slate-700 transition focus:border-blue-500/50 focus:bg-[#041f5049]"
			/>
		</div>
	);
}

/* ============================================
   TEXTAREA FIELD
============================================ */

interface TextareaFieldProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

function TextareaField({
	label,
	value,
	onChange,
	placeholder,
}: TextareaFieldProps) {
	return (
		<div>
			<label className="mb-2 block text-xs font-medium text-slate-400">
				{label}
			</label>

			<textarea
				value={value ?? ""}
				onChange={(event) => onChange(event.target.value)}
				placeholder={placeholder}
				rows={4}
				className="w-full resize-none rounded-xl border border-[#041E50] bg-[#041f5049] px-3.5 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-700 transition focus:border-blue-500/50 focus:bg-[#041f5049]"
			/>
		</div>
	);
}
