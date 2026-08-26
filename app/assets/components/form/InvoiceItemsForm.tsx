"use client";

import type { InvoiceItem } from "@/app/assets/types/invoiceType";
import {
	FieldProps,
	InvoiceItemsFormProps,
	NumberFieldProps,
} from "../../types/form";

export default function InvoiceItemsForm({
	items,
	currency,
	discount,
	tax,
	onItemsChange,
	onDiscountChange,
	onTaxChange,
}: InvoiceItemsFormProps) {
	const subtotal = items.reduce(
		(total, item) => total + item.quantity * item.rate,
		0,
	);

	const discountAmount = subtotal * (discount / 100);
	const taxBase = subtotal - discountAmount;
	const taxAmount = taxBase * (tax / 100);
	const total = taxBase + taxAmount;

	const formatMoney = (amount: number) =>
		new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: currency || "USD",
			maximumFractionDigits: 2,
		}).format(amount);

	const updateItem = (
		id: string,
		field: keyof InvoiceItem,
		value: string | number,
	) => {
		onItemsChange(
			items.map((item) =>
				item.id === id
					? {
							...item,
							[field]: value,
						}
					: item,
			),
		);
	};

	const addItem = () => {
		const newItem: InvoiceItem = {
			id: crypto.randomUUID(),
			description: "",
			details: "",
			quantity: 1,
			rate: 0,
		};

		onItemsChange([...items, newItem]);
	};

	const removeItem = (id: string) => {
		onItemsChange(items.filter((item) => item.id !== id));
	};

	return (
		<section className="rounded-2xl border border-white/[0.06] bg-[#030c1c]/60 p-5">
			<div className="mb-5 flex items-start justify-between gap-4">
				<div className="flex items-start gap-3">
					<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/[0.08] text-blue-400">
						<svg
							width="17"
							height="17"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.8">
							<path d="M4 4h16v16H4z" />
							<path d="M8 8h8" />
							<path d="M8 12h8" />
							<path d="M8 16h5" />
						</svg>
					</div>

					<div>
						<h3 className="text-sm font-semibold text-white">Invoice Items</h3>

						<p className="mt-0.5 text-xs text-slate-500">
							Add the products or services you&apos;re billing for.
						</p>
					</div>
				</div>

				<button
					type="button"
					onClick={addItem}
					className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-blue-600 px-3 text-xs font-semibold text-white transition hover:bg-blue-500">
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2">
						<path d="M12 5v14" />
						<path d="M5 12h14" />
					</svg>
					Add Item
				</button>
			</div>

			<div className="space-y-3">
				{items.length === 0 ? (
					<div className="rounded-xl border border-dashed border-white/[0.08] bg-[#061329]/50 px-5 py-10 text-center">
						<div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/[0.08] text-blue-400">
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.8">
								<path d="M12 5v14" />
								<path d="M5 12h14" />
							</svg>
						</div>

						<p className="mt-3 text-sm font-medium text-slate-300">
							No items added yet
						</p>

						<p className="mt-1 text-xs text-slate-600">
							Add your first product or service above.
						</p>
					</div>
				) : (
					items.map((item, index) => (
						<div
							key={item.id}
							className="rounded-xl border border-white/[0.06] bg-[#061329]/50 p-4">
							<div className="mb-3 flex items-center justify-between">
								<span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
									Item {index + 1}
								</span>

								<button
									type="button"
									onClick={() => removeItem(item.id)}
									className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-red-500/10 hover:text-red-400"
									aria-label={`Remove item ${index + 1}`}>
									<svg
										width="15"
										height="15"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.8">
										<path d="M3 6h18" />
										<path d="M8 6V4h8v2" />
										<path d="M19 6l-1 15H6L5 6" />
									</svg>
								</button>
							</div>

							<div className="space-y-3">
								<div className="grid gap-3 lg:grid-cols-[1fr_120px_150px]">
									<Field
										label="Description"
										placeholder="e.g. Website Design"
										value={item.description}
										onChange={(value) =>
											updateItem(item.id, "description", value)
										}
									/>

									<NumberField
										label="Quantity"
										min={0}
										step={1}
										value={item.quantity}
										onChange={(value) =>
											updateItem(item.id, "quantity", Math.max(0, value))
										}
									/>

									<NumberField
										label={`Rate (${currency})`}
										min={0}
										step={0.01}
										value={item.rate}
										onChange={(value) =>
											updateItem(item.id, "rate", Math.max(0, value))
										}
									/>
								</div>

								<Field
									label="Details (optional)"
									placeholder="Add a short description..."
									value={item.details}
									onChange={(value) => updateItem(item.id, "details", value)}
								/>

								<div className="flex items-center justify-between rounded-lg border border-white/[0.05] bg-[#030c1c] px-3 py-2.5">
									<span className="text-xs text-slate-500">Item Total</span>

									<span className="text-sm font-semibold text-white">
										{formatMoney(item.quantity * item.rate)}
									</span>
								</div>
							</div>
						</div>
					))
				)}
			</div>

			<div className="mt-5 grid gap-4 border-t border-white/[0.06] pt-5 sm:grid-cols-2">
				<NumberField
					label="Discount (%)"
					min={0}
					max={100}
					step={0.1}
					value={discount}
					onChange={(value) =>
						onDiscountChange(Math.min(100, Math.max(0, value)))
					}
				/>

				<NumberField
					label="Tax (%)"
					min={0}
					max={100}
					step={0.1}
					value={tax}
					onChange={(value) => onTaxChange(Math.min(100, Math.max(0, value)))}
				/>
			</div>

			<div className="mt-5 rounded-xl border border-blue-400/10 bg-[#061329] p-4">
				<div className="space-y-2.5 text-sm">
					<div className="flex justify-between">
						<span className="text-slate-500">Subtotal</span>

						<span className="font-medium text-slate-300">
							{formatMoney(subtotal)}
						</span>
					</div>

					{discount > 0 && (
						<div className="flex justify-between">
							<span className="text-slate-500">Discount ({discount}%)</span>

							<span className="text-slate-300">
								-{formatMoney(discountAmount)}
							</span>
						</div>
					)}

					{tax > 0 && (
						<div className="flex justify-between">
							<span className="text-slate-500">Tax ({tax}%)</span>

							<span className="text-slate-300">{formatMoney(taxAmount)}</span>
						</div>
					)}

					<div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-3">
						<span className="font-semibold text-white">Total</span>

						<span className="text-lg font-bold text-blue-400">
							{formatMoney(total)}
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}

function Field({ label, value, placeholder, onChange }: FieldProps) {
	return (
		<label className="block">
			<span className="mb-1.5 block text-xs font-medium text-slate-400">
				{label}
			</span>

			<input
				type="text"
				value={value}
				placeholder={placeholder}
				onChange={(event) => onChange(event.target.value)}
				className="h-11 w-full rounded-xl border border-white/[0.07] bg-[#061329] px-3.5 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
			/>
		</label>
	);
}

function NumberField({
	label,
	value,
	min,
	max,
	step = 1,
	onChange,
}: NumberFieldProps) {
	return (
		<label className="block">
			<span className="mb-1.5 block text-xs font-medium text-slate-400">
				{label}
			</span>
			<input
				type="number"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(event) =>
					onChange(event.target.value === "" ? 0 : Number(event.target.value))
				}
				className="h-11 w-full rounded-xl border border-white/[0.07] bg-[#061329] px-3.5 text-sm text-white outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
			/>
		</label>
	);
}
