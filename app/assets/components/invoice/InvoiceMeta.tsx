import { InvoiceMetaProps } from "../../types/invoice";
import FormField from "./FormField";

export default function InvoiceMeta({
	invoiceNumber,
	issueDate,
	dueDate,
	currency,
	onChange,
}: InvoiceMetaProps) {
	return (
		<section className="rounded-xl border border-white/[0.07] bg-[#061329]/70 p-5">
			<div className="mb-5">
				<h3 className="text-sm font-semibold text-white">
					Invoice Information
				</h3>

				<p className="mt-1 text-xs leading-5 text-slate-500">
					Set the basic details for this invoice.
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				<FormField
					label="Invoice number"
					placeholder="INV-0001"
					value={invoiceNumber}
					onChange={(e) => onChange("invoiceNumber", e.target.value)}
					required
				/>

				<div className="space-y-2">
					<label className="block text-xs font-medium text-slate-300">
						Currency
					</label>

					<select
						value={currency}
						onChange={(e) => onChange("currency", e.target.value)}
						className="h-11 w-full rounded-lg border border-white/[0.08] bg-[#07162d] px-3.5 text-sm text-white outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10">
						<option value="USD">USD — US Dollar</option>

						<option value="NGN">NGN — Nigerian Naira</option>

						<option value="GBP">GBP — British Pound</option>

						<option value="EUR">EUR — Euro</option>

						<option value="CAD">CAD — Canadian Dollar</option>

						<option value="AUD">AUD — Australian Dollar</option>
					</select>
				</div>

				<FormField
					label="Issue date"
					type="date"
					value={issueDate}
					onChange={(e) => onChange("issueDate", e.target.value)}
					required
				/>

				<FormField
					label="Due date"
					type="date"
					value={dueDate}
					onChange={(e) => onChange("dueDate", e.target.value)}
				/>
			</div>
		</section>
	);
}
