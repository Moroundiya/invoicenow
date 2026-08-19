interface InvoiceTotalsProps {
	subtotal: number;
	discount: number;
	tax: number;
	currency: string;

	onDiscountChange: (value: number) => void;
	onTaxChange: (value: number) => void;
}

export default function InvoiceTotals({
	subtotal,
	discount,
	tax,
	currency,
	onDiscountChange,
	onTaxChange,
}: InvoiceTotalsProps) {
	const discountAmount = subtotal * (discount / 100);

	const taxableAmount = subtotal - discountAmount;

	const taxAmount = taxableAmount * (tax / 100);

	const total = taxableAmount + taxAmount;

	const formatMoney = (amount: number) =>
		new Intl.NumberFormat("en-US", {
			style: "currency",
			currency,
		}).format(amount);

	return (
		<section className="rounded-xl border border-white/[0.07] bg-[#061329]/70 p-5">
			<div className="mb-5">
				<h3 className="text-sm font-semibold text-white">Totals</h3>

				<p className="mt-1 text-xs text-slate-500">
					Apply optional discounts and taxes.
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				<div className="space-y-2">
					<label className="block text-xs font-medium text-slate-300">
						Discount (%)
					</label>

					<input
						type="number"
						min="0"
						max="100"
						step="0.01"
						value={discount}
						onChange={(e) => onDiscountChange(Number(e.target.value))}
						className="h-11 w-full rounded-lg border border-white/[0.08] bg-[#07162d] px-3.5 text-sm text-white outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
					/>
				</div>

				<div className="space-y-2">
					<label className="block text-xs font-medium text-slate-300">
						Tax (%)
					</label>

					<input
						type="number"
						min="0"
						max="100"
						step="0.01"
						value={tax}
						onChange={(e) => onTaxChange(Number(e.target.value))}
						className="h-11 w-full rounded-lg border border-white/[0.08] bg-[#07162d] px-3.5 text-sm text-white outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
					/>
				</div>
			</div>

			<div className="mt-6 space-y-3 border-t border-white/[0.06] pt-5">
				<div className="flex justify-between text-xs">
					<span className="text-slate-500">Subtotal</span>

					<span className="text-slate-300">{formatMoney(subtotal)}</span>
				</div>

				{discount > 0 && (
					<div className="flex justify-between text-xs">
						<span className="text-slate-500">Discount ({discount}%)</span>

						<span className="text-slate-300">
							-{formatMoney(discountAmount)}
						</span>
					</div>
				)}

				{tax > 0 && (
					<div className="flex justify-between text-xs">
						<span className="text-slate-500">Tax ({tax}%)</span>

						<span className="text-slate-300">{formatMoney(taxAmount)}</span>
					</div>
				)}

				<div className="mt-3 flex items-center justify-between rounded-lg border border-blue-500/10 bg-blue-500/[0.06] px-4 py-4">
					<span className="text-sm font-semibold text-white">Total</span>

					<span className="text-lg font-bold text-blue-400">
						{formatMoney(total)}
					</span>
				</div>
			</div>
		</section>
	);
}
