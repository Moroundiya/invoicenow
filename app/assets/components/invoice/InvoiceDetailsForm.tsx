"use client";

import type { InvoiceData, InvoiceItem } from "@/app/assets/types/invoiceType";
import { InvoiceDetailsFormProps } from "../../types/invoice";
import { useState } from "react";

export default function InvoiceDetailsForm({
	invoice,
	onInvoiceChange,
}: InvoiceDetailsFormProps) {
	const [quantityInputs, setQuantityInputs] = useState<Record<string, string>>(
		{},
	);

	const updateFrom = (field: keyof InvoiceData["from"], value: string) => {
		onInvoiceChange({
			from: {
				...invoice.from,
				[field]: value,
			},
		});
	};

	const updateBillTo = (field: keyof InvoiceData["billTo"], value: string) => {
		onInvoiceChange({
			billTo: {
				...invoice.billTo,
				[field]: value,
			},
		});
	};

	const updateItem = (
		id: string,
		field: keyof InvoiceItem,
		value: string | number,
	) => {
		onInvoiceChange({
			items: invoice.items.map((item) =>
				item.id === id
					? {
							...item,
							[field]: value,
						}
					: item,
			),
		});
	};

	const handleQuantityChange = (id: string, value: string) => {
		setQuantityInputs((previous) => ({
			...previous,
			[id]: value,
		}));

		if (value !== "") {
			updateItem(id, "quantity", Number(value));
		}
	};

	const addItem = () => {
		const newItem: InvoiceItem = {
			id: crypto.randomUUID(),
			description: "",
			details: "",
			quantity: 1,
			rate: 0,
		};

		onInvoiceChange({
			items: [...invoice.items, newItem],
		});
	};

	const removeItem = (id: string) => {
		setQuantityInputs((previous) => {
			const next = { ...previous };
			delete next[id];
			return next;
		});

		if (invoice.items.length === 1) {
			onInvoiceChange({
				items: [],
			});

			return;
		}

		onInvoiceChange({
			items: invoice.items.filter((item) => item.id !== id),
		});
	};

	const subtotal = invoice.items.reduce(
		(total, item) => total + item.quantity * item.rate,
		0,
	);

	const discountAmount = subtotal * ((Number(invoice.discount) || 0) / 100);

	const taxBase = subtotal - discountAmount;

	const taxAmount = taxBase * ((Number(invoice.tax) || 0) / 100);

	const total = taxBase + taxAmount;

	const formatMoney = (amount: number) => {
		try {
			return new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: invoice.currency || "USD",
			}).format(amount);
		} catch {
			return `$${amount.toFixed(2)}`;
		}
	};

	return (
		<div className="space-y-6">
			<FormSection
				number="01"
				title="Invoice information"
				description="Set the basic information for this invoice.">
				<div className="grid min-w-0 gap-4 sm:grid-cols-2">
					<FormField label="Invoice number">
						<input
							type="text"
							value={invoice.invoiceNumber}
							onChange={(event) =>
								onInvoiceChange({
									invoiceNumber: event.target.value,
								})
							}
							placeholder="INV-001"
							className={inputClass}
						/>
					</FormField>

					<FormField label="Currency">
						<select
							value={invoice.currency}
							onChange={(event) =>
								onInvoiceChange({
									currency: event.target.value,
								})
							}
							className={inputClass}>
							<option value="USD">USD — US Dollar</option>
							<option value="NGN">NGN — Nigerian Naira</option>
							<option value="GBP">GBP — British Pound</option>
							<option value="EUR">EUR — Euro</option>
							<option value="CAD">CAD — Canadian Dollar</option>
							<option value="AUD">AUD — Australian Dollar</option>
							<option value="GHS">GHS — Ghanaian Cedi</option>
							<option value="KES">KES — Kenyan Shilling</option>
							<option value="ZAR">ZAR — South African Rand</option>
						</select>
					</FormField>

					<FormField label="Issue date">
						<input
							type="date"
							value={invoice.issueDate}
							onChange={(event) =>
								onInvoiceChange({
									issueDate: event.target.value,
								})
							}
							className={inputClass}
						/>
					</FormField>

					<FormField label="Due date">
						<input
							type="date"
							value={invoice.dueDate}
							onChange={(event) =>
								onInvoiceChange({
									dueDate: event.target.value,
								})
							}
							className={inputClass}
						/>
					</FormField>
				</div>
			</FormSection>

			<FormSection
				number="02"
				title="Your business"
				description="Add the details that will appear on your invoice.">
				<div className="grid gap-4 sm:grid-cols-2">
					<FormField
						label="Business name"
						required>
						<input
							type="text"
							value={invoice.from.name}
							onChange={(event) => updateFrom("name", event.target.value)}
							placeholder="Your business name"
							className={inputClass}
						/>
					</FormField>

					<FormField label="Email">
						<input
							type="email"
							value={invoice.from.email}
							onChange={(event) => updateFrom("email", event.target.value)}
							placeholder="hello@business.com"
							className={inputClass}
						/>
					</FormField>

					<FormField label="Phone">
						<input
							type="tel"
							value={invoice.from.phone}
							onChange={(event) => updateFrom("phone", event.target.value)}
							placeholder="+234 800 000 0000"
							className={inputClass}
						/>
					</FormField>

					<FormField label="Address">
						<input
							type="text"
							value={invoice.from.address}
							onChange={(event) => updateFrom("address", event.target.value)}
							placeholder="123 Business Street"
							className={inputClass}
						/>
					</FormField>

					<FormField label="City">
						<input
							type="text"
							value={invoice.from.city}
							onChange={(event) => updateFrom("city", event.target.value)}
							placeholder="Lagos"
							className={inputClass}
						/>
					</FormField>

					<FormField label="Country">
						<input
							type="text"
							value={invoice.from.country}
							onChange={(event) => updateFrom("country", event.target.value)}
							placeholder="Nigeria"
							className={inputClass}
						/>
					</FormField>
				</div>
			</FormSection>

			<FormSection
				number="03"
				title="Bill to"
				description="Enter the details of the client receiving this invoice.">
				<div className="grid gap-4 sm:grid-cols-2">
					<FormField
						label="Client name"
						required>
						<input
							type="text"
							value={invoice.billTo.name}
							onChange={(event) => updateBillTo("name", event.target.value)}
							placeholder="Client or company name"
							className={inputClass}
						/>
					</FormField>

					<FormField label="Email">
						<input
							type="email"
							value={invoice.billTo.email}
							onChange={(event) => updateBillTo("email", event.target.value)}
							placeholder="client@example.com"
							className={inputClass}
						/>
					</FormField>

					<FormField label="Phone">
						<input
							type="tel"
							value={invoice.billTo.phone}
							onChange={(event) => updateBillTo("phone", event.target.value)}
							placeholder="+234 800 000 0000"
							className={inputClass}
						/>
					</FormField>

					<FormField label="Address">
						<input
							type="text"
							value={invoice.billTo.address}
							onChange={(event) => updateBillTo("address", event.target.value)}
							placeholder="Client address"
							className={inputClass}
						/>
					</FormField>

					<FormField label="City">
						<input
							type="text"
							value={invoice.billTo.city}
							onChange={(event) => updateBillTo("city", event.target.value)}
							placeholder="Lagos"
							className={inputClass}
						/>
					</FormField>

					<FormField label="Country">
						<input
							type="text"
							value={invoice.billTo.country}
							onChange={(event) => updateBillTo("country", event.target.value)}
							placeholder="Nigeria"
							className={inputClass}
						/>
					</FormField>
				</div>
			</FormSection>

			<FormSection
				number="04"
				title="Invoice items"
				description="Add the products or services you're charging for.">
				<div className="space-y-3">
					{invoice.items.map((item, index) => (
						<div
							key={item.id}
							className="rounded-xl border border-white/[0.06] bg-[#030c1c]/50 p-4">
							<div className="mb-4 flex items-center justify-between">
								<div className="flex items-center gap-2">
									<span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/[0.08] text-sm font-bold text-blue-400">
										{index + 1}
									</span>

									<span className="font-semibold text-slate-300">
										Item {index + 1}
									</span>
								</div>

								<button
									type="button"
									onClick={() => removeItem(item.id)}
									className="rounded-lg p-1.5 text-slate-600 transition hover:bg-red-500/[0.06] hover:text-red-400"
									aria-label={`Remove item ${index + 1}`}>
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.8">
										<path d="M3 6h18" />
										<path d="M8 6V4h8v2" />
										<path d="m19 6-1 14H6L5 6" />
										<path d="M10 11v5" />
										<path d="M14 11v5" />
									</svg>
								</button>
							</div>

							<div className="grid gap-4 sm:grid-cols-[1fr_110px_140px]">
								<FormField label="Description">
									<input
										type="text"
										value={item.description}
										onChange={(event) =>
											updateItem(item.id, "description", event.target.value)
										}
										placeholder="Website design"
										className={inputClass}
									/>
								</FormField>

								<FormField label="Quantity">
									<input
										type="number"
										min="1"
										step="1"
										value={
											quantityInputs[item.id] !== undefined
												? quantityInputs[item.id]
												: String(item.quantity)
										}
										onChange={(event) =>
											handleQuantityChange(item.id, event.target.value)
										}
										className={inputClass}
									/>
								</FormField>

								<FormField label="Rate">
									<input
										type="number"
										min="0"
										value={item.rate === 0 ? "" : item.rate}
										placeholder="0"
										onChange={(event) => {
											const value = event.target.value;

											if (value === "") {
												updateItem(item.id, "rate", 0);
												return;
											}

											updateItem(item.id, "rate", Math.max(0, Number(value)));
										}}
										className={inputClass}
									/>
								</FormField>
							</div>

							<div className="mt-4">
								<FormField label="Additional details">
									<input
										type="text"
										value={item.details}
										onChange={(event) =>
											updateItem(item.id, "details", event.target.value)
										}
										placeholder="Optional description or specification"
										className={inputClass}
									/>
								</FormField>
							</div>

							<div className="mt-4 flex items-center justify-between border-t border-white/[0.05] pt-3">
								<span className="text-slate-600">Item amount</span>

								<span className="font-semibold text-slate-200">
									{formatMoney(item.quantity * item.rate)}
								</span>
							</div>
						</div>
					))}

					<button
						type="button"
						onClick={addItem}
						className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#041E50] bg-[#041f5049] font-semibold text-blue-400 transition hover:border-blue-400/30 hover:bg-blue-500/[0.06]">
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2">
							<path d="M12 5v14" />
							<path d="M5 12h14" />
						</svg>
						Add another item
					</button>
				</div>
			</FormSection>

			<FormSection
				number="05"
				title="Discount & tax"
				description="Apply discounts or taxes to your invoice.">
				<div className="grid gap-4 sm:grid-cols-2">
					<FormField label="Discount (%)">
						<input
							type="number"
							min="0"
							max="100"
							step="0.01"
							value={invoice.discount === 0 ? "" : invoice.discount}
							placeholder="0"
							onChange={(event) => {
								const value = event.target.value;

								if (value === "") {
									onInvoiceChange({
										discount: 0,
									});
									return;
								}

								const numberValue = Number(value);

								onInvoiceChange({
									discount: Math.min(100, Math.max(0, numberValue)),
								});
							}}
							className={inputClass}
						/>
					</FormField>

					<FormField label="Tax (%)">
						<input
							type="number"
							min="0"
							max="100"
							step="0.01"
							value={invoice.tax === 0 ? "" : invoice.tax}
							placeholder="0"
							onChange={(event) => {
								const value = event.target.value;

								if (value === "") {
									onInvoiceChange({
										tax: 0,
									});
									return;
								}

								const numberValue = Number(value);

								onInvoiceChange({
									tax: Math.min(100, Math.max(0, numberValue)),
								});
							}}
							className={inputClass}
						/>
					</FormField>
				</div>

				<div className="mt-5 rounded-xl border border-[#041E50] bg-[#041f5049] p-4">
					<div className="space-y-2.5">
						<TotalRow
							label="Subtotal"
							value={formatMoney(subtotal)}
						/>

						{invoice.discount > 0 && (
							<TotalRow
								label={`Discount (${invoice.discount}%)`}
								value={`-${formatMoney(discountAmount)}`}
							/>
						)}

						{invoice.tax > 0 && (
							<TotalRow
								label={`Tax (${invoice.tax}%)`}
								value={formatMoney(taxAmount)}
							/>
						)}

						<div className="mt-3 border-t border-white/[0.06] pt-3">
							<div className="flex items-center justify-between">
								<span className="font-semibold text-slate-300">Total</span>

								<span className="text-lg font-bold text-white">
									{formatMoney(total)}
								</span>
							</div>
						</div>
					</div>
				</div>
			</FormSection>
		</div>
	);
}

