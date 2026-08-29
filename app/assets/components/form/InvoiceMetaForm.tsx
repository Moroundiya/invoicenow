"use client";

import { FieldProps, InvoiceMetaFormProps } from "../../types/form";

const currencies = [
	{ code: "USD", name: "US Dollar", symbol: "$" },
	{ code: "NGN", name: "Nigerian Naira", symbol: "₦" },
	{ code: "GBP", name: "British Pound", symbol: "£" },
	{ code: "EUR", name: "Euro", symbol: "€" },
	{ code: "CAD", name: "Canadian Dollar", symbol: "$" },
	{ code: "AUD", name: "Australian Dollar", symbol: "$" },
];

export default function InvoiceMetaForm({
	invoice,
	onChange,
}: InvoiceMetaFormProps) {
	return (
		<section className="rounded-2xl border border-white/[0.06] bg-[#030c1c]/60 p-5">
			<div className="mb-5 flex items-start gap-3">
				<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/[0.08] text-blue-400">
					<svg
						width="17"
						height="17"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.8">
						<path d="M6 2h9l5 5v15H6z" />
						<path d="M14 2v6h6" />
						<path d="M9 13h6" />
						<path d="M9 17h6" />
					</svg>
				</div>

				<div>
					<h3 className="text-sm font-semibold text-white">
						Invoice Information
					</h3>

					<p className="mt-0.5 text-xs text-slate-500">
						Set your invoice number, dates, and currency.
					</p>
				</div>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<Field
					label="Invoice Number"
					value={invoice.invoiceNumber}
					placeholder="INV-001"
					onChange={(value) =>
						onChange({
							invoiceNumber: value,
						})
					}
				/>

				<Field
					label="Issue Date"
					type="date"
					value={invoice.issueDate}
					onChange={(value) =>
						onChange({
							issueDate: value,
						})
					}
				/>

				<Field
					label="Due Date"
					type="date"
					value={invoice.dueDate}
					onChange={(value) =>
						onChange({
							dueDate: value,
						})
					}
				/>

				<label className="block">
					<span className="mb-1.5 block text-xs font-medium text-slate-400">
						Currency
					</span>

					<select
						value={invoice.currency}
						onChange={(event) =>
							onChange({
								currency: event.target.value,
							})
						}
						className="h-11 w-full appearance-none rounded-xl border border-[#041E50] bg-[#041f5049] px-3.5 text-sm text-white outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10">
						{currencies.map((currency) => (
							<option
								key={currency.code}
								value={currency.code}
								className="bg-[#061329]">
								{currency.symbol} {currency.code} — {currency.name}
							</option>
						))}
					</select>
				</label>
			</div>
		</section>
	);
}

function Field({
	label,
	value,
	placeholder,
	type = "text",
	onChange,
}: FieldProps) {
	return (
		<label className="block min-w-0">
			<span className="mb-1.5 block text-xs font-medium text-slate-400">
				{label}
			</span>

			<input
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={(event) => onChange(event.target.value)}
				className="h-11 min-w-0 w-full max-w-full rounded-xl border border-white/[0.07] bg-[#061329] px-3.5 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
			/>
		</label>
	);
}