const inputClass =
	"mt-1.5 h-11 w-full rounded-xl border border-[#041E50] bg-[#041f5049] px-3.5 text-slate-200 outline-none transition placeholder:text-slate-700 focus:border-blue-500/40 focus:ring-2 focus:ring-[#041f5049]";

function FormSection({
	number,
	title,
	description,
	children,
}: {
	number: string;
	title: string;
	description: string;
	children: React.ReactNode;
}) {
	return (
		<section className="rounded-2xl border border-white/[0.06] bg-[#030c1c]/35 p-5 sm:p-6">
			<div className="mb-5 flex items-start gap-3">
				<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-400/10 bg-blue-500/[0.06] text-sm font-bold text-blue-400">
					{number}
				</div>

				<div>
					<h3 className="font-semibold text-white">{title}</h3>

					<p className="mt-1 text-sm leading-5 text-slate-600">{description}</p>
				</div>
			</div>

			{children}
		</section>
	);
}

function FormField({
	label,
	required = false,
	children,
}: {
	label: string;
	required?: boolean;
	children: React.ReactNode;
}) {
	return (
		<label className="block">
			<span className="text-sm font-medium text-slate-500">
				{label}

				{required && <span className="ml-1 text-blue-400">*</span>}
			</span>

			{children}
		</label>
	);
}

function TotalRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex items-center justify-between">
			<span className="text-slate-600">{label}</span>

			<span className="font-medium text-slate-300">{value}</span>
		</div>
	);
}
